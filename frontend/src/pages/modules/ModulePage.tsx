import { useSessionData } from "@/hooks";
import type { ModuleExtendedProp } from "@/types/module";
import { useSearchParams } from "react-router-dom";
import { courseModuleConfigs } from "@/config";
import { Navbar } from "@/components";
import { Card, Col, ListGroup, Row } from "react-bootstrap";
import './modulePage.css';

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
      <div className="container d-flex flex-column justify-content-center align-items-center gap-2 w-100 p-0 rounded-4">
        <h1>Module Information</h1>
        
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : hasData && module ? (
          <Row className="row w-100 justify-content-center rounded-4 m-0">
            <Col className="w-100 p-0">
              <Card className="card">
                <Card.Header>
                  <h2 className="mb-0">{module.moduleName}</h2>
                  <small className="small">Code: {module.code}</small>
                </Card.Header>
                <Card.Body>
                  <h4>Associated Courses</h4>
                  {module.courses && Array.isArray(module.courses) && module.courses.length > 0 ? (
                    <ListGroup className="list-group">
                      {module.courses.map((course) => (
                        <ListGroup.Item key={course.code} className="list-item">
                          <h6 className="mb-1">{course.courseName}</h6>
                          <small>Code: {course.code}</small>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ) : (
                    <div className="alert alert-info">
                      No courses associated with this module.
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <div className="alert alert-warning">
            No module data available for code: {code}
          </div>
        )}
      </div>
    </>
  );
}