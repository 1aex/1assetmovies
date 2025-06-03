
export type MediaType = "image" | "video" | "audio" | "script" | "pdf" | "other";

export type IPType = "script" | "character" | "scene" | "film" | "music" | "visual" | "other";

export interface IPAttribute {
  trait_type: string;
  value: string;
}

export interface IPAssetMetadata {
  ipIdentifier: string;
  name: string;
  description: string;
  image?: string;
  imageHash?: string;
  mediaUrl?: string;
  mediaHash?: string;
  mediaType: MediaType;
  createdAt: string;
  creators: string[];
  ipType: IPType;
  tags: string[];
  attributes?: IPAttribute[];
  external_url?: string;
  animation_url?: string;
  background_color?: string;
  media?: string[];
  relationships?: string[];
  watermarkImage?: string;
  app?: string;
  robotTerms: boolean;
  additionalProperties?: Record<string, any>;
}
