
import { useState } from "react";
import { Group } from "@/types/GroupTypes";
import { GroupCard } from "./GroupCard";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react"; // Added Users import here

// Mock data - would be replaced with real API calls
const mockGroups: Group[] = [
  {
    id: "group1",
    title: "Moonlight Saga",
    creator: "Alex Producer",
    ipAssetIds: ["asset1", "asset2", "asset3"],
    groupRewardShare: 5.5,
    createdAt: "2023-11-15T10:30:00Z",
  },
  {
    id: "group2",
    title: "Urban Dreams",
    creator: "Jamie Director",
    ipAssetIds: ["asset4", "asset5"],
    groupRewardShare: 3.2,
    createdAt: "2023-10-20T09:15:00Z",
  },
];

export const GroupsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups] = useState<Group[]>(mockGroups);
  
  const filteredGroups = groups.filter(group => 
    group.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search groups..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <Users className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Groups Found</h3>
          <p className="text-muted-foreground">
            {searchTerm ? "Try a different search term" : "Create your first group to organize IP assets"}
          </p>
        </div>
      )}
    </div>
  );
};
