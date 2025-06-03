
import { IPAssetMetadata } from "@/types/IPAssetMetadata";

// Import the real License type from the types directory
import { License as CoreLicense } from "@/types/LicenseTypes";

// This is the component-specific License type for UI display
export interface ComponentLicense {
  id: string;
  name: string;
  key: string;
  type: string;
  issueDate: string;
  expiryDate: string;
  status: string;
  owner: string;
  maxSeats: number;
  usedSeats: number;
  features: string[];
  restrictions: string[];
  ipAssetMetadata?: IPAssetMetadata;
}

// Re-export the core License type to avoid confusion
export type License = CoreLicense;
