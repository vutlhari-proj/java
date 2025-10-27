import { PaginatedTablePage } from "@/components";
import { tableConfigs } from "@/config/tableConfigs";

export function CoursesPage() {
  return (
    <PaginatedTablePage
      title="Courses"
      {...tableConfigs.courses}
    />
  );
}