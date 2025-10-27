import { PaginatedTablePage } from "@/components";
import { tableConfigs } from "@/config/tableConfigs";

export function ModulesPage() {
  return (
    <PaginatedTablePage
      title="Modules"
      {...tableConfigs.modules}
    />
  );
}