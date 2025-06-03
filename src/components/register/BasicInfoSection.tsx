
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Globe, User } from "lucide-react";
import { Control } from "react-hook-form";

interface BasicInfoSectionProps {
  control: Control<any>;
}

export const BasicInfoSection = ({ control }: BasicInfoSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title of your IP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="ipType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IP type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="script">Script</SelectItem>
                  <SelectItem value="character">Character</SelectItem>
                  <SelectItem value="scene">Scene</SelectItem>
                  <SelectItem value="film">Film</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="visual">Visual Art</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Describe your IP in detail" 
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="creators"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creator Name</FormLabel>
              <FormControl>
                <div className="flex relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Your name or pseudonym" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wallet Address</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={control}
        name="external_url"
        render={({ field }) => (
          <FormItem>
            <FormLabel>External URL (Optional)</FormLabel>
            <FormControl>
              <div className="flex relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  className="pl-9" 
                  placeholder="https://yourwebsite.com" 
                  {...field} 
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
