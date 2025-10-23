import type { ModuleExtendedProp } from "@/types";
import { Row, Col, Card, ListGroup } from "react-bootstrap";

export function ModuleCard({ module }: { module: ModuleExtendedProp }) {
  // Format module type: "FIRST_SEMESTER" -> "First Semester"
  const formatModuleType = (type: string) => {
    return type
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Row className="row w-100 justify-content-center rounded-4 m-0">
      <Col className="w-100 p-0">
        <Card className="card">
          <Card.Header>
            <h2 className="mb-0">{module.moduleName}</h2>
            <div className="d-flex gap-3">
              <small className="small">Code: {module.code}</small>
              <small className="small">Type: {formatModuleType(module.type)}</small>
              <small className="small">NQF Level: {module.nqf_level}</small>
              <small className="small">Credits: {module.credits}</small>
              <small className="small">Prerequisites: {
                (module.prerequisites) ? module.prerequisites.join(", ") : 'none'}</small>
            </div>
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
  );
}