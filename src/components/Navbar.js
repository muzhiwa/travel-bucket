import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Container,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarToggler && navbarCollapse.classList.contains("show")) {
      navbarToggler.click();
    }
  };

  return (
    <BootstrapNavbar
      expand="lg"
      className="navbar-custom"
      fixed="top"
      style={{
        background:
          "linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "1rem 0",
      }}
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center"
        >
          <i
            className="fas fa-map-marked-alt me-2"
            style={{ fontSize: "2rem" }}
          ></i>
          <span style={{ fontWeight: "700", fontSize: "1.8rem" }}>
            Travel Bucket List
          </span>
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ gap: "0.2rem" }}>
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={handleNavClick}
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "8px",
                margin: "0 5px",
                transition: "var(--transition)",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add"
              className={location.pathname === "/add" ? "active" : ""}
              onClick={handleNavClick}
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "8px",
                margin: "0 5px",
                transition: "var(--transition)",
              }}
            >
              Add Destination
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/photos"
              className={location.pathname === "/photos" ? "active" : ""}
              onClick={handleNavClick}
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "8px",
                margin: "0 5px",
                transition: "var(--transition)",
              }}
            >
              Search Photos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/ai"
              className={location.pathname === "/ai" ? "active" : ""}
              onClick={handleNavClick}
              style={{
                color: "rgba(255, 255, 255, 0.85)",
                fontWeight: "500",
                padding: "8px 16px",
                borderRadius: "8px",
                margin: "0 5px",
                transition: "var(--transition)",
              }}
            >
              AI Assistance
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      <style>{`
        .navbar-custom .nav-link.active,
        .navbar-custom .nav-link:hover {
          color: white !important;
          background-color: rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;
