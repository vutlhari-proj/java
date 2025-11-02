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
      expand={false} // always show the offcanvas toggle button
      fixed="top"
      bg={backgroundColor}
      data-bs-theme={backgroundColor}
      className="navbar mb-3 py-2"
    >
      <Container fluid>
        <NavbarBs.Text
          className="ms-3 fw-semibold text-nowrap"
          style={{cursor: "pointer"}}
          onClick={() => { navigate("/home") }}>
          Student Marks App
        </NavbarBs.Text>

        <div className="d-flex align-items-center ms-auto me-3 gap-2">
          <span className="fw-medium text-nowrap">{user ? `${user.name} ${user.surname}` : "Guest"}</span>
          <NavbarBs.Toggle aria-controls="offcanvasUser" className="ms-1" />
        </div>

        <NavbarBs.Offcanvas
          id="offcanvasUser"
          aria-labelledby="offcanvasUserLabel"
          placement="end"
          data-bs-theme={backgroundColor}>
          <UserOffcanvas
            id="offcanvasUser"
            title="Menu" />
        </NavbarBs.Offcanvas>
      </Container>
    </NavbarBs>
  );
}
