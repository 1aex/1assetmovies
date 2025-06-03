
import { GavelIcon } from "lucide-react";
import { useLicenseList } from "./list/useLicenseList";
import { LicenseListHeader } from "./list/LicenseListHeader";
import { LicenseTable } from "./list/LicenseTable";
import { LicenseEmptyState } from "./list/LicenseEmptyState";

export const LicenseList = () => {
  const { 
    searchTerm, 
    setSearchTerm, 
    filteredLicenses,
    licenseFilter,
    setLicenseFilter,
    versionFilter,
    setVersionFilter,
    hasFilters
  } = useLicenseList();
  
  return (
    <div className="space-y-4">
      <LicenseListHeader 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        licenseFilter={licenseFilter}
        setLicenseFilter={setLicenseFilter}
        versionFilter={versionFilter}
        setVersionFilter={setVersionFilter}
      />
      
      {filteredLicenses.length > 0 ? (
        <LicenseTable licenses={filteredLicenses} />
      ) : (
        <LicenseEmptyState hasFilters={hasFilters} />
      )}
    </div>
  );
};
