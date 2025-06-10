import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const ExplorerPage = () => {
  const { id } = useParams<{ id: string }>();
  const [copied, setCopied] = useState(false);
  const [ipDetails, setIpDetails] = useState<any>(null);

  useEffect(() => {
    if (id) {
      // Fetch IP details from the new API
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
          if (!data || !data.data) {
            console.error("Invalid API response:", data);
            return;
          }

          const ipData = data.data;

          setIpDetails({
            ipId: id,
            title: ipData.nftMetadata?.name || "N/A",
            description: ipData.nftMetadata?.description || "N/A",
            createdAt: ipData.blockTimestamp
              ? new Date(parseInt(ipData.blockTimestamp) * 1000).toLocaleString()
              : "N/A",
            metadataUri: ipData.nftMetadata?.tokenUri || null,
            imageUrl: ipData.nftMetadata?.imageUrl || null,
            nftDetails: {
              name: ipData.nftMetadata?.name || "N/A",
              description: ipData.nftMetadata?.description || "N/A",
              tokenContract: ipData.nftMetadata?.tokenContract || "N/A",
              tokenId: ipData.nftMetadata?.tokenId
                ? `#${ipData.nftMetadata.tokenId}`
                : "N/A",
              chain: "Story Aeneid (1315)",
            },
            traits: ipData.nftMetadata?.attributes || [],
            animationUrl: ipData.animation?.originalUrl || null,
          });

          // Fetch metadata for creators, lineage, and license
          fetch(`https://staging-api.storyprotocol.net/api/v3/assets/${id}/metadata`, {
            headers: {
              "accept": "*/*",
              "content-type": "application/json",
              "x-api-key": "Hils8o7iULtuuK45KBQ2SUEJmGKseUgRh-dRsX57RS0",
              "x-chain": "story-aeneid",
            },
          })
            .then((response) => response.json())
            .then((metadataResponse) => {
              if (!metadataResponse || !metadataResponse.metadataUri) {
                console.error("Invalid metadata API response:", metadataResponse);
                return;
              }

              // Fetch metadataUri for additional details
              fetch(metadataResponse.metadataUri)
                .then((response) => response.json())
                .then((metadata) => {
                  setIpDetails((prevDetails) => ({
                    ...prevDetails,
                    creators: metadata.creators || [],
                  }));
                })
                .catch((error) => {
                  console.error("Error fetching metadataUri:", error);
                });
            })
            .catch((error) => {
              console.error("Error fetching metadata API:", error);
            });

          // Fetch additional metadata using tokenContract and tokenId
          const tokenContract = ipData.nftMetadata?.tokenContract;
          const tokenId = ipData.nftMetadata?.tokenId;

          if (tokenContract && tokenId) {
            fetch(
              `https://story-aeneid.g.alchemy.com/nft/v3/0ACboN5FhM8HVBsTwH-H0y9WGfVQbT9T/getNFTMetadata?contractAddress=${tokenContract}&tokenId=${tokenId}`,
              {
                headers: {
                  "accept": "*/*",
                  "content-type": "application/json",
                },
              }
            )
              .then((response) => response.json())
              .then((metadata) => {
                if (!metadata || !metadata.raw) {
                  console.error("Invalid metadata response:", metadata);
                  return;
                }

                setIpDetails((prevDetails) => ({
                  ...prevDetails,
                  imageUrl: metadata.image?.cachedUrl || prevDetails.imageUrl,
                  animationUrl: metadata.animation?.originalUrl || prevDetails.animationUrl,
                  traits: metadata.raw.metadata?.attributes || prevDetails.traits,
                  description: metadata.raw.metadata?.description || prevDetails.description,
                }));
              })
              .catch((error) => {
                console.error("Error fetching additional metadata:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error fetching IP details:", error);
        });
    }
  }, [id]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Column */}
          <div className="md:col-span-2">
            <div className="w-full aspect-square bg-gray-200 flex items-center justify-center rounded">
              {ipDetails?.imageUrl ? (
                <img
                  src={ipDetails.imageUrl}
                  alt={ipDetails.nftDetails?.name || "NFT Image"}
                  className="w-full h-full object-cover rounded"
                />
              ) : (
                <span className="text-gray-500">Image/NFT Placeholder</span>
              )}
            </div>
            {/* Explorer Title and Link Section */}
            {id && (
              <div className="mt-2">
                <div className="font-semibold text-lg mb-1">Explorer</div>
                <a
                  href={`https://aeneid.explorer.story.foundation/ipa/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline font-semibold break-all"
                >
                  https://aeneid.explorer.story.foundation/ipa/{id}
                </a>
              </div>
            )}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
              </CardHeader>
              <CardContent>
                {ipDetails?.nftDetails ? (
                  <>
                    <p><strong>NFT Name:</strong> {ipDetails.nftDetails.name}</p>
                    <p><strong>Description:</strong> {ipDetails.nftDetails.description}</p>
                    <p><strong>Token Contract:</strong> {ipDetails.nftDetails.tokenContract}</p>
                    <p><strong>Token ID:</strong> {ipDetails.nftDetails.tokenId}</p>
                    <p><strong>Creator:</strong> {ipDetails.nftDetails.creator}</p>
                    <p><strong>Owner:</strong> {ipDetails.nftDetails.owner}</p>
                    <p><strong>Chain:</strong> {ipDetails.nftDetails.chain}</p>
                    <p>
                      <strong>NFT Metadata URI:</strong>{" "}
                      <Button
                        variant="link"
                        as="a"
                        href={ipDetails.metadataUri}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Metadata
                      </Button>
                    </p>
                  </>
                ) : (
                  <p>Loading NFT details...</p>
                )}
              </CardContent>
            </Card>

            {/* Traits Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Traits ({ipDetails?.traits?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {ipDetails?.traits && ipDetails.traits.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {ipDetails.traits.map((trait: any, index: number) => (
                      <li key={index}>
                        <strong>{trait.key || "Trait"}:</strong> {trait.value || "N/A"}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No traits available</p>
                )}
              </CardContent>
            </Card>

            {/* Animation Section */}
            {ipDetails?.animationUrl && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Animation</CardTitle>
                </CardHeader>
                <CardContent>
                  <audio controls>
                    <source src={ipDetails.animationUrl} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column */}
          <div className="md:col-span-3 space-y-6">
            {/* IP Details */}
            <Accordion type="single" collapsible>
              <AccordionItem value="ip-details">
                <AccordionTrigger>
                  <CardTitle>IP Details</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    {ipDetails ? (
                      <>
                        <p>
                          <strong>IP ID:</strong>{" "}
                          <code className="bg-gray-100 px-2 py-1 rounded">
                            {ipDetails.ipId}
                          </code>
                          <Button
                            variant="link"
                            className="ml-2"
                            onClick={() => handleCopy(ipDetails.ipId)}
                          >
                            Copy
                          </Button>
                          {copied && <span className="ml-2 text-green-500">Copied!</span>}
                        </p>
                        <p><strong>IP Title:</strong> {ipDetails.title}</p>
                        <p><strong>Description:</strong> {ipDetails.description}</p>
                        <p><strong>Created At:</strong> {ipDetails.createdAt}</p>
                        <p>
                          <strong>IP Metadata URI:</strong>{" "}
                          <Button
                            variant="link"
                            as="a"
                            href={ipDetails.metadataUri}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Metadata
                          </Button>
                        </p>
                      </>
                    ) : (
                      <p>Loading IP details...</p>
                    )}
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Creators */}
            <Accordion type="single" collapsible>
              <AccordionItem value="creators">
                <AccordionTrigger>
                  <CardTitle>Creators</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    {ipDetails?.creators && ipDetails.creators.length > 0 ? (
                      ipDetails.creators.map((creator: any, index: number) => (
                        <div key={index} className="mb-4">
                          <p>
                            <strong>Name:</strong> {creator.name || "N/A"}{" "}
                            <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                              Contribution: {creator.contributionPercent || 0}%
                            </span>
                          </p>
                          <p>
                            <strong>Address:</strong>{" "}
                            <code className="bg-gray-100 px-2 py-1 rounded">
                              {creator.address || "N/A"}
                            </code>
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>No creators available</p>
                    )}
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Lineage */}
            <Accordion type="single" collapsible>
              <AccordionItem value="lineage">
                <AccordionTrigger>
                  <CardTitle>Lineage</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    <p className="text-gray-500">No data available</p>
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Licenses */}
            <Accordion type="single" collapsible>
              <AccordionItem value="licenses">
                <AccordionTrigger>
                  <CardTitle>Licenses</CardTitle>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    {ipDetails?.license ? (
                      <>
                        <p>
                          <strong>Commercial Remix License (PIL #{ipDetails.license.id})</strong>
                        </p>
                        <p>{ipDetails.license.template}</p>
                        <ul className="list-disc pl-5">
                          {ipDetails.license.terms.map((term: any, index: number) => (
                            <li key={index}>
                              <strong>{term.trait_type}:</strong> {term.value || "N/A"}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <p>Loading license details...</p>
                    )}
                  </CardContent>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExplorerPage;
