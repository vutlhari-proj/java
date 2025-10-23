import type { ModuleExtendedProp } from "@/types";
import { Card, ListGroup } from "react-bootstrap";

export function ModuleCard({ module }: { module: ModuleExtendedProp }) {
  // Format module type: "FIRST_SEMESTER" -> "First Semester"
  const formatModuleType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <div className="w-100 d-flex justify-content-center">
      <Card className="w-100" style={{ maxWidth: '1200px' }}>
        <div className="d-flex flex-column flex-lg-row">
          {/* Card Header - Module Information */}
          <Card.Header className="flex-fill">
            <h2 className="mb-3">{module.moduleName}</h2>
            <div className="d-flex flex-column gap-2">
              <div><strong>Code:</strong> {module.code}</div>
              <div><strong>Type:</strong> {formatModuleType(module.type)}</div>
              <div><strong>NQF Level:</strong> {module.nqf_level}</div>
              <div><strong>Credits:</strong> {module.credits}</div>
              <div><strong>Prerequisites:</strong> {
                (module.prerequisites && module.prerequisites.length > 0) 
                  ? module.prerequisites.map(pr => pr.code).join(", ") 
                  : 'None'
              }</div>
            </div>
          </Card.Header>

          {/* Card Body - Associated Courses */}
          <Card.Body className="flex-fill border-start">
            <h4 className="mb-3">Associated Courses</h4>
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
              <div className="alert alert-info mb-0">
                No courses associated with this module.
              </div>
            )}
          </Card.Body>
        </div>
      </Card>
    </div>
  );
}