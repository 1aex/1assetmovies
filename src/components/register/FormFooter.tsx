
import { CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const FormFooter = () => {
  const { toast } = useToast();
  
  const handleTermsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Terms of Service",
      description: "Terms of Service document will be available in Phase II.",
    });
  };

  return (
    <CardFooter className="flex flex-col text-sm text-muted-foreground border-t bg-muted/20 px-6 py-4">
      <p>
        By registering your IP, you confirm that you are the rightful owner of the content
        and agree to the <a href="#" onClick={handleTermsClick} className="text-ippurple hover:underline">Terms of Service</a>.
      </p>
    </CardFooter>
  );
};
