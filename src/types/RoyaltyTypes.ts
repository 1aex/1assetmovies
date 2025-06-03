
import { IPAssetMetadata } from "./IPAssetMetadata";

export interface RoyaltyClaim {
  id?: string;
  claimedBy: string;
  ipAssetId: string;
  amount: number;
  claimDate: string;
  status: "pending" | "paid" | "rejected" | string;
  ipAssetMetadata?: IPAssetMetadata; // Optional populated data
}
