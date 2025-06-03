
export interface User {
  uid: string;
  email: string;
  displayName: string;
  walletAddress: string;
  role: "creator" | "admin" | "viewer" | string;
}
