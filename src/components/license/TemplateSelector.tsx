
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DEFAULT_LICENSE_TEMPLATES, LicenseTemplate } from "@/types/LicensePIL";
import { IPType } from "@/types/IPAssetMetadata";
import { createLicenseTemplateFromIPType } from "@/utils/licenseUtils";
import { toast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

interface TemplateSelectorProps {
  ipAssetType: IPType;
  ipAssetId: string;
  form: UseFormReturn<any>;
}

export const TemplateSelector = ({ 
  ipAssetType, 
  ipAssetId, 
  form 
}: TemplateSelectorProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [useSmartDefaults, setUseSmartDefaults] = useState(true);
  
  // Handle template selection
  const applyTemplate = (templateId: string) => {
    const template = DEFAULT_LICENSE_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    setSelectedTemplate(templateId);
    
    // Update form values with template values
    form.setValue("flavor", template.template.flavor || form.getValues("flavor"));
    form.setValue("commercialUse", template.template.commercialUse ?? form.getValues("commercialUse"));
    form.setValue("commercialRevShare", template.template.commercialRevShare ?? form.getValues("commercialRevShare"));
    form.setValue("transferable", template.template.transferable ?? form.getValues("transferable"));
    form.setValue("derivativesAllowed", template.template.derivativesAllowed ?? form.getValues("derivativesAllowed"));
    form.setValue("derivativesApproval", template.template.derivativesApproval ?? form.getValues("derivativesApproval"));
    form.setValue("derivativesReciprocal", template.template.derivativesReciprocal ?? form.getValues("derivativesReciprocal"));
    form.setValue("jurisdiction", template.template.jurisdiction || form.getValues("jurisdiction"));
    form.setValue("governingLaw", template.template.governingLaw || form.getValues("governingLaw"));
    form.setValue("revocationConditions", template.template.revocationConditions || form.getValues("revocationConditions"));
    form.setValue("onchainEnforcement", template.template.onchainEnforcement ?? form.getValues("onchainEnforcement"));
    form.setValue("offchainEnforcement", template.template.offchainEnforcement || form.getValues("offchainEnforcement"));
    form.setValue("complianceRequirements", template.template.complianceRequirements || form.getValues("complianceRequirements"));
    
    toast({
      title: "Template Applied",
      description: `Applied "${template.name}" template with predefined settings.`,
    });
  };
  
  // Toggle smart defaults
  const toggleSmartDefaults = () => {
    setUseSmartDefaults(!useSmartDefaults);
    
    if (!useSmartDefaults) {
      // Apply IP type defaults if turning on
      const defaults = createLicenseTemplateFromIPType(ipAssetType, ipAssetId, form.getValues("licensee"));
      form.setValue("commercialUse", defaults.commercialUse);
      form.setValue("derivativesAllowed", defaults.derivativesAllowed);
      form.setValue("derivativesApproval", defaults.derivativesApproval);
      form.setValue("derivativesReciprocal", defaults.derivativesReciprocal);
      form.setValue("commercialRevShare", defaults.commercialRevShare);
      form.setValue("transferable", defaults.transferable);
      form.setValue("onchainEnforcement", defaults.onchainEnforcement);
      form.setValue("offchainEnforcement", defaults.offchainEnforcement);
      
      toast({
        title: "Smart Defaults Enabled",
        description: `Applied recommended settings for ${ipAssetType} assets.`,
      });
    }
  };
  
  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="smartDefaults" 
            checked={useSmartDefaults} 
            onCheckedChange={toggleSmartDefaults}
          />
          <label htmlFor="smartDefaults" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Use Smart Defaults
          </label>
        </div>
        
        <Select onValueChange={applyTemplate}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Apply Template" />
          </SelectTrigger>
          <SelectContent>
            {DEFAULT_LICENSE_TEMPLATES.map(template => (
              <SelectItem key={template.id} value={template.id}>
                {template.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedTemplate && (
        <div className="bg-muted p-3 rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">
              Using template: {DEFAULT_LICENSE_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => setSelectedTemplate(null)}>
            Clear
          </Button>
        </div>
      )}
    </>
  );
};
