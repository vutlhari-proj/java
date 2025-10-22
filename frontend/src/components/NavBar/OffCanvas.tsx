import { AuthContext } from "@/context";
import { useContext } from "react";
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
  const { logout } = useContext(AuthContext);
  return (
    <>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`${id}-label`}>{title}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <Nav className="justify-content-start flex-grow-1 pe-3">
          <Nav.Link className="offCanvasItem" as={Link} to={"/home"}>Home</Nav.Link>

          <NavDropdown title="View" id={`${id}-dropdown`} className="dropdown">
            <NavDropdown.Item className="dropdown-item" as={Link} to={"/courses"}>Courses</NavDropdown.Item>
            <NavDropdown.Item className="dropdown-item" as={Link} to={"/modules"}>Modules</NavDropdown.Item>
          </NavDropdown>
        </Nav>

        {/* Settings link at the bottom */}
        <Nav className="mt-auto pt-3 border-top">
          <Nav.Link
            className="offCanvasItem d-flex align-items-center"
            as={Link}
            to={"/settings"}
          >
            Edit profile
          </Nav.Link>

          <Nav.Link 
            className="offCanvasItem d-flex align-items-center mt-2"
            onClick={() => {logout()}}>
            Logout
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </>
  );
}
