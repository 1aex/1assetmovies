
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, GitBranch, GavelIcon } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
      <TabsTrigger 
        value="basic" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("basic")}
        data-state={activeTab === "basic" ? "active" : ""}
      >
        <FileText className="h-4 w-4" />
        <span>Basic Info</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="rights" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("rights")}
        data-state={activeTab === "rights" ? "active" : ""}
      >
        <Briefcase className="h-4 w-4" />
        <span>Usage Rights</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="derivatives" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("derivatives")}
        data-state={activeTab === "derivatives" ? "active" : ""}
      >
        <GitBranch className="h-4 w-4" />
        <span>Derivatives</span>
      </TabsTrigger>
      
      <TabsTrigger 
        value="legal" 
        className="flex items-center gap-2"
        onClick={() => onTabChange("legal")}
        data-state={activeTab === "legal" ? "active" : ""}
      >
        <GavelIcon className="h-4 w-4" />
        <span>Legal & Compliance</span>
      </TabsTrigger>
    </TabsList>
  );
};
