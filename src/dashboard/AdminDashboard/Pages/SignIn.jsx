import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Container, Row, Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useAdminAuth } from './../../../context/AdminAuthContextProvider';

 const Signin = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const {signUp}=useAdminAuth()
    const navigate=useNavigate()
    const handleSignin=async(e)=>{
        e.preventDefault()
        setError("")
        try{
            await signUp(email,password)
            navigate("/admin_panel")
            console.log(email,password)
        }catch(err){
            setError(err.message)
        }
    }
  return (
    <Container style={{ width: "400px" }}>
      <Row>
        <Col> 
        <div className="p-4 box">
        <h2 className="mb-3">Firebase Auth Signup</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSignin}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
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
        Already have an account? <Link to="/login">Log In</Link>
      </div>
        </Col>
      </Row>
    </Container>
  )
}
export default Signin