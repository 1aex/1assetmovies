
import { Group } from "@/types/GroupTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

interface GroupCardProps {
  group: Group;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between">
          <span>{group.title}</span>
          <Badge variant="outline">{group.ipAssetIds.length} assets</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>Created by: {group.creator}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Created: {new Date(group.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Reward Share: {group.groupRewardShare}%
          </div>
          <Link 
            to={`/groups/${group.id}`} 
            className="text-primary hover:underline text-sm block mt-4"
          >
            View Details &rarr;
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
