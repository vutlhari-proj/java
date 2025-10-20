import { Offcanvas, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

interface OffcanvasProp {
  id: string;
  title: string;
}

export function UserOffcanvas({
  id,
  title
}: OffcanvasProp) {
  return (
     <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`${id}-label`}>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link className="offCanvasItem" as={Link} to={"/home"}>Home</Nav.Link>
          <Nav.Link className="offCanvasItem" as={Link} to={"/link"}>Link</Nav.Link>

          <NavDropdown title="View" id={`${id}-dropdown`}>
            <NavDropdown.Item as={Link} to={"/courses"}>Courses</NavDropdown.Item>
            <NavDropdown.Item as={Link} to={"/modules"}>Modules</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Offcanvas.Body>
    </>
  );
}
