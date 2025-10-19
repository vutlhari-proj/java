import { Offcanvas, Nav, NavDropdown } from "react-bootstrap";

interface OffcanvasProp {
  id: string;
  title: string;
  placement?: "start" | "end" | "top" | "bottom";
  backgroundColor?: "light" | "dark";
}

export function UserOffcanvas({
  id,
  title,
  placement = "end",
  backgroundColor = "light",
}: OffcanvasProp) {
  return (
    <Offcanvas
      id={id}
      aria-labelledby={`${id}-label`}
      placement={placement}
      bg={backgroundColor}
      data-bs-theme={backgroundColor}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`${id}-label`}>{title}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>

          <NavDropdown title="Dropdown" id={`${id}-dropdown`}>
            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action5">
              Something else here
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
