import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, FileText, Film, Music, Users, Wallet, 
  Award, BarChart2, Download, ExternalLink, Share2, Layers 
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { IPGroups } from "@/components/dashboard/IPGroups";
import { LicenseManagement } from "@/components/dashboard/LicenseManagement";
import { RoyaltyClaims } from "@/components/dashboard/RoyaltyClaims";

// Updated ItemCard component
const ItemCard = ({ 
  imageUrl, 
  title, 
  description, 
  date, 
  status, 
  onViewClick, 
  onMintClick, 
  onAddToMarketplaceClick, 
  onViewLicenseClick 
}) => (
  <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
    <div className="relative">
      <img 
        src={imageUrl || "https://dummyimage.com/300x200/cccccc/ffffff&text=No+Image"} 
        alt={title} 
        className="w-full h-40 object-cover" 
      />
      <span 
        className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
          status === "verified" 
            ? "bg-green-100 text-green-700" 
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {status === "verified" ? "Verified" : "Pending"}
      </span>
    </div>
    <div className="p-4">
      <h3 className="font-semibold text-lg truncate mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 truncate">{description}</p>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <span>Registered</span>
        <span>{new Date(date).toLocaleDateString()}</span>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onViewClick} 
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          View
        </button>
        <button 
          onClick={onMintClick} 
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
        >
          Mint
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        <button 
          onClick={onAddToMarketplaceClick} 
          className="flex-1 bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
        >
          Add to Marketplace
        </button>
        <button 
          onClick={onViewLicenseClick} 
          className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
        >
          View License
        </button>
      </div>
    </div>
  </div>
);

const DashboardPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mockAssets, setMockAssets] = useState([]);
  const [mockRoyalties, setMockRoyalties] = useState({
    total: 0,
    thisMonth: 0,
    pending: 0,
    history: [],
  });
  const [claimingRevenue, setClaimingRevenue] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        const response = await fetch(
          "https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?select=*",
          {
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );


        const data = await response.json();
        setMockAssets(
          data.map((item) => ({
            id: item.id,
            ip_id: item.ip_id,
            title: item.name,
            description: item.description,
            registered: item.created_at,
            imageUrl: item.imageurl || null,
            licenses: 0, // Assuming licenses are not provided in the API response
            isMarketplace: item.isMarketplace || false, // Add isMarketplace field
            icon:
              item.metadata.category.toLowerCase() === "script"
                ? FileText
                : item.metadata.category.toLowerCase() === "storyboard"
                ? BookOpen
                : item.metadata.category.toLowerCase() === "video"
                ? Film
                : item.metadata.category.toLowerCase() === "audio"
                ? Music
                : BookOpen, // Fallback icon for unknown categories
          }))
        );
        // Example royalty data, replace with actual API response if available
        setMockRoyalties({
          total: 2.45,
          thisMonth: 0.72,
          pending: 0.18,
          history: [
            { month: "Aug", amount: 0.35 },
            { month: "Sep", amount: 0.58 },
            { month: "Oct", amount: 0.80 },
            { month: "Nov", amount: 0.72 },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleClaimRevenue = () => {
    setClaimingRevenue(true);

    setTimeout(() => {
      setClaimingRevenue(false);
      toast({
        title: "Revenue Claimed Successfully",
        description: "2.45 IP has been transferred to your wallet.",
      });
    }, 2000);
  };

  const handleViewClick = (id) => {
    navigate(`/explorer/${id}`);
  };

  const handleMintClick = (id) => {
    navigate(`/mint/${id}`);
  };

  const handleAddToMarketplace = async (id) => {
    try {
      const response = await fetch(
        `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?id=eq.${id}`,
        {
          method: "PATCH",
          
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          
          body: JSON.stringify({ isMarketplace: true }),
        }
      );

      if (response.ok) {
        setMockAssets((prevAssets) =>
          prevAssets.map((asset) =>
            asset.id === id ? { ...asset, isMarketplace: true } : asset
          )
        );
        toast({
          title: "Success",
          description: "Item added to the marketplace successfully.",
        });
      } else {
        throw new Error("Failed to update the item.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      toast({
        title: "Error",
        description: "Failed to add the item to the marketplace.",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">My Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage your registered IP and track royalty earnings
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Button asChild className="bg-gradient-to-r from-ippurple to-ipblue hover:opacity-90 transition-opacity">
              <Link to="/register">
                Register New IP
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-ippurple/10 to-ipblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total IP Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="h-5 w-5 text-ippurple mr-2" />
                <span className="text-2xl font-bold">{mockAssets.length}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-ippurple/10 to-ipblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Active Licenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-ippurple mr-2" />
                <span className="text-2xl font-bold">
                  {mockAssets.reduce((acc, asset) => acc + asset.licenses, 0)}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-ippurple/10 to-ipblue/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Royalties Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Wallet className="h-5 w-5 text-ippurple mr-2" />
                <span className="text-2xl font-bold">{mockRoyalties.total} IP</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="assets" className="space-y-6">
          <TabsList>
            <TabsTrigger value="assets" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>IP Assets</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Groups</span>
            </TabsTrigger>
            <TabsTrigger value="licenses" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span>Licenses</span>
            </TabsTrigger>
            <TabsTrigger value="royalties" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Royalties</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="assets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Registered IP</CardTitle>
              </CardHeader>
              <CardContent>
                {mockAssets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {mockAssets.map((asset) => (
                      <ItemCard
                        key={asset.id}
                        imageUrl={asset.imageUrl}
                        title={asset.title}
                        description={asset.description}
                        date={asset.registered}
                        status={asset.isMarketplace ? "verified" : "pending"}
                        onViewClick={() => handleViewClick(asset.ip_id)}
                        onMintClick={() => handleMintClick(asset.ip_id)}
                        onAddToMarketplaceClick={() => handleAddToMarketplace(asset.id)}
                        onViewLicenseClick={() => navigate(`/licensebyasset/${asset.ip_id}`)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                    <h3 className="text-lg font-semibold mb-1">No IP Assets Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't registered any IP assets yet
                    </p>
                    <Button asChild>
                      <Link to="/register">Register Your First IP</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="groups">
            <IPGroups />
          </TabsContent>
          
          <TabsContent value="licenses">
            <LicenseManagement />
          </TabsContent>
          
          <TabsContent value="royalties">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl">Royalty Claims</CardTitle>
                </CardHeader>
                <CardContent>
                  <RoyaltyClaims />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Revenue Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-ippurple/10 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Available to Claim</span>
                        <span className="text-sm">{mockRoyalties.total} IP</span>
                      </div>
                      <Button 
                        onClick={handleClaimRevenue} 
                        disabled={claimingRevenue || mockRoyalties.total === 0}
                        className="w-full mt-2 bg-ippurple hover:bg-ippurple/90"
                      >
                        {claimingRevenue ? "Claiming..." : "Claim All Revenue"}
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium mb-2">Transaction History</h4>
                      
                      <div className="text-sm border rounded-lg divide-y">
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium">Royalty Payment</div>
                            <div className="text-xs text-muted-foreground">Nov 2, 2023</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">0.35 IP</div>
                            <div className="text-xs text-green-600">Completed</div>
                          </div>
                        </div>
                        
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium">Royalty Payment</div>
                            <div className="text-xs text-muted-foreground">Oct 15, 2023</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">0.52 IP</div>
                            <div className="text-xs text-green-600">Completed</div>
                          </div>
                        </div>
                        
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <div className="font-medium">License Sale</div>
                            <div className="text-xs text-muted-foreground">Oct 3, 2023</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">1.20 IP</div>
                            <div className="text-xs text-green-600">Completed</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="w-full text-sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export Transaction History
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
