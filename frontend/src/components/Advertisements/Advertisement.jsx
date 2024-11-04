import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';


function Advertisement() {
  let { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  id = id.substring(1);
  // Assuming id comes with a leading character to remove

  useEffect(() => {
    const fetchProduct = async () => {
      console.log(id);
      try {
        setLoading(true); // Ensure loading state is set when starting a new fetch
        const response = await fetch(
          `http://localhost:5000/api/v1/advertisements?category=${id}`,
          {
            method: "GET",
          }
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch product details: ${response.statusText}`);
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Depend on `id` to re-fetch when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(product);

  return (
    <Container className="g-0">
      <Row className="g-1">
        {product && product.map((item) => (
          <Col className="col-xl-6 col-lg-6 col-md-6 col-12 my-2 d-flex align-items-center justify-content-center" key={item._id}>
          <Card className="my-2" style={{ width: "100%" }}>
                    <Card.Img  style={{ width: "100%", height:"18rem", objectFit:"cover" }} variant="top" src={item.Image} />
                    <Card.Body>
                      <Card.Title>{item.Name}</Card.Title>
                      <Card.Text>
                      </Card.Text>
                      <Link to={`/advertisement/:${item._id}`} className=" nav-link d-inline-block px-3 py-1 rounded-1 text-white" style={{backgroundColor:"#00B074"}}>View</Link>
                    </Card.Body>
                  </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Advertisement;



