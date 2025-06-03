
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign } from "lucide-react";
import { Control } from "react-hook-form";

interface UsageRightsTabProps {
  control: Control<any>;
  watch: (name: string) => any;
  setValue: (name: string, value: any) => void;
}

export const UsageRightsTab = ({ control, watch, setValue }: UsageRightsTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Commercial Rights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="commercialUse"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Commercial Use Allowed</FormLabel>
                  <FormDescription>
                    Licensee may use the IP for commercial purposes
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="commercialRevShare"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Revenue Share Percentage</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 opacity-50" />
                    <Input 
                      type="number" 
                      min="0" 
                      max="100" 
                      step="0.1"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Percentage of revenue shared back to the IP creator
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Transferability</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={control}
            name="transferable"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Transferable License</FormLabel>
                  <FormDescription>
                    Licensee may transfer this license to another party
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="mintingFee"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minting Fee</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      min="0" 
                      step="0.01"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                      className="flex-1"
                    />
                    <Select 
                      value={watch("currency")} 
                      onValueChange={val => setValue("currency", val)}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormDescription>
                  Fee charged for minting this license
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
