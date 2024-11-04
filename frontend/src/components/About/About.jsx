import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./About.css";
import Category from "../Category/Category";

function About() {
  return (
    <>
      <Container>
        <Row>
          <Col className="about_img">
          <div className='about_first'></div>
          <div className='about_second'></div>
          <div className='about_third'></div>
            <div className="about_des">
            <h2>PakClassfied</h2>
            <p>We revolutionize the buying & Selling experience
              with a curated selection of top models and unmatched customer
              service. Discover your dream car today and drive into the future
              with us.</p>
            </div>
          </Col>
        </Row>
        <Row>
            <Category Title="Find Your Dream Car"/>
        </Row>
      </Container>
    </>
  );
}

export default About;
