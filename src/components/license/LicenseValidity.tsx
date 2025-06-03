
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LicenseValidityProps {
  issueDate: string;
  expiryDate: string;
  daysUntilExpiry: number;
}

export const LicenseValidity = ({ issueDate, expiryDate, daysUntilExpiry }: LicenseValidityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Validity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Issue Date</p>
          <p className="font-medium">{new Date(issueDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Expiry Date</p>
          <p className="font-medium">{new Date(expiryDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Time Remaining</p>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <p className="font-medium">{daysUntilExpiry} days</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
