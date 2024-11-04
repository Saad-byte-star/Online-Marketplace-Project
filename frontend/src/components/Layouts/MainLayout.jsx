import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../Shared/NavBar";
import Footer from "../Shared/Footer";
import { Container } from "react-bootstrap";
import Header from "../Shared/Header";
function MainLayout() {
  return (
    <>
      <Container fluid className="p-0 gap-0" style={{backgroundColor:"#EFFDF5"}}>
        <Container className="p-0 gap-0">
          <Header/>
          <NavBar />
          <Outlet />
          <Footer />
        </Container>
      </Container>
    </>
  );
}

export default MainLayout;
