
import { LicenseList } from "../license/LicenseList";

export const LicenseManagement = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">License Management</h2>
      <p className="text-muted-foreground">
        Track and manage IP licenses issued to collaborators and users
      </p>
      <LicenseList />
    </div>
  );
};
