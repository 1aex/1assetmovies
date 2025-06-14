import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GavelIcon } from "lucide-react";
import { LicenseListHeader } from "./list/LicenseListHeader";
import { LicenseEmptyState } from "./list/LicenseEmptyState";
import { Button } from "@/components/ui/button";

export interface License {
  id: string;
  assetName?: string;
  name?: string;
  license_type?: string;
  royalty_percentage?: number;
  issued_at?: string;
  transaction_hash?: string;
  version?: string;
  // ...other fields as needed
}

export const LicenseList = () => {
  const [licenses, setLicenses] = useState<License[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [licenseFilter, setLicenseFilter] = useState("");
  const [versionFilter, setVersionFilter] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLicenses = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/mint",
          {
            headers: {
              apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
              Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
              "Content-Type": "application/json",
            },
          }
        );
        const mintData = await response.json();

        // Fetch item details for each license (like in page LicenseList)
        const itemPromises = mintData.map(async (license: any) => {
          let items: any[] = [];
          try {
            const itemResponse = await fetch(
              `https://cbgqjdrwffppgxbnsvds.supabase.co/rest/v1/items?ip_id=eq.${license.ip_id}`,
              {
                headers: {
                  apikey: `${import.meta.env.VITE_SUPABASE_KEY}`,
                  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_KEY}`,
                  "Content-Type": "application/json",
                },
              }
            );
            items = await itemResponse.json();
          } catch {
            items = [];
          }
          // Attach all items as array (for table display)
          return { ...license, item: items };
        });

        const licensesWithItems = await Promise.all(itemPromises);
        setLicenses(licensesWithItems);
      } catch (error) {
        setLicenses([]);
      }
      setLoading(false);
    };
    fetchLicenses();
  }, []);

  // Filtering logic
  const filteredLicenses = licenses.filter((license) => {
    // Search in all item names if present, else fallback
    const assetNames = Array.isArray(license.item)
      ? license.item
          .map(
            (it: any) =>
              it.assetName ||
              it.name ||
              it.title ||
              it.asset_name ||
              ""
          )
          .join(" ")
      : license.assetName || license.name || license.title || license.asset_name || "";

    const matchesSearch =
      searchTerm === "" ||
      assetNames.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLicenseType =
      !licenseFilter || license.license_type === licenseFilter;
    const matchesVersion =
      !versionFilter || license.version === versionFilter;
    return matchesSearch && matchesLicenseType && matchesVersion;
  });

  const hasFilters =
    !!searchTerm || !!licenseFilter || !!versionFilter;

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

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading...
        </div>
      ) : filteredLicenses.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Asset
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  License Type
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Royalty %
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Issued
                </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map((license) => (
                <tr key={license.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {/* Show asset names from item array if present, else fallback */}
                    {Array.isArray(license.item) && license.item.length > 0
                      ? license.item
                          .map(
                            (it: any) =>
                              it.assetName ||
                              it.name ||
                              it.title ||
                              it.asset_name ||
                              ""
                          )
                          .filter(Boolean)
                          .join(", ")
                      : license.assetName ||
                        license.name ||
                        license.title ||
                        license.asset_name ||
                        ""}
                  </td>
                  <td className="px-4 py-2">{license.license_type}</td>
                  <td className="px-4 py-2">
                    {license.royalty_percentage}%
                  </td>
                  <td className="px-4 py-2">
                    {license.issued_at
                      ? new Date(license.issued_at).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="px-4 py-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        navigate(
                          `/license/${license.transaction_hash || license.id}`
                        )
                      }
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <LicenseEmptyState hasFilters={hasFilters} />
      )}
    </div>
  );
};
