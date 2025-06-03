
import { RoyaltyClaimsList } from "../royalty/RoyaltyClaimsList";

export const RoyaltyClaims = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Royalty Claims</h2>
      <p className="text-muted-foreground">
        Monitor and manage royalty distributions for your IP assets
      </p>
      <RoyaltyClaimsList />
    </div>
  );
};
