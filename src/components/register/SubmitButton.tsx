
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface SubmitButtonProps {
  isSubmitting: boolean;
}

export const SubmitButton = ({ isSubmitting }: SubmitButtonProps) => {
  return (
    <div className="pt-4">
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-ippurple to-ipblue hover:opacity-90 transition-opacity"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register IP"}
          {!isSubmitting && <ArrowRight className="ml-2 h-5 w-5" />}
        </Button>
      </motion.div>
    </div>
  );
};
