import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { client } from "@/utils/config"; // Import client for minting
import { useToast } from "@/hooks/use-toast";

const MintPage = () => {
  const { toast } = useToast();
  const { id } = useParams(); // Get asset ID from URL
  const [formData, setFormData] = useState({
    title: "Screenplay: The Lost City",
    description: "Original screenplay for a sci-fi adventure",
    genre: "Sci-Fi",
    author: "Alex Johnson",
    length: "120 pages",
    creationDate: "2025-03-10",
    transactionHash: "0x123abc...",
    licenseType: "1",
    royaltyPercentage: "10",
    expirationDate: "",
    attributionRequirement: true,
    format: "Digital NFT License",
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };


  const handleMint = async () => {
    setIsLoading(true); // Start loader
    try {
        
      const licenseTermsId = formData.licenseType; // Map dropdown to ID
      const licensorIpId = id; // Asset ID from URL

      console.log("Minting license with ID:", licenseTermsId, "for IP ID:", licensorIpId);

      const response = await client.license.mintLicenseTokens({
        licenseTermsId: licenseTermsId,
        licensorIpId: licensorIpId,
        amount: 1,
        maxMintingFee: BigInt(0), // disabled
        maxRevenueShare: parseInt(formData.royaltyPercentage, 10), // from form data
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
          {/* Metadata Preview */}
          <div className="lg:col-span-1">
            <Card className="border bg-white shadow-sm">
              <CardContent>
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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 capitalize">genre</h4>
                        <p className="text-sm">{formData.genre}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 capitalize">author</h4>
                        <p className="text-sm">{formData.author}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 capitalize">length</h4>
                        <p className="text-sm">{formData.length}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 capitalize">creationDate</h4>
                        <p className="text-sm">{formData.creationDate}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Transaction Hash</h3>
                    <p className="text-xs font-mono bg-gray-50 p-2 rounded overflow-auto">{formData.transactionHash}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
