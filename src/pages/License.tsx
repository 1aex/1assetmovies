import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";

const License = () => {
  const { id } = useParams<{ id: string }>(); // Get transaction_hash from URL
  const [mintData, setMintData] = useState<any>(null);
  const [itemData, setItemData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLicenseData = async () => {
      try {
        // Fetch mint record based on transaction_hash
        const mintResponse = await fetch(
          `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/mint?transaction_hash=eq.${id}`,
          {
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const mintRecords = await mintResponse.json();
        const mintRecord = mintRecords[0];
        setMintData(mintRecord);

        // Fetch item record based on ip_id from mint table
        if (mintRecord?.ip_id) {
          const itemResponse = await fetch(
            `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?ip_id=eq.${mintRecord.ip_id}`,
            {
              headers: {
                apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
                Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                "Content-Type": "application/json",
              },
            }
          );
          const itemRecords = await itemResponse.json();
          setItemData(itemRecords[0]);
        }
      } catch (error) {
        console.error("Error fetching license data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLicenseData();
  }, [id]);

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-500">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!mintData || !itemData) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-500">No license data found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">License Details</h1>
          <p className="text-gray-500">View licensing terms for your verified creative assets</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Metadata from item table */}
          <div className="lg:col-span-1 border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
            <div className="relative">
              <img
                src={itemData.imageurl || "https://dummyimage.com/300x200/cccccc/ffffff&text=No+Image"}
                alt={itemData.name || "No Title"}
                className="w-full h-40 object-cover"
              />
              <span
                className={`absolute top-2 right-2 text-xs font-medium px-2 py-1 rounded ${
                  itemData.imageurl ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {itemData.imageurl ? "Verified" : "Pending"}
              </span>
            </div>
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-lg">Metadata</h3>
              </div>
              <div className="pt-4 space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Title</h3>
                  <p className="text-base">{itemData.name || "N/A"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="text-base">{itemData.description || "N/A"}</p>
                </div>
                <div className="shrink-0 bg-border h-[1px] w-full"></div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Category</h3>
                  <p className="text-base">{itemData.metadata?.category || "N/A"}</p>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Center: License details from mint table */}
          <div className="lg:col-span-1 border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-lg">License Details</h3>
              </div>
              <div className="pt-4 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">License Type</label>
                  <p className="text-base">{mintData.license_type}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Royalty Percentage</label>
                  <p className="text-base">{mintData.royalty_percentage}%</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Attribution Required</label>
                  <p className="text-base">{mintData.attribution_requirement ? "Yes" : "No"}</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Hash</label>
                  <p className="text-xs font-mono bg-gray-50 p-2 rounded overflow-auto">
                    {mintData.transaction_hash}
                  </p>
                </div>
              </div>
            </CardContent>
          </div>

          {/* Right Side: License preview */}
          <div className="lg:col-span-1 border rounded-lg overflow-hidden shadow-sm bg-white flex flex-col">
            <CardContent>
              <div className="flex flex-col space-y-1.5">
                <h3 className="font-semibold tracking-tight text-lg">License Preview</h3>
              </div>
              <div className="pt-4 prose prose-sm max-w-full">
                <h3 className="text-base font-medium capitalize">{mintData.license_type} License</h3>
                <div className="shrink-0 bg-border h-[1px] w-full my-3"></div>
                <p className="text-sm">
                  This license grants the right to use the intellectual property with the following terms:
                </p>
                <ul className="text-sm space-y-1">
                  <li><strong>Royalty:</strong> {mintData.royalty_percentage}% of revenue</li>
                  <li><strong>Attribution:</strong> {mintData.attribution_requirement ? "Required" : "Not Required"}</li>
                  <li><strong>Format:</strong> {mintData.format}</li>
                </ul>
                <div className="mt-4 text-xs text-gray-500">
                  <p>License is minted as an NFT with verifiable on-chain provenance.</p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default License;
