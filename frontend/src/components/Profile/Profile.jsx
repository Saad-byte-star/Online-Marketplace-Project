import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Card } from "react-bootstrap";
import { useAuth } from "../store/auth";
import { getAdvertisements } from "../ApiData";

function Profile() {
  const { user } = useAuth();
  const [ads, setAds] = useState([]);

  useEffect(() => {
    if (user && user._id) {
      getAdvertisements().then((data) => {
        const filteredAds = data.filter(item => item.PostedBy._id == user._id);
        console.log(filteredAds);
        
        setAds(filteredAds);
      });

      
    }
  }, [user]);

  console.log(ads);

  return (
    <>
      <Container className="p-0 g-0">
        <Row className="p-0 g-0">
          <Col className="p-0 g-0" style={{ maxHeight: "30rem" }}>
            {user && user.Image ? (
              <Image
                style={{ objectFit: "contain" }}
                className="w-100 h-100"
                src={user.Image}
                fluid
              />
            ) : (
              ""
            )}
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="border border-1 border-black">
          {ads.map((item) => (
            <Col className="col-12 my-2" key={item._id}>
              <Card className="shadow-sm">
                <Row className="g-0">
                  <Col>
                    <Image
                      src={item.Image}
                      fluid
                      style={{ width: "100%", height: "15rem" }}
                    />
                  </Col>
                  <Col className="d-flex flex-column justify-content-center p-4">
                    <h3>{item.Name}</h3>
                    <p>{item.Description}</p>
                    <p className="fw-bold">Rs: {item.Price}</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Profile;

