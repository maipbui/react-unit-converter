import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Container } from "react-grid-system";

export default function Navigation() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" fixed="top">
        <Container className="custom-navbar-container">
          <Navbar.Brand href="/">
            <span style={{ marginRight: "8px" }}>
              <img
                src="/logo.png"
                width="27"
                height="27"
                alt="Unit Converter logo"
              />
            </span>
            <span>Unit Converter</span>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}
