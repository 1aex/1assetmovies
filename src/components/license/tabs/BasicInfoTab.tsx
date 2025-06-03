
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { Control } from "react-hook-form";

interface BasicInfoTabProps {
  control: Control<any>;
}

export const BasicInfoTab = ({ control }: BasicInfoTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name="flavor"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License Type</FormLabel>
            <FormControl>
              <Input placeholder="Commercial License" {...field} />
            </FormControl>
            <FormDescription>
              The type or name of this license
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="licensee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Licensee</FormLabel>
            <FormControl>
              <Input placeholder="Company or Individual Name" {...field} />
            </FormControl>
            <FormDescription>
              Entity receiving the license
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="expiration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Expiration Date</FormLabel>
            <FormControl>
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                <Input type="date" {...field} />
              </div>
            </FormControl>
            <FormDescription>
              When this license expires
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="licenseUri"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License URI (optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/license" {...field} />
            </FormControl>
            <FormDescription>
              URI to the full license document
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
