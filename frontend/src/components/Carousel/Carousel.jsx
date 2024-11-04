import React, { useEffect, useState } from "react";
import { Button, Carousel, Image } from "react-bootstrap";
import "./Carousel.css"; // Import the external stylesheet
import { getCarouselImages } from "../ApiData";
import Post from "../Post/Post.jsx";
import Login from "../Login/Login.jsx";
import { useAuth } from "../store/auth.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Carousels() {
  const [carousel, setCarousel] = useState([]);
  const { isLoggedIn } = useAuth();
  // For model
  const [show, setShow] = useState(false);

  function handleClose() {
    setShow(() => false);
  }

  function handleShow() {
    setShow(() => true);
  }

  useEffect(() => {
    getCarouselImages().then((data) => setCarousel(data));
  }, []);

  return (
    <Carousel>
      {carousel &&
        carousel.map((item) => (
          <Carousel.Item key={item._id}>
            <div className="first"></div>
            <div className="second"></div>
            <div className="third"></div>
            <div className="back"></div>
            <Image className="carousel-image" src={item.Image} alt="Cars" />
            <Carousel.Caption className="carousel-caption">
              <h1>{item.Title}</h1>
              <p className="carousel-description">{item.Description}</p>
              {isLoggedIn ? (
                <Post
                  visible={show}
                  onClose={handleClose}
                  onShow={handleShow}
                />
              ) : (
                <Login
                  visible={show}
                  onClose={handleClose}
                  onShow={handleShow}
                />
              )}
              <Button
                className=" border-0 fw-medium p-3 fs-5"
                style={{
                  backgroundColor: "#006A46",
                  color: "#fff",
                }}
                onClick={handleShow}
              >
                Post Advertisement{" "}
                <FontAwesomeIcon
                  style={{ marginLeft: "13px" }}
                  icon="fa-solid fa-arrow-right"
                />
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
}

export default Carousels;
