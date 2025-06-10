import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/utils/config"; // Import client for minting
import { supabase } from "@/utils/supabaseClient"; // Import Supabase client
import { useToast } from "@/hooks/use-toast";

const MintPage = () => {
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>(); // Get asset ID from URL
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "Screenplay: The Lost City",
    description: "Original screenplay for a sci-fi adventure",
    author: "Alex Johnson",
    length: "120 pages",
    creationDate: "2025-03-10",
    licenseType: "1",
    royaltyPercentage: "10",
    expirationDate: "",
    attributionRequirement: true,
    format: "Digital NFT License",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  // Sample licenses data
  const licenses = {
    "1": {
      type: "Commercial Use",
      description: "Allows commercial use of the intellectual property.",
      royalty: "10%",
      attribution: "Required",
      format: "Digital NFT License",
    },
    "2": {
      type: "Non-Commercial",
      description: "Allows non-commercial use of the intellectual property.",
      royalty: "0%",
      attribution: "Required",
      format: "Digital NFT License",
    },
    "3": {
      type: "Commercial Remix",
      description: "Allows commercial remixing of the intellectual property.",
      royalty: "15%",
      attribution: "Required",
      format: "Digital NFT License",
    },
    "4": {
      type: "Custom License",
      description: "Custom licensing terms for the intellectual property.",
      royalty: "Variable",
      attribution: "Optional",
      format: "Custom Format",
    },
  };

  // Fetch image for the card (like License.tsx)
  useEffect(() => {
    if (id) {
      fetch(`https://staging-api.storyprotocol.net/api/v3/assets/${id}`, {
        headers: {
          "accept": "*/*",
          "content-type": "application/json",
          "x-api-key": "Hils8o7iULtuuK45KBQ2SUEJmGKseUgRh-dRsX57RS0",
          "x-chain": "story-aeneid",
          "x-extend-asset": "true",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const assetData = data?.data;
          setImageUrl(assetData?.nftMetadata?.imageUrl || null);
          setFormData((prev) => ({
            ...prev,
            title: assetData?.nftMetadata?.name || prev.title,
            description: assetData?.descendantCount
              ? `Descendant Count: ${assetData.descendantCount}`
              : prev.description,
            author: assetData?.ipId || prev.author,
            creationDate: new Date(
              parseInt(assetData?.blockTimestamp || "0") * 1000
            )
              .toISOString()
              .split("T")[0],
          }));
        })
        .catch(() => setImageUrl(null));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      // Update license preview details when licenseType changes
      if (name === "licenseType") {
        const selectedLicense = licenses[value];
        if (selectedLicense) {
          updatedFormData.format = selectedLicense.format;
          updatedFormData.description = selectedLicense.description;
          updatedFormData.royaltyPercentage = selectedLicense.royalty.replace("%", "");
          updatedFormData.attributionRequirement = selectedLicense.attribution === "Required";
        }
      }

      return updatedFormData;
    });
  };

  const insertDataToSupabase = async (data: {
    transactionHash: string;
    licenseTokenIds: string[];
    licenseType: string;
    royaltyPercentage: number;
    attributionRequirement: boolean;
    format: string;
    ipId: string;
  }) => {
    try {
      // Map keys to match Supabase column names
      const sanitizedData = {
        transaction_hash: data.transactionHash,
        license_token_ids: data.licenseTokenIds.map((id) => id.toString()), // Convert BigInt to string
        license_type: data.licenseType,
        royalty_percentage: data.royaltyPercentage,
        attribution_requirement: data.attributionRequirement,
        format: data.format,
        ip_id: data.ipId,
      };

      const response = await fetch("https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/mint", {
        method: "POST",
        headers: {
          apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error(`Failed to insert data: ${response.statusText}`);
      }

      console.log("Data inserted into Supabase successfully.");
    } catch (error) {
      console.error("Error inserting data into Supabase:", error);
    }
  };

  const handleMint = async () => {
    setIsLoading(true); // Start loader
    try {
      const licenseTermsId = formData.licenseType; // Map dropdown to ID
      const licensorIpId = id; // Asset ID from URL

      console.log("Minting license with ID:", licenseTermsId, "for IP ID:", licensorIpId);

      const response = await client.license.mintLicenseTokens({
        licenseTermsId: "1", // licenseTermsId,
        licensorIpId: licensorIpId,
        amount: 1,
        maxMintingFee: BigInt(0), // disabled
        maxRevenueShare: parseInt(formData.royaltyPercentage, 10), // from form data
        txOptions: { waitForTransaction: true },
      });

      console.log("License minted successfully:", response.txHash);
      console.log("License Token IDs", response.licenseTokenIds);

      console.log("store in supa",{
        transactionHash: response.txHash,
        licenseTokenIds: response.licenseTokenIds,
        licenseType: licenses[formData.licenseType]?.type || "Unknown",
        royaltyPercentage: parseInt(formData.royaltyPercentage, 10),
        attributionRequirement: formData.attributionRequirement, // Ensure this matches the database column
        format: formData.format,
        ipId: licensorIpId,
      })

      // Insert data into Supabase
      await insertDataToSupabase({
        transactionHash: response.txHash,
        licenseTokenIds: response.licenseTokenIds,
        licenseType: licenses[formData.licenseType]?.type || "Unknown",
        royaltyPercentage: parseInt(formData.royaltyPercentage, 10),
        attributionRequirement: formData.attributionRequirement, // Ensure this matches the database column
        format: formData.format,
        ipId: licensorIpId,
      });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleMint(); // Call minting function on form submission
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">License Your IP</h1>
          <p className="text-gray-500">Create licensing terms for your verified creative assets</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Card with image at the top, like License.tsx */}
          <div className="lg:col-span-1 border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
            <div className="relative">
              <img
                src={imageUrl || "https://dummyimage.com/300x200/cccccc/ffffff&text=No+Image"}
                alt={formData.title}
                className="w-full h-40 object-cover"
              />
              <span
                className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
                  imageUrl
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {imageUrl ? "Verified" : "Pending"}
              </span>
            </div>
            <CardContent>
              {/* Metadata Preview */}
              <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-lg">Metadata Preview</h3>
              </div>
              <div className="pt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Title</h3>
                  <p className="text-base">{formData.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-base">{formData.description}</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-500">Detected Metadata</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {/* Removed genre */}
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 capitalize">author</h4>
                      <p className="text-sm">{formData.author}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-500 capitalize">creationDate</h4>
                      <p className="text-sm">{formData.creationDate}</p>
                    </div>
                  </div>
                </div>
                {/* Removed Transaction Hash */}
                <div>
                  <h3 className="text-sm font-medium text-gray-500">IP ID</h3>
                  <p className="text-xs font-mono bg-gray-50 p-2 rounded overflow-auto">{id}</p>
                </div>
              </div>
            </CardContent>
          </div>

          {/* License Configuration Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border bg-white shadow-sm">
                  <CardContent>
                    <div className="flex flex-col space-y-1.5">
                      <h3 className="font-semibold tracking-tight text-lg">License Configuration</h3>
                    </div>
                    <div className="pt-4 space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="licenseType">License Type</label>
                        <select
                          name="licenseType"
                          value={formData.licenseType}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                          id="licenseType"
                        >
                          <option value="1">Commercial Use</option>
                          <option value="2">Non-Commercial</option>
                          <option value="3">Commercial Remix</option>
                          <option value="4">Custom License</option>
                        </select>
                        <p className="text-xs text-gray-500">Allow derivative works with attribution</p>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="royaltyPercentage">Royalty Percentage</label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            name="royaltyPercentage"
                            value={formData.royaltyPercentage}
                            onChange={handleChange}
                            className="w-24 border rounded p-2"
                            id="royaltyPercentage"
                            min="0"
                            max="100"
                          />
                          <span className="ml-2">%</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="expirationDate">Expiration Date (Optional)</label>
                        <input
                          type="date"
                          name="expirationDate"
                          value={formData.expirationDate}
                          onChange={handleChange}
                          className="w-full border rounded p-2"
                          id="expirationDate"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium" htmlFor="attributionRequirement">Attribution Required</label>
                        <input
                          type="checkbox"
                          name="attributionRequirement"
                          checked={formData.attributionRequirement}
                          onChange={handleChange}
                          className="h-6 w-6"
                          id="attributionRequirement"
                        />
                      </div>
                    </div>
                    <div className="flex items-center pt-4">
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 rounded ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
                        onClick={handleSubmit}
                        disabled={isLoading} // Disable button while loading
                      >
                        {isLoading ? "Minting..." : "Mint License NFT"}
                      </button>
                    </div>
                  </CardContent>
                </Card>

                {/* License Preview */}
                <Card className="border bg-white shadow-sm">
                  <CardContent>
                    <div className="flex flex-col space-y-1.5">
                      <h3 className="font-semibold tracking-tight text-lg">License Preview</h3>
                    </div>
                    <div className="pt-4 prose prose-sm max-w-full">
                      <h3 className="text-base font-medium capitalize">{formData.licenseType} License</h3>
                      <div className="shrink-0 bg-border h-[1px] w-full my-3"></div>
                      <p className="text-sm">
                        This license grants the right to use commercially the intellectual property with the following terms:
                      </p>
                      <ul className="text-sm space-y-1">
                        <li><strong>Royalty:</strong> {formData.royaltyPercentage}% of revenue</li>
                        <li><strong>Attribution:</strong> {formData.attributionRequirement ? "Required" : "Not Required"}</li>
                        <li><strong>Format:</strong> {formData.format}</li>
                      </ul>
                      <div className="mt-4 text-xs text-gray-500">
                        <p>License will be minted as an NFT with verifiable on-chain provenance.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MintPage;
