import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Search,
  Filter,
  Tag,
  FileText,
  Award,
  ArrowRight,
} from "lucide-react";
import { client } from "@/utils/config"; // Import client for minting licenses

// Marketplace component
const Marketplace = () => {
  const navigate = useNavigate();
  const [marketplaceAssets, setMarketplaceAssets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isDetailView, setIsDetailView] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loader state
  const { toast } = useToast();

  // Fetch assets where isMarketplace is true
  useEffect(() => {
    const fetchMarketplaceAssets = async () => {
      try {
        const response = await fetch(
          "https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?isMarketplace=eq.true",
          {
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setMarketplaceAssets(data);
      } catch (error) {
        console.error("Error fetching marketplace assets:", error);
      }
    };

    fetchMarketplaceAssets();
  }, []);

  // Filter assets based on search query and filters
  const filteredAssets = marketplaceAssets.filter((asset) => {
    const matchesSearch =
      searchQuery === "" ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || asset.metadata.type === selectedType;

    const matchesCategory =
      selectedCategory === "all" ||
      asset.metadata.category === selectedCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  const handleMintLicense = async (licenseId: string, ipId: string) => {
    setIsLoading(true); // Start loader
    try {
      const response = await client.license.mintLicenseTokens({
        licenseTermsId: licenseId,
        licensorIpId: ipId,
        amount: 1,
        maxMintingFee: BigInt(0), // disabled
        maxRevenueShare: 100, // default
        txOptions: { waitForTransaction: true },
      });
      console.log("License minted successfully:", response.txHash);
      console.log('License Token IDs', response.licenseTokenIds);
      toast({
        title: "License minted successfully",
        description: `Transaction Hash: ${response.txHash}`,
      });
    } catch (error) {
      console.error("Error minting license:", error);
      toast({
        title: "Minting failed",
        description: "An error occurred while minting the license.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  const getLicenseTypeIcon = (type: string) => {
    switch (type) {
      case "Non-Commercial":
        return <Tag className="h-4 w-4 text-blue-500" />;
      case "Commercial Use":
        return <Award className="h-4 w-4 text-green-500" />;
      case "Commercial Remix":
        return <FileText className="h-4 w-4 text-purple-500" />;
      case "Creative Commons Attribution":
        return <Tag className="h-4 w-4 text-orange-500" />;
      default:
        return <Tag className="h-4 w-4" />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-center mb-2">IP Marketplace</h1>
          <p className="text-muted-foreground text-center mb-6">
            Discover and license intellectual property assets
          </p>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="w-full sm:w-48">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Commercial">Commercial</SelectItem>
                    <SelectItem value="Non-Commercial">Non-Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <Tag className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Art">Art</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredAssets.length} available assets
          </p>

          {/* Grid view of assets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <Card key={asset.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="mt-2 line-clamp-1">{asset.name}</CardTitle>
                    <CardDescription className="line-clamp-1">
                      {asset.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                      {asset.metadata.details}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button
                      variant="outline"
                      className="text-xs"
                      onClick={() => navigate(`/explorer/${asset.ip_id}`)} // Navigate to explorer page
                    >
                      View Details
                    </Button>
                    <Button
                      variant="default"
                      className="text-xs"
                      onClick={() => navigate(`/mint/${asset.ip_id}`)} // Navigate to mint page
                      disabled={isLoading} // Disable button while loading
                    >
                      {isLoading ? "Minting..." : "Mint License"} {/* Show loader text */}
                      {!isLoading && <ArrowRight className="ml-1 h-4 w-4" />} {/* Hide icon when loading */}
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-1">No assets found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;
