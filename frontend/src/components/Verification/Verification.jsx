import React, { useRef, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './Verification.css';

function Verification() {
  // Create an array of refs for each input field
  const inputRefs = useRef([]);

  // State to hold validation status for each input
  const [validations, setValidations] = useState(Array(6).fill(null));

  // Function to validate the input with the database
  const validateInput = async (value) => {
    try {
      const response = await fetch(`https://example.com/api/validate?input=${value}`);
      const data = await response.json();
      return data.isValid; // Adjust according to your API's response
    } catch (error) {
      console.error('Error validating input:', error);
      return false;
    }
  };

  // Handle change in input fields
  const handleChange = async (e, index) => {
    const { value } = e.target;

    // Ensure the value remains a single digit
    e.target.value = value.slice(0, 1);

    // If the input has a digit, move focus to the next field
    if (/^\d$/.test(e.target.value)) {
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Validate the input with the database
      const isValid = await validateInput(e.target.value);

      // Update validation status
      setValidations(prev => {
        const newValidations = [...prev];
        newValidations[index] = isValid ? 'valid' : 'invalid';
        return newValidations;
      });
    }
  };

  // Create an array of 6 input fields
  const inputs = Array.from({ length: 6 }, (_, index) => (
    <Col key={index} className="p-1 col-1">
      <input
        type="text"
        maxLength="1"
        ref={el => (inputRefs.current[index] = el)}
        onChange={(e) => handleChange(e, index)}
        className={`verification-input ${validations[index]}`}
      />
    </Col>
  ));

  return (
    <Container className="p-0 m-0 g-0">
      <Row className="p-0 m-0 g-0 d-flex align-items-center justify-content-center">
        {inputs}
      </Row>
    </Container>
  );
}

export default Verification;
