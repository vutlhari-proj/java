import { Container, Navbar as NavbarBs } from "react-bootstrap";
import "./navbar.css";
import { useTheme } from "@/context";
import { UserOffcanvas } from "./OffCanvas";

export function Navbar() {
  const { darkTheme } = useTheme();
  const backgroundColor = darkTheme ? "dark" : "light";
  return (
    <NavbarBs
      expand="lg"
      fixed="top"
      bg={backgroundColor}
      data-bs-theme={backgroundColor}
      className="navbar mb-3"
    >
      <Container fluid>
        <NavbarBs.Text className="ms-3 fw-semibold">
          Student Marks App
        </NavbarBs.Text>

        <div className="d-flex align-items-center ms-auto me-3">
          <span className="me-3 fw-medium">Vutlhari Baloyi</span>
          <NavbarBs.Toggle aria-controls="offcanvasUser" />
        </div>

        <UserOffcanvas
          id="offcanvasUser"
          title="Students Marks App"
          placement="end"
          backgroundColor={backgroundColor}
        />
      </Container>
    </NavbarBs>
  );
}
