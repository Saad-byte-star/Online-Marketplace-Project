import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Alert, Image } from "react-bootstrap";

function AdvertisementDetail() {
  let { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  id = id.substring(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); 
        const response = await fetch(`http://localhost:5000/api/v1/advertisements/${id}`);
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
  }, [id]);

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Alert variant="danger">
          Error: {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col className="d-flex align-items-center justify-content-center fw-bold">
        <h5>{product.Status.Name}</h5>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <Card className="shadow-sm">
            <Row className="g-0">
              <Col md={6}>
                <Image src={product.Image} fluid style={{ height: "100%", objectFit: "cover" }} />
              </Col>
              <Col md={6} className="d-flex flex-column justify-content-center p-4">
                <h3>{product.Name}</h3>
                <p>{product.Description}</p>
                <p className="fw-bold">Rs: {product.Price}</p>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AdvertisementDetail;

