import { useState, KeyboardEvent } from "react";
import { FormLabel, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, X } from "lucide-react";
import { Control, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";

interface TagsSectionProps {
  control: Control<any>;
  currentTags: string[];
  setCurrentTags: (tags: string[]) => void;
}

export const TagsSection = ({ control, currentTags, setCurrentTags }: TagsSectionProps) => {
  const [tagInput, setTagInput] = useState("");
  
  const addTag = () => {
    if (tagInput && !currentTags.includes(tagInput)) {
      setCurrentTags([...currentTags, tagInput]);
      setTagInput("");
    }
  };
  
  const removeTag = (tag: string) => {
    setCurrentTags(currentTags.filter(t => t !== tag));
  };
  
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === ',' || e.key === ' ') {
      if (tagInput.trim()) {
        e.preventDefault();
        addTag();
      }
    }
  };

  return (
    <div className="space-y-2">
      <FormLabel htmlFor="tags">Tags</FormLabel>
      <div className="flex flex-wrap gap-2 mb-2 min-h-[36px]">
        <AnimatePresence>
          {currentTags.map(tag => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Badge 
                variant="secondary"
                className="flex items-center gap-1 px-3 py-1.5"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)}
                  className="ml-1 h-4 w-4 rounded-full hover:bg-muted flex items-center justify-center"
                >
                  <X size={12} />
                </button>
              </Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="flex gap-2">
        <div className="flex relative flex-1">
          <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            id="tags"
            placeholder="Add tags (e.g. fantasy, sci-fi)" 
            className="pl-9"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <Button 
          type="button" 
          variant="outline" 
          onClick={addTag}
          disabled={!tagInput.trim()}
        >
          Add
        </Button>
      </div>
      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            id="tags"
            value={currentTags.join(", ")}
            onChange={(e) => setCurrentTags(e.target.value.split(",").map(tag => tag.trim()))}
            className="hidden"
          />
        )}
      />
      <p className="text-xs text-muted-foreground mt-1">
        Press Enter, comma, or space to add a tag
      </p>
    </div>
  );
};
