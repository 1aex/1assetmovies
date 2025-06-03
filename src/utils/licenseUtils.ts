
import { License } from "@/types/LicenseTypes";
import { LicensePIL, LicenseTemplate } from "@/types/LicensePIL";
import { IPType } from "@/types/IPAssetMetadata";

// Type guard to check if a license is a PIL license
export function isPILLicense(license: any): license is LicensePIL {
  return license && license.licenseVersion === "2.0";
}

// Convert legacy license to PIL format for compatibility
export function convertLegacyToPIL(license: License): LicensePIL {
  return {
    id: license.id || `legacy_${Date.now()}`,
    licenseVersion: "2.0", // Upgraded version
    flavor: license.licenseFlavor,
    commercialUse: license.licenseFlavor.toLowerCase().includes("commercial"),
    commercialRevShare: license.royaltyShare,
    transferable: false, // Safe default
    expiration: license.expiry,
    mintingFee: 0, // Default
    currency: "USD", // Default
    derivativesAllowed: false, // Safe default
    derivativesApproval: true, // Safe default
    derivativesReciprocal: true, // Safe default
    jurisdiction: "International", // Safe default
    governingLaw: "", // Unknown
    revocationConditions: "License terms violation", // Default
    onchainEnforcement: true, // Default
    offchainEnforcement: "DMCA + Legal", // Default
    complianceRequirements: "", // Unknown
    licensingHook: "",
    hookData: "",
    licenseUri: license.licenseUri,
    disabled: false,
    expectMinimumGroupRewardShare: 0,
    expectGroupRewardPool: "",
    ipAssetId: license.ipAssetId,
    licensee: license.licensee,
    status: license.status || "active",
    createdAt: license.mintedAt
  };
}

// Create license template based on IP type
export function createLicenseTemplateFromIPType(
  ipType: IPType, 
  ipAssetId: string,
  licensee: string
): LicenseTemplate {
  // Base template with defaults
  const template: LicenseTemplate = {
    flavor: `${ipType.charAt(0).toUpperCase() + ipType.slice(1)} License`,
    commercialUse: false,
    commercialRevShare: 5.0,
    transferable: false,
    expiration: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    mintingFee: 0,
    currency: "USD",
    derivativesAllowed: false,
    derivativesApproval: true,
    derivativesReciprocal: true,
    jurisdiction: "International",
    governingLaw: "",
    revocationConditions: "License terms violation",
    onchainEnforcement: true,
    offchainEnforcement: "DMCA + Legal action",
    complianceRequirements: "Attribution required"
  };
  
  // Customize based on IP type
  switch (ipType) {
    case "script":
      template.commercialUse = false;
      template.derivativesAllowed = false;
      template.commercialRevShare = 8.0;
      break;
    case "character":
      template.commercialUse = false;
      template.derivativesAllowed = true;
      template.derivativesApproval = true;
      template.commercialRevShare = 10.0;
      break;
    case "scene":
      template.commercialUse = false;
      template.derivativesAllowed = true;
      template.derivativesApproval = false;
      template.commercialRevShare = 5.0;
      break;
    case "film":
      template.commercialUse = false;
      template.derivativesAllowed = false;
      template.commercialRevShare = 15.0;
      break;
    case "music":
      template.commercialUse = false;
      template.derivativesAllowed = false;
      template.commercialRevShare = 12.0;
      break;
    case "visual":
      template.commercialUse = false;
      template.derivativesAllowed = true;
      template.derivativesApproval = false;
      template.commercialRevShare = 8.0;
      break;
    default:
      // Default settings for "other" or unknown types
      break;
  }
  
  return template;
}

// Build a full PIL license from a template
export function buildLicenseFromTemplate(
  template: LicenseTemplate,
  ipAssetId: string,
  licensee: string
): LicensePIL {
  return {
    id: `pil_${Date.now().toString(36)}`,
    licenseVersion: "2.0",
    flavor: template.flavor || "Standard License",
    commercialUse: template.commercialUse || false,
    commercialRevShare: template.commercialRevShare || 0,
    transferable: template.transferable || false,
    expiration: template.expiration || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    mintingFee: template.mintingFee || 0,
    currency: template.currency || "USD",
    derivativesAllowed: template.derivativesAllowed || false,
    derivativesApproval: template.derivativesApproval !== undefined ? template.derivativesApproval : true,
    derivativesReciprocal: template.derivativesReciprocal !== undefined ? template.derivativesReciprocal : true,
    jurisdiction: template.jurisdiction || "International",
    governingLaw: template.governingLaw || "",
    revocationConditions: template.revocationConditions || "License terms violation",
    onchainEnforcement: template.onchainEnforcement !== undefined ? template.onchainEnforcement : true,
    offchainEnforcement: template.offchainEnforcement || "DMCA + Legal action",
    complianceRequirements: template.complianceRequirements || "",
    licensingHook: "",
    hookData: "",
    licenseUri: template.licenseUri || `https://license.example.com/${Date.now().toString(36)}`,
    disabled: false,
    expectMinimumGroupRewardShare: 0,
    expectGroupRewardPool: "",
    ipAssetId,
    licensee,
    status: "active",
    createdAt: new Date().toISOString()
  };
}
