import React, { useState, useEffect } from "react";
import { getCategories, getCityArea } from "../ApiData";
import {
  Button,
  Form,
  Row,
  Col,
  Container,
  Spinner,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
function Search() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState({
    Keyword: "",
    Category: "0",
    Location: "0",
  });
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categories, location] = await Promise.all([
          getCategories(),
          getCityArea(),
        ]);
        setCategories(categories);
        setLocation(location);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingCategories(false);
        setLoadingLocations(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search.Keyword.trim())
        queryParams.append("keyword", search.Keyword.trim());
      if (search.Category !== "0")
        queryParams.append("category", search.Category);
      if (search.Location !== "0")
        queryParams.append("location", search.Location);

      const response = await fetch(
        `http://localhost:5000/api/v1/advertisements/search?${queryParams}`
      );
      if (!response.ok) throw new Error("Failed to fetch search results");

      const data = await response.json();
      setSearchResults(data);
      setOpen(true);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form className="p-4" style={{ backgroundColor: "#00B074" }}>
        <Row className="align-items-center">
          <Col>
            <Form.Control
              value={search.Keyword}
              type="text"
              name="Keyword"
              onChange={handleInputChange}
              placeholder="Keyword"
              aria-label="Search keyword"
            />
          </Col>
          <Col>
            {loadingCategories ? (
              <Spinner animation="border" />
            ) : (
              <Form.Select
                name="Category"
                style={{ height: "40px" }}
                value={search.Category}
                onChange={handleInputChange}
                aria-label="Select category"
              >
                <option value="0">Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={String(c._id)}>
                    {c.Name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>
          <Col>
            {loadingLocations ? (
              <Spinner animation="border" />
            ) : (
              <Form.Select
                name="Location"
                style={{ height: "40px" }}
                value={search.Location}
                onChange={handleInputChange}
                aria-label="Select location"
              >
                <option value="0">Location</option>
                {location.map((c) => (
                  <option key={c._id} value={String(c._id)}>
                    {c.Name}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>
          <Col className="col-2">
            <Button
              aria-controls="search-results-collapse"
              aria-expanded={open}
              className="w-100 bg-dark text-white"
              onClick={handleSearch}
            >Search</Button>
          </Col>
        </Row>
      </Form>

      

      {open && (
        <div className="mt-4">
          <h4>Search Results:</h4>
          <Container className="g-0 ">
            <Row className="g-0 ">
              {loading ? (
                <Col className="col-12 d-flex align-items-center justify-content-center">
                  <Spinner animation="border" />
                </Col>
              ) : (
                searchResults.map((item) => (
                  <Col
                    className="g-1 col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12 my-2 d-flex align-items-center justify-content-center "
                    key={item._id}
                  >
                    <Card style={{ width: "100%" }}>
                      <Card.Img
                        style={{ width: "100%", height: "12rem", objectFit:"cover" }}
                        variant="top"
                        src={item.Image}
                      />
                      <Card.Body>
                        <Card.Title>{item.Name}</Card.Title>
                        <Card.Text></Card.Text>
                        <Link
                          to={`/advertisement/:${item._id}`}
                          className=" nav-link d-inline-block px-3 py-1 rounded-1 text-white"
                          style={{ backgroundColor: "#00B074" }}
                        >
                          View
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default Search;
