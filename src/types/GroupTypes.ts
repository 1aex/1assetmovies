
import { IPAssetMetadata } from "./IPAssetMetadata";

export interface Group {
  id?: string;
  title: string;
  creator: string;
  ipAssetIds: string[];
  groupRewardShare: number;
  createdAt: string;
  ipAssets?: IPAssetMetadata[]; // Optional populated data
}
