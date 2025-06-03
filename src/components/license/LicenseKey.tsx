
import { Copy, Shield } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

interface LicenseKeyProps {
  licenseKey: string;
}

export const LicenseKey = ({ licenseKey }: LicenseKeyProps) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "License key copied",
      description: "The license key has been copied to your clipboard.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          License Key
        </CardTitle>
        <CardDescription>Your unique license key for activation</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-md flex justify-between items-center">
          <code className="font-mono text-sm md:text-base">{licenseKey}</code>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(licenseKey)}
            className="ml-2"
          >
            {copied ? "Copied!" : <Copy className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
