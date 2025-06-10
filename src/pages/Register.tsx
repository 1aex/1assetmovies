import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { IPAssetMetadata, MediaType, IPType } from "@/types/IPAssetMetadata";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { FormHeader } from "@/components/register/FormHeader";
import { BasicInfoSection } from "@/components/register/BasicInfoSection";
import { FileUploadSection } from "@/components/register/FileUploadSection";
import { TagsSection } from "@/components/register/TagsSection";
import { OptionsSection } from "@/components/register/OptionsSection";
import { SubmitButton } from "@/components/register/SubmitButton";
import { FormFooter } from "@/components/register/FormFooter";
import { mintNFT } from "@/utils/functions/mintNFT";
import { createCommercialRemixTerms, NFTContractAddress } from "@/utils/utils";
import { client, account, networkInfo } from "@/utils/config";
import CryptoJS from "crypto-js"; // Replace 'crypto' with 'crypto-js'
import { uploadJSONToIPFS } from "@/utils/functions/uploadToIpfs"; // Use the existing upload function

// Use Vite's import.meta.env for environment variables
if (import.meta.env.MODE === "development") {
  console.log("Development environment detected");
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "IP title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  mediaType: z.enum(["image", "video", "audio", "script", "pdf", "other"] as const),
  ipType: z.enum(["script", "character", "scene", "film", "music", "visual", "other"] as const),
  creators: z.string().min(2),
  tags: z.string(),
  external_url: z.string().url().optional().or(z.literal("")),
  robotTerms: z.boolean().default(true),
  walletAddress: z.string().min(5),
  registerOnChain: z.boolean().default(true),
});

const mimeTypeMap: Record<string, string> = {
  image: "image/jpg",
  video: "video/mp4",
  audio: "audio/mpeg",
  script: "application/json",
  pdf: "application/pdf",
  other: "application/octet-stream",
};

const insertDataToSupabase = async (data: {
  name: string;
  description: string;
  createdAt: string;
  imageUrl: string;
  metadata: { creator: string; category: string };
  ipId: string;
}) => {
  try {
    const response = await fetch("https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items", {
      method: "POST",
      headers: {
        apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        created_at: data.createdAt,
        imageurl: data.imageUrl,
        metadata: data.metadata,
        ip_id: data.ipId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to insert data: ${response.statusText}`);
    }

    // logToConsole("Data inserted into Supabase successfully.");
  } catch (error) {
    // logToConsole("Error inserting data into Supabase:");
    // logToConsole(error);
  }
};

const RegisterPage = () => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);

  const logToConsole = (message: string | object) => {
    const formattedMessage =
      typeof message === "object"
        ? JSON.stringify(message, (key, value) =>
            typeof value === "bigint" ? value.toString() : value
          )
        : message;
    setConsoleLogs((prevLogs) => [...prevLogs, formattedMessage]);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      mediaType: "image",
      ipType: "script",
      creators: "",
      tags: "",
      external_url: "",
      robotTerms: true,
      walletAddress: "",
      registerOnChain: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!fileUploaded) {
      toast({
        title: "File required",
        description: "Please upload a file to register your IP.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert mediaType to MIME type format
      const mimeType = mimeTypeMap[values.mediaType];

      // Generate image and imageHash based on the uploaded file
      const imageUrl = uploadedFileName;
      const imageHash = CryptoJS.SHA256(uploadedFileName).toString();

      console.log("Image URL:", imageUrl);
      console.log("Image Hash:", imageHash);

      // Create IP Metadata from form values
      const ipMetadata = client.ipAsset.generateIpMetadata({
        title: values.name,
        description: values.description,
        createdAt: new Date().toISOString(),
        creators: [
          {
            name: values.creators,
            address: values.walletAddress,
            contributionPercent: 100,
          },
        ],
        mediaType: mimeType, // Use MIME type here
        tags: currentTags,
        external_url: values.external_url || undefined,
        image: imageUrl, // Add image URL
        imageHash: `0x${imageHash}`, // Add image hash
      });

      logToConsole("Generated IP Metadata:");
      logToConsole(ipMetadata);

      // Upload IP Metadata to IPFS using the existing function
      const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
      const ipHash = CryptoJS.SHA256(JSON.stringify(ipMetadata)).toString();

      logToConsole(`IP Metadata uploaded to IPFS with hash: ${ipIpfsHash}`);
      logToConsole(`IP Metadata hash: ${ipHash}`);

      // Mint NFT
      const tokenId = await mintNFT(account.address, `https://ipfs.io/ipfs/${ipIpfsHash}`);
      logToConsole(`NFT minted with tokenId: ${tokenId}`);
      logToConsole(`NFTContractAddress: ${NFTContractAddress}`);

      // Register IP Asset
      const response = await client.ipAsset.registerIpAndAttachPilTerms({
        nftContract: NFTContractAddress,
        tokenId: tokenId!,
        licenseTermsData: [
          {
            terms: createCommercialRemixTerms({ defaultMintingFee: 10, commercialRevShare: 5 }),
          },
        ],
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
          ipMetadataHash: `0x${ipHash}`,
        },
        txOptions: { waitForTransaction: true },
      });

      logToConsole("IP Asset registered successfully:");

      logToConsole(`Root IPA created:
        Transaction Hash: ${response.txHash},
              IPA ID: ${response.ipId}`
      );

      // Call Supabase API to insert data
      await insertDataToSupabase({
        name: values.name,
        description: values.description,
        createdAt: new Date().toISOString().replace("T", " ").split(".")[0], // Format as yyyy-mm-dd HH:MM:SS
        imageUrl: "", // Add logic to handle image URL if available
        metadata: {
          creator: values.creators,
          category: values.mediaType,
        },
        ipId: response.ipId,
      });

      toast({
        title: "IP Registration Successful",
        description: "Your IP has been registered successfully on Story Protocol.",
      });

      // Reset form
      form.reset();
      setFileUploaded(false);
      setCurrentTags([]);
    } catch (error) {
      logToConsole("Error occurred during registration:");
      logToConsole(error);

      if (error instanceof Error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Failed",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <FormHeader />

          <Card className="border-2 border-muted">
            <CardContent className="pt-6">
              <Form {...form}>
                <form
                  onSubmit={(event) => {
                    event.preventDefault(); // Prevent page refresh
                    form.handleSubmit(onSubmit)(event);
                  }}
                  className="space-y-6"
                >
                  <BasicInfoSection control={form.control} />

                  <FileUploadSection
                    control={form.control}
                    fileUploaded={fileUploaded}
                    setFileUploaded={setFileUploaded}
                    uploadedFileName={uploadedFileName}
                    setUploadedFileName={setUploadedFileName}
                  />

                  <TagsSection
                    control={form.control}
                    currentTags={currentTags}
                    setCurrentTags={setCurrentTags}
                  />

                  <OptionsSection control={form.control} />

                  <SubmitButton isSubmitting={isSubmitting} />
                </form>
              </Form>
            </CardContent>
            <FormFooter />
          </Card>

          <div className="mt-6 p-4 bg-gray-100 border rounded">
            <h3 className="text-lg font-bold">Console Output</h3>
            <div className="mt-2 h-96 overflow-y-auto bg-black text-white p-2 rounded">
              {consoleLogs.map((log, index) => (
                <div key={index}>{log}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
