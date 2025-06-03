
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavButtonsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSubmitting?: boolean;
}

export const NavButtons = ({ activeTab, setActiveTab, isSubmitting = false }: NavButtonsProps) => {
  const goToPrevious = () => {
    setActiveTab(activeTab === "basic" ? "basic" : 
      activeTab === "rights" ? "basic" : 
      activeTab === "derivatives" ? "rights" : 
      "derivatives");
  };
  
  const goToNext = () => {
    setActiveTab(
      activeTab === "basic" ? "rights" : 
      activeTab === "rights" ? "derivatives" : 
      "legal"
    );
  };

  return (
    <div className="flex justify-between items-center pt-6 border-t">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button 
          type="button" 
          variant="outline" 
          onClick={goToPrevious}
          disabled={activeTab === "basic"}
          className="flex items-center gap-2 transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>
      </motion.div>
      
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {activeTab !== "legal" ? (
          <Button 
            type="button" 
            onClick={goToNext}
            className="flex items-center gap-2 transition-all"
          >
            Next
            <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex items-center gap-2 transition-all"
          >
            {isSubmitting ? "Creating..." : "Create License"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        )}
      </motion.div>
    </div>
  );
};
