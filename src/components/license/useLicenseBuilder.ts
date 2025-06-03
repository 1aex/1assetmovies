
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LicensePIL } from "@/types/LicensePIL";
import { toast } from "@/hooks/use-toast";
import { createLicenseTemplateFromIPType } from "@/utils/licenseUtils";
import { IPType } from "@/types/IPAssetMetadata";

const formSchema = z.object({
  flavor: z.string().min(2, "License type is required"),
  commercialUse: z.boolean().default(false),
  commercialRevShare: z.number().min(0).max(100),
  transferable: z.boolean().default(false),
  expiration: z.string().min(1, "Expiration date is required"),
  mintingFee: z.number().min(0),
  currency: z.string().default("USD"),
  derivativesAllowed: z.boolean().default(false),
  derivativesApproval: z.boolean().default(true),
  derivativesReciprocal: z.boolean().default(true),
  jurisdiction: z.string(),
  governingLaw: z.string(),
  revocationConditions: z.string(),
  onchainEnforcement: z.boolean().default(true),
  offchainEnforcement: z.string(),
  complianceRequirements: z.string(),
  licenseUri: z.string().optional(),
  licensee: z.string().min(2, "Licensee is required"),
});

export type LicenseFormValues = z.infer<typeof formSchema>;

export const useLicenseBuilder = (
  ipAssetId: string,
  ipAssetType: IPType,
  onLicenseCreated?: (license: LicensePIL) => void
) => {
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Initialize form with defaults based on IP type
  const defaultValues = createLicenseTemplateFromIPType(ipAssetType, ipAssetId, "");
  
  const form = useForm<LicenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      flavor: defaultValues?.flavor || "",
      commercialUse: defaultValues?.commercialUse || false,
      commercialRevShare: defaultValues?.commercialRevShare || 0,
      transferable: defaultValues?.transferable || false,
      expiration: defaultValues?.expiration 
        ? new Date(defaultValues.expiration).toISOString().split('T')[0]
        : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      mintingFee: defaultValues?.mintingFee || 0,
      currency: defaultValues?.currency || "USD",
      derivativesAllowed: defaultValues?.derivativesAllowed || false,
      derivativesApproval: defaultValues?.derivativesApproval || false,
      derivativesReciprocal: defaultValues?.derivativesReciprocal || false,
      jurisdiction: defaultValues?.jurisdiction || "",
      governingLaw: defaultValues?.governingLaw || "",
      revocationConditions: defaultValues?.revocationConditions || "",
      onchainEnforcement: defaultValues?.onchainEnforcement || true,
      offchainEnforcement: defaultValues?.offchainEnforcement || "",
      complianceRequirements: defaultValues?.complianceRequirements || "",
      licenseUri: defaultValues?.licenseUri || "",
      licensee: "",
    }
  });

  const onSubmit = async (values: LicenseFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Create the PIL license
      const newLicense: LicensePIL = {
        id: `pil_${Date.now().toString(36)}`,
        licenseVersion: "2.0",
        flavor: values.flavor,
        commercialUse: values.commercialUse,
        commercialRevShare: values.commercialRevShare,
        transferable: values.transferable,
        expiration: new Date(values.expiration).toISOString(),
        mintingFee: values.mintingFee,
        currency: values.currency,
        derivativesAllowed: values.derivativesAllowed,
        derivativesApproval: values.derivativesApproval,
        derivativesReciprocal: values.derivativesReciprocal,
        jurisdiction: values.jurisdiction,
        governingLaw: values.governingLaw,
        revocationConditions: values.revocationConditions,
        onchainEnforcement: values.onchainEnforcement,
        offchainEnforcement: values.offchainEnforcement,
        complianceRequirements: values.complianceRequirements,
        licensingHook: "",
        hookData: "",
        licenseUri: values.licenseUri || `https://license.example.com/${Date.now().toString(36)}`,
        disabled: false,
        expectMinimumGroupRewardShare: 0,
        expectGroupRewardPool: "",
        ipAssetId,
        licensee: values.licensee,
        status: "active",
        createdAt: new Date().toISOString()
      };
      
      toast({
        title: "License Created",
        description: `Successfully created ${values.flavor} license for ${values.licensee}.`,
      });
      
      if (onLicenseCreated) {
        onLicenseCreated(newLicense);
      }
    } catch (error) {
      console.error("Error creating license:", error);
      toast({
        title: "Error",
        description: "Failed to create license. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return {
    form,
    activeTab,
    setActiveTab,
    onSubmit,
    isSubmitting
  };
};
