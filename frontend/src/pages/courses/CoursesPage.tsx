import { Navbar, Table } from "@/components";
import type { ShortCourseProp } from "@/types/course";
import type { TableData } from "@/types";
import { useCachedData } from "@/hooks/useCachedData";
import { tableConfigs } from "@/config/tableConfigs";

export function CoursesPage() {
  const { data: courses, isLoading, error } = useCachedData<ShortCourseProp>({
    cacheKey: tableConfigs.courses.cacheKey,
    apiEndpoint: tableConfigs.courses.apiEndpoint,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  if (error) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="alert alert-danger">Error loading courses: {error}</div>
      </div>
    );
  }

  return (
    <>
      <title>Courses</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>Courses</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Table 
            data={courses as unknown as TableData[]}
            columns={tableConfigs.courses.columns}
            entityName={tableConfigs.courses.entityName}
            idKey={tableConfigs.courses.idKey}
          />
        )}
      </div>
    </>
  );
}