
import { IPAssetMetadata } from "./IPAssetMetadata";

export interface License {
  id?: string;
  licensee: string;
  ipAssetId: string;
  licenseFlavor: string;
  royaltyShare: number;
  mintedAt: string;
  expiry: string;
  licenseUri: string;
  status?: "active" | "expired" | "revoked" | string;
  ipAssetMetadata?: IPAssetMetadata; // Optional populated data
  licenseVersion?: string; // Added field for version compatibility
}
