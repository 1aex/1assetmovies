
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Building, Globe } from "lucide-react";
import { Control } from "react-hook-form";

interface LegalTabProps {
  control: Control<any>;
}

export const LegalTab = ({ control }: LegalTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Jurisdiction & Enforcement</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="jurisdiction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurisdiction</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Globe className="mr-2 h-4 w-4 opacity-50" />
                    <Input placeholder="International" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Jurisdictional scope of this license
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="governingLaw"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Governing Law</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 opacity-50" />
                    <Input placeholder="California, United States" {...field} />
                  </div>
                </FormControl>
                <FormDescription>
                  Laws governing this license agreement
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Enforcement & Compliance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="onchainEnforcement"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>On-chain Enforcement</FormLabel>
                  <FormDescription>
                    Use smart contracts for automatic license enforcement
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="offchainEnforcement"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Off-chain Enforcement</FormLabel>
                <FormControl>
                  <Input placeholder="DMCA, Legal action" {...field} />
                </FormControl>
                <FormDescription>
                  Traditional enforcement mechanisms
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="revocationConditions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revocation Conditions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Conditions under which this license may be revoked"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Compliance Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <FormField
            control={control}
            name="complianceRequirements"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Additional compliance requirements for the licensee"
                    {...field}
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormDescription>
                  Specify requirements such as attribution, reporting, or other obligations
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
