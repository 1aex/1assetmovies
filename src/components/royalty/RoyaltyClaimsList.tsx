
import { useState } from "react";
import { RoyaltyClaim } from "@/types/RoyaltyTypes";
import { 
  Calendar, Check, DollarSign, Search, SortDesc, X, Hourglass 
} from "lucide-react";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// Mock data - would be replaced with real API calls
const mockRoyaltyClaims: RoyaltyClaim[] = [
  {
    id: "claim1",
    claimedBy: "0x1234...5678",
    ipAssetId: "asset1",
    amount: 0.75,
    claimDate: "2023-11-02T09:30:00Z",
    status: "paid"
  },
  {
    id: "claim2",
    claimedBy: "0x8765...4321",
    ipAssetId: "asset2",
    amount: 1.25,
    claimDate: "2023-11-05T14:45:00Z",
    status: "pending"
  },
  {
    id: "claim3",
    claimedBy: "0x5432...9876",
    ipAssetId: "asset3",
    amount: 0.45,
    claimDate: "2023-10-28T11:15:00Z",
    status: "rejected"
  }
];

export const RoyaltyClaimsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [claims] = useState<RoyaltyClaim[]>(mockRoyaltyClaims);
  
  const filteredClaims = claims.filter(claim => 
    claim.claimedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.ipAssetId.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <Check className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Hourglass className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <X className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };
  
  // The rendering part of the component stays the same until the Badge variant
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search claims..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <SortDesc className="h-4 w-4" />
                <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Newest First</DropdownMenuItem>
              <DropdownMenuItem>Oldest First</DropdownMenuItem>
              <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {filteredClaims.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claimed By</TableHead>
                <TableHead>Asset ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClaims.map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono">{claim.claimedBy}</TableCell>
                  <TableCell>{claim.ipAssetId}</TableCell>
                  <TableCell className="flex items-center">
                    <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
                    {claim.amount} ETH
                  </TableCell>
                  <TableCell className="flex items-center text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(claim.claimDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        claim.status === "paid" ? "default" : 
                        claim.status === "pending" ? "outline" : "destructive"
                      }
                      className={`capitalize flex items-center gap-1 ${
                        claim.status === "paid" ? "bg-green-100 text-green-800" :
                        claim.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""
                      }`}
                    >
                      {getStatusIcon(claim.status)}
                      {claim.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      disabled={claim.status !== "pending"}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-10">
          <DollarSign className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Claims Found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try a different search term" : "No royalty claims have been made yet"}
          </p>
        </div>
      )}
    </div>
  );
};
