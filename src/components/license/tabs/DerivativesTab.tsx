
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Control } from "react-hook-form";

interface DerivativesTabProps {
  control: Control<any>;
  watch: (name: string) => any;
}

export const DerivativesTab = ({ control, watch }: DerivativesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Derivative Works</CardTitle>
        <CardDescription>
          Control how the IP can be remixed or adapted
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FormField
          control={control}
          name="derivativesAllowed"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Derivatives Allowed</FormLabel>
                <FormDescription>
                  Licensee may create derivative works based on this IP
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        {watch("derivativesAllowed") && (
          <>
            <FormField
              control={control}
              name="derivativesApproval"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Approval Required</FormLabel>
                    <FormDescription>
                      Derivatives require explicit approval from the IP creator
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="derivativesReciprocal"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Reciprocal Licensing</FormLabel>
                    <FormDescription>
                      Derivatives must be licensed under same or compatible terms
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};
