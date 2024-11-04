import React, { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";

import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import { getCategories } from "../ApiData";
function Category(props) {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);


  return (
    <>
     {
      categories && categories.length > 0?(
        <Container className="g-0" style={{ backgroundColor: "#FEFEFE" }}>
        <Row className="">
          <Col className="my-5 d-flex align-items-center justify-content-center">
            {props && props.Title?(
              <h1>{props.Title}</h1>
            ):(
              <h1>Explore By Categories</h1>
            )}
          </Col>
        </Row>
        <Row>
          {categories &&
            categories.map((item) => {
              return (
                <Col className="col-xl-3 col-lg-3 col-md-4 col-sm-6 my-2 d-flex align-items-center justify-content-center" key={item._id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img style={{ width: "100%", height:"12rem" }} variant="top" src={item.Image} />
                    <Card.Body>
                      <Card.Title>{item.Name}</Card.Title>
                      <Card.Text>
                        {item.adCount}
                      </Card.Text>
                      <Link to={`/category/:${item._id}`} className=" nav-link d-inline-block px-3 py-1 rounded-1 text-white" style={{backgroundColor:"#00B074"}}>View</Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Container>
      ):(
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      )
     }
    </>
  );
}

export default Category;
