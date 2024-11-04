import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Modal,
} from "react-bootstrap";
import { useAuth } from "../store/auth";
import { getStatus, getType, getCategories, getCityArea } from "../ApiData";

function Post(props) {
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cityareas, setCityAreas] = useState([]);
  const { addAdvertisement, user } = useAuth();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    Name: "",
    Price: "",
    Description: "",
    Status: "0",
    Type: "0",
    Category: "0",
    CityArea: "0",
    Image: null,
  });



  // Update formData state on input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle image selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        Image: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        Image: null,
      }));
      setImagePreview(null);
    }
  };

  // Function to add days to a date
  function addDays(date, days) {
    let newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }

  // Current date
  let currentDate = new Date();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.Name ||
      !formData.Price ||
      !formData.Description ||
      formData.Status === "0" ||
      formData.Type === "0" ||
      formData.Category === "0" ||
      formData.CityArea === "0" ||
      !formData.Image
    ) {
      alert("Please fill in all fields and select options.");
      return;
    }

 

    const data = new FormData();
    data.append("Name", formData.Name);
    data.append("Price", formData.Price);
    data.append("Description", formData.Description);
    data.append("Status", formData.Status);
    data.append("Type", formData.Type);
    data.append("Category", formData.Category);
    data.append("CityArea", formData.CityArea);
    data.append("Image", formData.Image);
    data.append("PostedBy", user._id);
    data.append("StartsOn", currentDate.toISOString()); 
    data.append("EndsOn", addDays(currentDate, 7).toISOString());

  
 

    try {
      const result = await addAdvertisement(data);
      console.log("Posted successfully:", result);

  
      setFormData({
        Name: "",
        Price: "",
        Description: "",
        Status: "0",
        Type: "0",
        Category: "0",
        CityArea: "0",
        Image: null,
      });
      setImagePreview(null);

      props.onClose();
    } catch (error) {
      console.error("Error posting advertisement:", error);
    }
  };


  useEffect(() => {
    getStatus().then((val) => setStatuses(val));
    getType().then((val) => setTypes(val));
    getCategories().then((val) => setCategories(val));
    getCityArea().then((val) => setCityAreas(val));
  }, []);

  return (
    <>
      <Modal show={props.visible} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <FontAwesomeIcon icon="fas fa-sign-in" /> Post Advertisement
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon="far fa-note-sticky" />{" "}
              </InputGroup.Text>
              <FormControl
                placeholder="Name"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FontAwesomeIcon icon="far fa-note-sticky" />{" "}
              </InputGroup.Text>
              <FormControl
                type="number"
                placeholder="Price"
                name="Price"
                value={formData.Price}
                onChange={handleInputChange}
              />
            </InputGroup>

            <Form.Control
              className="mb-3"
              as="textarea"
              rows={5}
              name="Description"
              placeholder="Description"
              value={formData.Description}
              onChange={handleInputChange}
              style={{ height: "100px" }}
            />

            <Form.Select
              className="mb-3"
              name="Status"
              value={formData.Status}
              onChange={handleInputChange}
            >
              <option value="0">Select Status</option>
              {statuses.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              className="mb-3"
              name="Type"
              value={formData.Type}
              onChange={handleInputChange}
            >
              <option value="0">Select Type</option>
              {types.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              className="mb-3"
              name="Category"
              value={formData.Category}
              onChange={handleInputChange}
            >
              <option value="0">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>

            <Form.Select
              className="mb-3"
              name="CityArea"
              value={formData.CityArea}
              onChange={handleInputChange}
            >
              <option value="0">Select CityArea</option>
              {cityareas.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.Name}
                </option>
              ))}
            </Form.Select>

            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="Image"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{ marginTop: "10px", maxWidth: "100%" }}
                />
              )}
            </Form.Group>

            <Row className="my-3">
              <Col className="text-end">
                <Button
                  onClick={props.onClose}
                  type="submit"
                  variant="primary"
                  style={{ minWidth: "100px" }}
                >
                  <FontAwesomeIcon icon="fas fa-sign-in" /> Add
                </Button>{" "}
                <Button
                  onClick={props.onClose}
                  variant="secondary"
                  style={{ minWidth: "100px" }}
                >
                  <FontAwesomeIcon icon="fas fa-refresh" /> Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Post;
