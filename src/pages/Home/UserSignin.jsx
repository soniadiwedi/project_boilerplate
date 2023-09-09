import React, { useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../../context/UserAuthContext";

const UserSignin = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("active");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const { signUp } = useUserAuth();
  const navigate=useNavigate()

  const handleUserForm = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
      name: name,
      gender: gender,
      status: status,
      address: address,
      image: image,
      // Add other user-related data as needed
    };
    try {
      await signUp(userData);
      navigate("/")
    } catch (error) {
      setError("Error registering user: " + error.message);
    }
  };

  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col>
          <div className="p-4 box">
            <h2 className="mb-3">Firebase Auth Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUserForm}>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  placeholder="Image"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="select"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
              
                <div>
                  <Form.Check
                    inline
                    type="radio"
                    label="Active"
                    name="status"
                    value="active"
                    checked={status === "active"}
                    onChange={() => setStatus("active")}
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Inactive"
                    name="status"
                    value="inactive"
                    checked={status === "inactive"}
                    onChange={() => setStatus("inactive")}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/userlogin">Log In</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserSignin;
