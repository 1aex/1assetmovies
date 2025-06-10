import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Search, Filter, Tag, Award, ArrowRight } from "lucide-react";

const LicenseByAsset = () => {
  const { id: ip_id } = useParams<{ id: string }>(); // Get ip_id from URL
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Fetch licenses and map with item details
  useEffect(() => {
    const fetchLicenses = async () => {
      try {
        if (!ip_id) {
          setLicenses([]);
          return;
        }

        const response = await fetch(
          `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/mint?ip_id=eq.${ip_id}`,
          {
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const mintData = await response.json();

        // Fetch item details for each license
        const itemPromises = mintData.map(async (license) => {
          const itemResponse = await fetch(
            `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?ip_id=eq.${license.ip_id}`,
            {
              headers: {
                apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          const itemData = await itemResponse.json();
          return { ...license, item: itemData[0] }; // Merge license and item data
        });

        const licensesWithDetails = await Promise.all(itemPromises);
        setLicenses(licensesWithDetails);
      } catch (error) {
        console.error("Error fetching licenses:", error);
        setLicenses([]);
      }
    };

    fetchLicenses();
  }, [ip_id]); // Add ip_id as a dependency

  // Filter licenses based on search query and type
  const filteredLicenses = licenses.filter((license) => {
    const matchesSearch =
      searchQuery === "" ||
      license.item?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      license.item?.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesType =
      selectedType === "all" || license.license_type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-center mb-2">
            License Marketplace
          </h1>
          <p className="text-muted-foreground text-center mb-6">
            Discover and license intellectual property assets
          </p>

          {/* Search and filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search licenses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="License Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Commercial Use">Commercial Use</SelectItem>
                  <SelectItem value="Non-Commercial">Non-Commercial</SelectItem>
                  <SelectItem value="Commercial Remix">
                    Commercial Remix
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredLicenses.length} available licenses
          </p>

          {/* Grid view of licenses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLicenses.length > 0 ? (
              filteredLicenses.map((license) => (
                <div
                  key={license.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative flex flex-col bg-white"
                >
                  <div className="relative">
                    <img
                      src={
                        license.item?.imageurl ||
                        "https://dummyimage.com/300x200/cccccc/ffffff&text=No+Image"
                      }
                      alt={license.item?.name || "No Title"}
                      className="w-full h-40 object-cover"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-semibold text-lg truncate mb-2">
                      {license.item?.name || "No Title"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 truncate">
                      {license.item?.description || "No Description"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <span>License Type: {license.license_type}</span>
                      <span>Royalty: {license.royalty_percentage}%</span>
                    </div>
                    <div className="flex gap-2 mt-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigate(`/license/${license?.transaction_hash}`)
                        }
                        className="flex-1"
                      >
                        View License
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        // onClick={() => navigate(`/mint/${license.item?.ip_id}`)}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? "Processing..." : "Sell License"}
                        {!isLoading && <ArrowRight className="ml-1 h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center p-12">
                <Search className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-1">No licenses found</h3>
                <p className="text-muted-foreground text-center">
                  Try adjusting your search or filters to find what you're
                  looking for
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LicenseByAsset;
