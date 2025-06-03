
import { FormField, FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Control } from "react-hook-form";

interface OptionsSectionProps {
  control: Control<any>;
}

export const OptionsSection = ({ control }: OptionsSectionProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <FormField
          control={control}
          name="robotTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">
                Allow AI/ML models to use this IP with proper attribution
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <FormField
          control={control}
          name="registerOnChain"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Switch 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className="cursor-pointer">
                Register IP On Chain
              </FormLabel>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
