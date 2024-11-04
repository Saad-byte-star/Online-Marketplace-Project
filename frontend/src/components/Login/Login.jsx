import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,

  Col,
  Form,
  InputGroup,
  FormControl,
  Button,
  Modal

} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"
import { useAuth } from "../store/auth";

function Login(props) {
    const {storeTokenInLocalStorage} = useAuth()
    const navigate = useNavigate()

    const [loginData, setLoginData ] = useState({
        Email:"",
        Password:""
    })


    async function handleInputChange(e) {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    }

   async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:5000/api/v1/users/login`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(loginData),
            })
            if (response.status === 200){
                const res_data = await response.json();
                console.log(res_data);
                await storeTokenInLocalStorage(res_data.token);

                setLoginData({
                    Email: "",
                    Password: "",
                  });
            }
            props.onClose()
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
          <Modal show={props.visible} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title> 
              <FontAwesomeIcon icon="fas fa-sign-in" /> Login
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon="far fa-note-sticky" />{" "}
                </InputGroup.Text>
                <FormControl
                  placeholder="Email"
                  name="Email"
                  value={loginData.Email}
                  onChange={handleInputChange}
                />
              </InputGroup>
             
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  <FontAwesomeIcon icon="far fa-note-sticky" />{" "}
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  name="Password"
                  value={loginData.Password}
                  onChange={handleInputChange}
                />
              </InputGroup>
              <Form.Text style={{color:'red'}} >
              </Form.Text>
            
              <Row className="mb-3">
                <Col className="text-end">
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ minWidth: "100px" }}
                  >
                    <FontAwesomeIcon icon="fas fa-sign-in" /> Login{" "}
                  </Button>{" "}
                  &nbsp;
                  <Button
                   onClick={props.onClose}
                    variant="secondary"
                    style={{ minWidth: "100px" }}
                  >
                    <FontAwesomeIcon icon="fas fa-refresh" /> Cancel{" "}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                    <Link to="/" className="nav-link text-primary ">
                      Sign Up
                    </Link>
                </Col>
              </Row>
            </Form>
        </Modal.Body>
       
      </Modal>

    </>
  )
}

export default Login
