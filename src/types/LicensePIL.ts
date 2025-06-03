
import { IPAssetMetadata } from "./IPAssetMetadata";

export interface LicensePIL {
  id: string;
  licenseVersion: string; // "2.0" for PIL licenses
  flavor: string;
  commercialUse: boolean;
  commercialRevShare: number;
  transferable: boolean;
  expiration: string;
  mintingFee: number;
  currency: string;
  derivativesAllowed: boolean;
  derivativesApproval: boolean;
  derivativesReciprocal: boolean;
  jurisdiction: string;
  governingLaw: string;
  revocationConditions: string;
  onchainEnforcement: boolean;
  offchainEnforcement: string;
  complianceRequirements: string;
  licensingHook: string;
  hookData: string;
  licenseUri: string;
  disabled: boolean;
  expectMinimumGroupRewardShare: number;
  expectGroupRewardPool: string;
  ipAssetId: string;
  licensee: string;
  status: string;
  createdAt: string;
  ipAssetMetadata?: IPAssetMetadata; // Optional populated data
}

// License templates system
export interface LicenseTemplate {
  flavor?: string;
  commercialUse?: boolean;
  commercialRevShare?: number;
  transferable?: boolean;
  expiration?: string;
  mintingFee?: number;
  currency?: string;
  derivativesAllowed?: boolean;
  derivativesApproval?: boolean;
  derivativesReciprocal?: boolean;
  jurisdiction?: string;
  governingLaw?: string;
  revocationConditions?: string;
  onchainEnforcement?: boolean;
  offchainEnforcement?: string;
  complianceRequirements?: string;
  licenseUri?: string;
}

export interface LicenseTemplateInfo {
  id: string;
  name: string;
  description: string;
  template: LicenseTemplate;
}

// Default templates
export const DEFAULT_LICENSE_TEMPLATES: LicenseTemplateInfo[] = [
  {
    id: "commercial-standard",
    name: "Standard Commercial",
    description: "Standard commercial license with revenue share",
    template: {
      flavor: "Commercial Standard",
      commercialUse: true,
      commercialRevShare: 5.0,
      transferable: false,
      derivativesAllowed: true,
      derivativesApproval: true,
      derivativesReciprocal: true,
      jurisdiction: "International",
      governingLaw: "California, United States",
      revocationConditions: "Violation of license terms",
      onchainEnforcement: true,
      offchainEnforcement: "DMCA + Legal action",
      complianceRequirements: "Attribution required, quarterly reporting"
    }
  },
  {
    id: "fan-license",
    name: "Fan Use License",
    description: "Non-commercial license for fan creations",
    template: {
      flavor: "Fan License",
      commercialUse: false,
      commercialRevShare: 0,
      transferable: false,
      derivativesAllowed: true,
      derivativesApproval: false,
      derivativesReciprocal: false,
      jurisdiction: "International",
      governingLaw: "",
      revocationConditions: "Commercial use of licensed content",
      onchainEnforcement: true,
      offchainEnforcement: "DMCA",
      complianceRequirements: "Attribution required"
    }
  },
  {
    id: "enterprise",
    name: "Enterprise License",
    description: "Full commercial rights with minimal restrictions",
    template: {
      flavor: "Enterprise License",
      commercialUse: true,
      commercialRevShare: 2.0,
      transferable: true,
      derivativesAllowed: true,
      derivativesApproval: false,
      derivativesReciprocal: false,
      jurisdiction: "International",
      governingLaw: "New York, United States",
      revocationConditions: "Non-payment of royalties",
      onchainEnforcement: true,
      offchainEnforcement: "Legal action",
      complianceRequirements: "Quarterly royalty payments, attribution not required"
    }
  }
];
