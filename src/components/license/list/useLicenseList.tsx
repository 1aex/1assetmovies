
import { useState } from "react";
import { License } from "@/types/LicenseTypes";
import { LicensePIL } from "@/types/LicensePIL";
import { mockLegacyLicenses, mockPILLicenses } from "@/components/license/mockData";
import { isPILLicense } from "@/utils/licenseUtils";

type MixedLicense = License | LicensePIL;

export const useLicenseList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState<string | null>(null);
  const [versionFilter, setVersionFilter] = useState<string | null>(null);
  
  // Combine both license types
  const [licenses] = useState<MixedLicense[]>([...mockLegacyLicenses, ...mockPILLicenses]);
  
  const filteredLicenses = licenses.filter(license => {
    // Handle search term for both license types
    const searchMatch = isPILLicense(license) 
      ? license.licensee.toLowerCase().includes(searchTerm.toLowerCase()) || 
        license.flavor.toLowerCase().includes(searchTerm.toLowerCase())
      : license.licensee.toLowerCase().includes(searchTerm.toLowerCase()) || 
        license.licenseFlavor.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Handle status filter
    const statusMatch = licenseFilter 
      ? license.status === licenseFilter
      : true;
    
    // Handle version filter
    const versionMatch = versionFilter
      ? license.licenseVersion === versionFilter
      : true;
    
    return searchMatch && statusMatch && versionMatch;
  });

  return {
    searchTerm,
    setSearchTerm,
    licenseFilter,
    setLicenseFilter,
    versionFilter,
    setVersionFilter,
    filteredLicenses,
    hasFilters: !!searchTerm || !!licenseFilter || !!versionFilter
  };
};
