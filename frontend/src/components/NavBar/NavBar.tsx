import { Container, Navbar as NavbarBs } from "react-bootstrap";
import "./navbar.css";
import { AuthContext, useTheme } from "@/context";
import { UserOffcanvas } from "./OffCanvas";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const { darkTheme } = useTheme();
  const backgroundColor = darkTheme ? "dark" : "light";
  const navigate = useNavigate();

  const { user, loading } = useContext(AuthContext);
  console.log("Navbar render, user:", user);

  if (loading) {
    return null;
  }

  return (
    <NavbarBs
      expand="lg"
      fixed="top"
      bg={backgroundColor}
      data-bs-theme={backgroundColor}
      className="navbar mb-3"
    >
      <Container fluid>
        <NavbarBs.Text
          className="ms-3 fw-semibold"
          style={{cursor: "pointer"}}
          onClick={() => { navigate("/home") }}>
          Student Marks App
        </NavbarBs.Text>

        <div className="d-flex align-items-center ms-auto me-3">
          <span className="me-3 fw-medium">{user ? `${user.name} ${user.surname}` : "Guest"}</span>
          <NavbarBs.Toggle aria-controls="offcanvasUser" />
        </div>

        <NavbarBs.Offcanvas
          id="offcanvasUser"
          aria-labelledby="offcanvasUserLabel"
          placement="end"
          data-bs-theme={backgroundColor}>
          <UserOffcanvas
            id="offcanvasUser"
            title="User Menu" />
        </NavbarBs.Offcanvas>
      </Container>
    </NavbarBs>
  );
}
