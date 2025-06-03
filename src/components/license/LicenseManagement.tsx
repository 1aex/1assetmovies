
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Share2, AlertTriangle } from "lucide-react";

export const LicenseManagement = () => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle>License Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-4">
          <Button variant="default" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Renew License
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Transfer License
          </Button>
          <Button variant="secondary" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Certificate
          </Button>
          <Button variant="destructive" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Report Issue
          </Button>
        </div>
        
        <div className="text-sm text-muted-foreground mt-2">
          <p>This license is tied to the IP Asset as defined in the global IP Metadata schema.</p>
        </div>
      </CardContent>
    </Card>
  );
};
