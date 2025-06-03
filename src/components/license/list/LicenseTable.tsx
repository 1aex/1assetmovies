
import { License } from "@/types/LicenseTypes";
import { LicensePIL } from "@/types/LicensePIL";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, Clock, DollarSign, GavelIcon, X } from "lucide-react";
import { isPILLicense } from "@/utils/licenseUtils";

type MixedLicense = License | LicensePIL;

interface LicenseTableProps {
  licenses: MixedLicense[];
}

export const LicenseTable = ({ licenses }: LicenseTableProps) => {
  // Helper to get license type regardless of license version
  const getLicenseType = (license: MixedLicense) => {
    return isPILLicense(license) ? license.flavor : license.licenseFlavor;
  };
  
  // Helper to get royalty/revshare regardless of license version
  const getRoyaltyShare = (license: MixedLicense) => {
    return isPILLicense(license) ? license.commercialRevShare : license.royaltyShare;
  };
  
  // Helper to get expiry date regardless of license version
  const getExpiryDate = (license: MixedLicense) => {
    return isPILLicense(license) ? license.expiration : license.expiry;
  };
  
  // Helper to get version badge styling
  const getVersionBadge = (license: MixedLicense) => {
    if (isPILLicense(license)) {
      return <Badge variant="outline" className="bg-blue-100 text-blue-800">PIL v2.0</Badge>;
    }
    return <Badge variant="outline" className="bg-gray-100 text-gray-800">Legacy v1.0</Badge>;
  };
  
  // Helper for commercial use status
  const getCommercialUseStatus = (license: MixedLicense) => {
    if (isPILLicense(license)) {
      return license.commercialUse ? 
        <Check className="h-4 w-4 text-green-600" /> : 
        <X className="h-4 w-4 text-red-600" />;
    }
    // For legacy licenses, infer from license flavor
    return license.licenseFlavor.toLowerCase().includes("commercial") ? 
      <Check className="h-4 w-4 text-green-600" /> : 
      <X className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Licensee</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Commercial</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Royalty</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {licenses.map((license) => (
            <TableRow key={license.id}>
              <TableCell>{license.licensee}</TableCell>
              <TableCell>{getLicenseType(license)}</TableCell>
              <TableCell>{getVersionBadge(license)}</TableCell>
              <TableCell className="text-center">{getCommercialUseStatus(license)}</TableCell>
              <TableCell>
                <Badge 
                  variant={license.status === "active" ? "default" : "secondary"}
                  className={`capitalize ${
                    license.status === "active" ? "bg-green-100 text-green-800" :
                    license.status === "expired" ? "bg-gray-100 text-gray-800" :
                    license.status === "revoked" ? "bg-red-100 text-red-800" : ""
                  }`}
                >
                  {license.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center">
                <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                {getRoyaltyShare(license)}%
              </TableCell>
              <TableCell className="flex items-center text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {new Date(getExpiryDate(license)).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" asChild>
                  <Link to={`/license?id=${license.id}`}>Details</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
