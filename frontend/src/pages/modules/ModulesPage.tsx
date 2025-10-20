import { Navbar, Table } from "@/components";
import type { ShortCourseProp, TableData } from "@/types";
import { tableConfigs } from "@/config/tableConfigs";
import { useCachedData } from "@/hooks/useCachedData";

export function ModulesPage() {
  const { data: modules, isLoading, error } = useCachedData<ShortCourseProp>({
    cacheKey: tableConfigs.modules.cacheKey,
    apiEndpoint: tableConfigs.modules.apiEndpoint,
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
      <title>Modules</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="d-flex flex-column align-items-center gap-4">
        <h1>Modules</h1>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <Table
            data={modules as unknown as TableData[]}
            columns={tableConfigs.modules.columns}
            entityName={tableConfigs.modules.entityName}
            idKey={tableConfigs.modules.entityName}
          />
        )

        }

      </div>
    </>
  );
}