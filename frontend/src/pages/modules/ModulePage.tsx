import { useSessionData } from "@/hooks";
import type { ModuleExtendedProp } from "@/types/module";
import { useSearchParams } from "react-router-dom";
import { courseModuleConfigs } from "@/config";
import { Navbar } from "@/components";
export function ModulePage() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const { 
    data: moduleData, 
    isLoading, 
    error, 
    hasData,
    refetch 
  } = useSessionData<ModuleExtendedProp>({
    cacheKey: code ? courseModuleConfigs(code).module.cacheKey : "module-fallback",
    apiEndpoint: code ? courseModuleConfigs(code).module.apiEndpoint : "",
    isArray: false, // Single module object, not array
    defaultValue: undefined
  });

  // Validation for required code parameter after hooks
  if (!code) {
    return (
      <>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-warning">Module code is required</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="spacer" style={{ height: '80px' }}></div>
        <div className="d-flex justify-content-center align-items-center min-vh-100">
          <div className="alert alert-danger d-flex flex-column align-items-center">
            <p>Error loading module: {error}</p>
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

  const module = moduleData as ModuleExtendedProp | null;

  return (
    <>
      <title>{module?.code || 'Module'}</title>
      <Navbar />
      <div className="spacer" style={{ height: '80px' }}></div>
      <div className="container">
        <h1>Module Information</h1>
        
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : hasData && module ? (
          <div className="row">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header">
                  <h2 className="mb-0">{module.moduleName}</h2>
                  <small className="text-muted">Code: {module.code}</small>
                </div>
                <div className="card-body">
                  <h4>Associated Courses</h4>
                  {module.courses && Array.isArray(module.courses) && module.courses.length > 0 ? (
                    <div className="list-group">
                      {module.courses.map((course) => (
                        <div key={course.code} className="list-group-item">
                          <h6 className="mb-1">{course.courseName}</h6>
                          <small>Code: {course.code}</small>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="alert alert-info">
                      No courses associated with this module.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning">
            No module data available for code: {code}
          </div>
        )}
      </div>
    </>
  );
}