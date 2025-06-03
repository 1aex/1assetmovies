
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LicenseDetailsProps {
  id: string;
  type: string;
  owner: string;
}

export const LicenseDetails = ({ id, type, owner }: LicenseDetailsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          License Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">License ID</p>
          <p className="font-medium">{id}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">License Type</p>
          <p className="font-medium">{type}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Owner</p>
          <p className="font-medium">{owner}</p>
        </div>
      </CardContent>
    </Card>
  );
};
