
import { Award } from "lucide-react";

interface LicenseEmptyStateProps {
  hasFilters: boolean;
}

export const LicenseEmptyState = ({ hasFilters }: LicenseEmptyStateProps) => {
  return (
    <div className="text-center py-10">
      <Award className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-semibold mb-2">No Licenses Found</h3>
      <p className="text-muted-foreground">
        {hasFilters ? 
          "Try adjusting your filters" : 
          "No licenses have been issued yet"}
      </p>
    </div>
  );
};
