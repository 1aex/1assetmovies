
import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LicenseUsageProps {
  usedSeats: number;
  maxSeats: number;
}

export const LicenseUsage = ({ usedSeats, maxSeats }: LicenseUsageProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          Usage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Seat Allocation</p>
          <div className="flex items-end gap-2">
            <p className="font-medium text-xl">{usedSeats}</p>
            <p className="text-muted-foreground text-sm">/ {maxSeats} seats</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div 
              className="bg-primary rounded-full h-2" 
              style={{ width: `${(usedSeats / maxSeats) * 100}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
