import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown } from "react-bootstrap";
import Login from "../Login/Login";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

function Header() {
  const { isLoggedIn, user } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCloseLoginForm = () => setShowLoginForm(false);
  const handleShowLoginForm = () => setShowLoginForm(true);

  const handleToggleDropdown = () => setShowDropdown(!showDropdown);
  const handleDropdownClose = () => setShowDropdown(false);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Pak-Classified</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {isLoggedIn && user && user.Image ? (
              <>
                <Dropdown align="end" show={showDropdown} onClose={handleDropdownClose} onClick={handleToggleDropdown}>
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    <img
                      style={{ width: "45px", height: "45px", borderRadius: "50%" }}
                      src={user.Image}
                      alt="User Avatar"
                      onClick={handleToggleDropdown}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/profile">Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/logout">Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <>
                <Login visible={showLoginForm} onClose={handleCloseLoginForm} onShow={handleShowLoginForm} />
                <Button onClick={handleShowLoginForm}>Login</Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

