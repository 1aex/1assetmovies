
import { GroupsList } from "../groups/GroupsList";

export const IPGroups = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">IP Asset Groups</h2>
      <p className="text-muted-foreground">
        Organize your IP assets into collaborative projects
      </p>
      <GroupsList />
    </div>
  );
};
