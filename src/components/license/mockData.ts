
import { License } from "@/types/LicenseTypes";
import { LicensePIL } from "@/types/LicensePIL";

export const mockLicenses = [
  {
    id: "lic_01234",
    name: "Standard Commercial License",
    key: "SCL-2023-ABCD-EFGH",
    type: "Commercial",
    issueDate: "2023-11-10",
    expiryDate: "2024-11-10",
    status: "active",
    owner: "Studio Alpha",
    maxSeats: 10,
    usedSeats: 4,
    features: [
      "Commercial use allowed",
      "Worldwide distribution rights",
      "12-month validity",
      "10 authorized users"
    ],
    restrictions: [
      "No sublicensing allowed",
      "No modification without approval",
      "Attribution required",
      "Regular usage reporting"
    ]
  },
  {
    id: "lic_56789",
    name: "Educational License",
    key: "EDU-2023-WXYZ-1234",
    type: "Educational",
    issueDate: "2023-09-15",
    expiryDate: "2024-09-15",
    status: "active",
    owner: "Media University",
    maxSeats: 50,
    usedSeats: 22,
    features: [
      "Academic use allowed",
      "Classroom distribution",
      "12-month validity",
      "50 authorized students"
    ],
    restrictions: [
      "Non-commercial use only",
      "Campus use only",
      "Attribution required",
      "No public distribution"
    ]
  },
  {
    id: "lic_98765",
    name: "Limited Preview License",
    key: "PRV-2023-QWER-9876",
    type: "Preview",
    issueDate: "2023-10-01",
    expiryDate: "2023-11-01",
    status: "expired",
    owner: "Review Platform Inc",
    maxSeats: 5,
    usedSeats: 5,
    features: [
      "Review purposes only",
      "1-month validity",
      "5 authorized reviewers"
    ],
    restrictions: [
      "Non-commercial use only",
      "No distribution allowed",
      "Watermarked content",
      "Confidentiality required"
    ]
  }
];

// Legacy-style license data (v1.0)
export const mockLegacyLicenses: License[] = [
  {
    id: "license1",
    licensee: "Studio Alpha",
    ipAssetId: "asset1",
    licenseFlavor: "Commercial",
    royaltyShare: 3.5,
    mintedAt: "2023-10-15T10:30:00Z",
    expiry: "2024-10-15T10:30:00Z",
    licenseUri: "https://example.com/license/1",
    status: "active",
    licenseVersion: "1.0"
  },
  {
    id: "license2",
    licensee: "Indie Films",
    ipAssetId: "asset2",
    licenseFlavor: "Educational",
    royaltyShare: 2.0,
    mintedAt: "2023-09-05T14:45:00Z",
    expiry: "2023-12-05T14:45:00Z",
    licenseUri: "https://example.com/license/2",
    status: "expired",
    licenseVersion: "1.0"
  },
];

// PIL-compliant license data (v2.0)
export const mockPILLicenses: LicensePIL[] = [
  {
    id: "pil1",
    licenseVersion: "2.0",
    flavor: "Commercial",
    commercialUse: true,
    commercialRevShare: 5.0,
    transferable: false,
    expiration: "2024-12-31T23:59:59Z",
    mintingFee: 100,
    currency: "USD",
    derivativesAllowed: true,
    derivativesApproval: true,
    derivativesReciprocal: true,
    jurisdiction: "United States",
    governingLaw: "California",
    revocationConditions: "License terms violation",
    onchainEnforcement: true,
    offchainEnforcement: "DMCA + Legal action",
    complianceRequirements: "Monthly usage reporting",
    licensingHook: "https://api.example.com/hooks/license1",
    hookData: "{}",
    licenseUri: "https://example.com/pil/1",
    disabled: false,
    expectMinimumGroupRewardShare: 2.5,
    expectGroupRewardPool: "pool1",
    ipAssetId: "asset1",
    licensee: "Major Studio Productions",
    status: "active",
    createdAt: "2024-01-15T08:00:00Z"
  },
  {
    id: "pil2",
    licenseVersion: "2.0",
    flavor: "Fan License",
    commercialUse: false,
    commercialRevShare: 0,
    transferable: true,
    expiration: "2025-01-01T23:59:59Z",
    mintingFee: 0,
    currency: "USD",
    derivativesAllowed: true,
    derivativesApproval: false,
    derivativesReciprocal: false,
    jurisdiction: "International",
    governingLaw: "",
    revocationConditions: "Unauthorized commercial use",
    onchainEnforcement: true,
    offchainEnforcement: "DMCA",
    complianceRequirements: "Attribution required",
    licensingHook: "",
    hookData: "",
    licenseUri: "https://example.com/pil/2",
    disabled: false,
    expectMinimumGroupRewardShare: 0,
    expectGroupRewardPool: "",
    ipAssetId: "asset3",
    licensee: "Fan Community DAO",
    status: "active",
    createdAt: "2024-02-10T14:30:00Z"
  }
];
