import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const License = () => {
  const { id } = useParams(); // Get asset ID from URL
  const [formData] = useState({
    title: "Screenplay: The Lost City",
    description: "Original screenplay for a sci-fi adventure",
    genre: "Sci-Fi",
    author: "Alex Johnson",
    length: "120 pages",
    creationDate: "2025-03-10",
    transactionHash: "0x123abc...",
    licenseType: "Commercial Use",
    royaltyPercentage: "10",
    expirationDate: "2026-03-10",
    attributionRequirement: true,
    format: "Digital NFT License",
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">License Details</h1>
          <p className="text-gray-500">View licensing terms for your verified creative assets</p>
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

          {/* License Details */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border bg-white shadow-sm">
                <CardContent>
                  <div className="flex flex-col space-y-1.5">
                    <h3 className="font-semibold tracking-tight text-lg">License Configuration</h3>
                  </div>
                  <div className="pt-4 space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">License Type</label>
                      <p className="text-base">{formData.licenseType}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Royalty Percentage</label>
                      <p className="text-base">{formData.royaltyPercentage}%</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Expiration Date</label>
                      <p className="text-base">{formData.expirationDate || "N/A"}</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Attribution Required</label>
                      <p className="text-base">{formData.attributionRequirement ? "Yes" : "No"}</p>
                    </div>
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
                      <p>License is minted as an NFT with verifiable on-chain provenance.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default License;
