
import { Filter, Search, SortDesc, GavelIcon, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger, DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

interface LicenseListHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setLicenseFilter: (filter: string | null) => void;
  setVersionFilter: (version: string | null) => void;
  licenseFilter: string | null;
  versionFilter: string | null;
}

export const LicenseListHeader = ({ 
  searchTerm, 
  setSearchTerm, 
  setLicenseFilter, 
  setVersionFilter,
  licenseFilter,
  versionFilter
}: LicenseListHeaderProps) => {
  const [isFiltering, setIsFiltering] = useState(false);
  
  // Check if any filters are applied
  useEffect(() => {
    setIsFiltering(!!licenseFilter || !!versionFilter);
  }, [licenseFilter, versionFilter]);
  
  const clearFilters = () => {
    setLicenseFilter(null);
    setVersionFilter(null);
  };
  
  const getStatusLabel = () => {
    return licenseFilter ? `Status: ${licenseFilter}` : "Status";
  };
  
  const getVersionLabel = () => {
    return versionFilter ? `Version: ${versionFilter === "1.0" ? "Legacy v1.0" : "PIL v2.0"}` : "Version";
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search licenses..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={licenseFilter ? "default" : "outline"} 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                <span>{getStatusLabel()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setLicenseFilter(null)}>All Statuses</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLicenseFilter("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLicenseFilter("expired")}>Expired</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLicenseFilter("revoked")}>Revoked</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant={versionFilter ? "default" : "outline"} 
                size="sm" 
                className="flex items-center gap-2"
              >
                <GavelIcon className="h-4 w-4" />
                <span>{getVersionLabel()}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by Version</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setVersionFilter(null)}>All Versions</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVersionFilter("1.0")}>Legacy v1.0</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVersionFilter("2.0")}>PIL v2.0</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                <span>Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Licenses</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Royalty (High to Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {isFiltering && (
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {licenseFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Status: {licenseFilter}
                <button
                  onClick={() => setLicenseFilter(null)}
                  className="ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {versionFilter && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Version: {versionFilter === "1.0" ? "Legacy v1.0" : "PIL v2.0"}
                <button
                  onClick={() => setVersionFilter(null)}
                  className="ml-1 rounded-full hover:bg-primary/20"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};
