
import { ChevronLeft, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface LicenseHeaderProps {
  name: string;
  status: string;
}

export const LicenseHeader = ({ name, status }: LicenseHeaderProps) => {
  return (
    <div className="mb-6">
      <Link to="/marketplace" className="flex items-center text-primary hover:underline mb-4">
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Marketplace
      </Link>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="p-2 rounded-full bg-primary/10 mr-4">
            <FileText className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">{name}</h1>
        </div>
        
        <Badge variant={status === "active" ? "default" : "destructive"} className="text-xs capitalize">
          {status}
        </Badge>
      </div>
    </div>
  );
};
