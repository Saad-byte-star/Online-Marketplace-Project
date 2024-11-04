import Container from "react-bootstrap/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import { useAuth } from "../store/auth.jsx";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Login from "../Login/Login.jsx";
import { getCategories } from "../ApiData";
import { useState, useEffect } from "react";
import Post from "../Post/Post.jsx";

function NavBar() {
  const { isLoggedIn } = useAuth()
  // For model
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(() => false);
  }

  function handleShow() {
    setShow(() => true);
  }

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  return (
    <Navbar expand="lg" className="p-0" style={{ backgroundColor: "#FFFFFF" }}>
      <Container className="p-0">
        <Navbar.Brand
          className=" fs-1 fw-bold "
          href="/"
          style={{ color: "#00B074", marginLeft: "50px" }}
        >
          PakClassified
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 d-flex align-items-center justify-content-between"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Link className=" fw-medium nav-link" to="/">
              Home
            </Link>
            <Link className=" fw-medium nav-link" to="/about">
              About
            </Link>
            <NavDropdown
              className=" fw-medium"
              title="Categories"
              id="navbarScrollingDropdown"
            >
              {categories &&
                categories.map((val, index) => {
                  return (
                    <Link
                      key={index}
                      className=" dropdown-item nav-link"
                      to={`/category/:${val._id}`}
                    >
                      {val.Name}
                    </Link>
                  );
                })}
            </NavDropdown>

            <Link className=" fw-medium nav-link" href="#action2">
              Contact
            </Link>
            {
              isLoggedIn ? (<Post
                visible={show}
                onClose={handleClose}
                onShow={handleShow} />) : (
                <Login
                  visible={show}
                  onClose={handleClose}
                  onShow={handleShow}
                />
              )
            }
            <Button
              className=" border-0 fw-medium p-3 fs-5"
              style={{
                backgroundColor: "#00B074",
                color: "#fff",
                height: "75px",
              }}
              onClick={handleShow}
            >
              Post Advertisement
              <FontAwesomeIcon
                style={{ marginLeft: "13px" }}
                icon="fa-solid fa-arrow-right"
              />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
