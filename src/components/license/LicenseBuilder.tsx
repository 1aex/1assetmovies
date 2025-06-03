
import { useState } from "react";
import { LicensePIL } from "@/types/LicensePIL";
import { IPType } from "@/types/IPAssetMetadata";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BasicInfoTab } from "./tabs/BasicInfoTab";
import { UsageRightsTab } from "./tabs/UsageRightsTab";
import { DerivativesTab } from "./tabs/DerivativesTab";
import { LegalTab } from "./tabs/LegalTab";
import { TemplateSelector } from "./TemplateSelector";
import { NavButtons, TabNavigation } from "./navigation";
import { useLicenseBuilder } from "./useLicenseBuilder";

interface LicenseBuilderProps {
  ipAssetId: string;
  ipAssetType: IPType;
  onLicenseCreated?: (license: LicensePIL) => void;
}

export const LicenseBuilder = ({ ipAssetId, ipAssetType, onLicenseCreated }: LicenseBuilderProps) => {
  const { form, activeTab, setActiveTab, onSubmit, isSubmitting } = useLicenseBuilder(
    ipAssetId, 
    ipAssetType, 
    onLicenseCreated
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Create PIL License</h2>
          <p className="text-muted-foreground">
            Create a new Programmable IP License (PIL) for your asset
          </p>
        </div>
        
        <TemplateSelector 
          ipAssetType={ipAssetType} 
          ipAssetId={ipAssetId} 
          form={form} 
        />
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
            
            <TabsContent value="basic" className="space-y-4 mt-4">
              <BasicInfoTab control={form.control} />
            </TabsContent>
            
            <TabsContent value="rights" className="space-y-4 mt-4">
              <UsageRightsTab 
                control={form.control} 
                watch={form.watch} 
                setValue={form.setValue}
              />
            </TabsContent>
            
            <TabsContent value="derivatives" className="space-y-4 mt-4">
              <DerivativesTab control={form.control} watch={form.watch} />
            </TabsContent>
            
            <TabsContent value="legal" className="space-y-4 mt-4">
              <LegalTab control={form.control} />
            </TabsContent>
          </Tabs>
          
          <NavButtons 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
    </div>
  );
};

export default LicenseBuilder;
