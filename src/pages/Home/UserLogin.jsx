import React, {  useState } from "react";
import { Form, Alert, Button, Container, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../../context/UserAuthContext";


 const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, googleSingin } = useUserAuth()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      let res = await logIn(email, password);
      console.log("res", res.user.uid);
      if (res.user.uid) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      console.log("err", err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSingin();
      console.log("login successfull")
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="p-4 box" style={{ width: "400px", margin: "auto" }}>
        <h2 className="mb-3">Firebase Auth Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
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
              Log In
            </Button>
          </div>
        </Form>
        <hr />
        <div>
          <GoogleButton
            className="g-btn"
            type="dark"
            onClick={handleGoogleSignIn}
          />
        </div>
      </div>
      <div className="p-4 box mt-3 text-center">
        Don't have an account? <Link to="/sigin">Sign up</Link>
      </div>
    </>
  );
};

export default UserLogin