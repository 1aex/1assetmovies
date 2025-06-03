
import { LicensePIL } from "@/types/LicensePIL";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, Building, Scale, Check, X, Globe, GavelIcon, 
  Banknote, GitBranch, Shield, AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface PILLicenseDetailsProps {
  license: LicensePIL;
}

export const PILLicenseDetails = ({ license }: PILLicenseDetailsProps) => {
  return (
    <Card className="md:col-span-3">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            PIL License Details
          </CardTitle>
          <Badge variant="outline" className="ml-2">v{license.licenseVersion}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="basic">
            <AccordionTrigger>Basic Information</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">License ID</p>
                  <p className="font-medium">{license.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Type</p>
                  <p className="font-medium">{license.flavor}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Licensee</p>
                  <p className="font-medium">{license.licensee}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">IP Asset ID</p>
                  <p className="font-medium">{license.ipAssetId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Created At</p>
                  <p className="font-medium">{new Date(license.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiration</p>
                  <p className="font-medium">{new Date(license.expiration).toLocaleDateString()}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="usage">
            <AccordionTrigger>Usage Rights</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Commercial Use:</p>
                  {license.commercialUse ? 
                    <Badge className="bg-green-100 text-green-800">Allowed</Badge> : 
                    <Badge className="bg-red-100 text-red-800">Not Allowed</Badge>
                  }
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Commercial Revenue Share</p>
                  <p className="font-medium">{license.commercialRevShare}%</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Derivatives:</p>
                  {license.derivativesAllowed ? 
                    <Badge className="bg-green-100 text-green-800">Allowed</Badge> : 
                    <Badge className="bg-red-100 text-red-800">Not Allowed</Badge>
                  }
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Requires Approval:</p>
                  {license.derivativesApproval ? 
                    <Badge className="bg-yellow-100 text-yellow-800">Yes</Badge> : 
                    <Badge className="bg-green-100 text-green-800">No</Badge>
                  }
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Reciprocal Terms:</p>
                  {license.derivativesReciprocal ? 
                    <Badge className="bg-blue-100 text-blue-800">Required</Badge> : 
                    <Badge className="bg-green-100 text-green-800">Not Required</Badge>
                  }
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Transferable:</p>
                  {license.transferable ? 
                    <Badge className="bg-green-100 text-green-800">Yes</Badge> : 
                    <Badge className="bg-red-100 text-red-800">No</Badge>
                  }
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="legal">
            <AccordionTrigger>Legal & Compliance</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Jurisdiction</p>
                  <p className="font-medium flex items-center">
                    <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                    {license.jurisdiction || "Not specified"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Governing Law</p>
                  <p className="font-medium flex items-center">
                    <GavelIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                    {license.governingLaw || "Not specified"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Revocation Conditions</p>
                  <p className="font-medium">{license.revocationConditions || "Not specified"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Compliance Requirements</p>
                  <p className="font-medium">{license.complianceRequirements || "Not specified"}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">On-chain Enforcement:</p>
                  {license.onchainEnforcement ? 
                    <Badge className="bg-green-100 text-green-800">Enabled</Badge> : 
                    <Badge className="bg-gray-100 text-gray-800">Disabled</Badge>
                  }
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Off-chain Enforcement</p>
                  <p className="font-medium">{license.offchainEnforcement || "None"}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="financial">
            <AccordionTrigger>Financial Terms</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Minting Fee</p>
                  <p className="font-medium flex items-center">
                    <Banknote className="h-4 w-4 mr-1 text-muted-foreground" />
                    {license.mintingFee > 0 ? `${license.mintingFee} ${license.currency}` : "None"}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Currency</p>
                  <p className="font-medium">{license.currency}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Group Reward Share</p>
                  <p className="font-medium">{license.expectMinimumGroupRewardShare}%</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Group Reward Pool</p>
                  <p className="font-medium">{license.expectGroupRewardPool || "Not specified"}</p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="technical">
            <AccordionTrigger>Technical Details</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Licensing Hook</p>
                  <p className="font-medium">{license.licensingHook || "None"}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">License URI</p>
                  <p className="font-medium font-mono text-sm text-blue-600 truncate">
                    {license.licenseUri}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Status:</p>
                  <Badge 
                    variant={
                      license.status === "active" ? "default" : 
                      license.status === "pending" ? "outline" : "destructive"
                    }
                    className={`capitalize ${
                      license.status === "active" ? "bg-green-100 text-green-800" :
                      license.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""
                    }`}
                  >
                    {license.status}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <p className="text-sm text-muted-foreground">Disabled:</p>
                  {license.disabled ? 
                    <Badge variant="destructive">Yes</Badge> : 
                    <Badge className="bg-green-100 text-green-800">No</Badge>
                  }
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
