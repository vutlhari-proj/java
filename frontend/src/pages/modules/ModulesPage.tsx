import { Loading, Navbar, Table } from "@/components";
import type { ModuleProp, TableData } from "@/types";
import { tableConfigs } from "@/config/tableConfigs";
import { useCachedData } from "@/hooks/useCachedData";

export function ModulesPage() {
  const { 
    data: modules, 
    isLoading, 
    error, 
    hasData, 
    refetch 
  } = useCachedData<ModuleProp>({
    cacheKey: tableConfigs.modules.cacheKey,
    apiEndpoint: tableConfigs.modules.apiEndpoint,
    cacheDuration: 5 * 60 * 1000 // 5 minutes
  });

  if (error) {
    return (
      <>
        <title>Modules</title>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-danger d-flex flex-column align-items-center">
            <p>Error loading modules: {error}</p>
            <button 
              className="btn btn-outline-danger btn-sm mt-2" 
              onClick={() => refetch()}
            >
              Try Again
            </button>
          </div>
        </div>
      </>
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
          <Loading />
        ) : hasData() ? (
          <Table
            data={modules as unknown as TableData[]}
            columns={tableConfigs.modules.columns}
            entityName={tableConfigs.modules.entityName}
            idKey={tableConfigs.modules.idKey}
          />
        ) : (
          <div className="alert alert-info">
            No modules available at the moment.
          </div>
        )}
      </div>
    </>
  );
}