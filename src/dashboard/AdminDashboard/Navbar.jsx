import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContextProvider";


 const Navbars = () => {
    const {logout,admin}=useAdminAuth()
    

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    marginLeft:"50px"
  };

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Link to="/" style={linkStyle}>
            Dashboard
          </Link>
         <p style={linkStyle}> {admin && admin.email}</p>  
          <p style={linkStyle}>
            {admin ? (
              <Button onClick={() => handleLogOut()}>Log Out</Button>
            ) : (
              (
                <>
                 <Link to="/login" style={linkStyle}>
                  Login
                </Link>
             
                <Link to="/signin" style={linkStyle}>
                  Sign Up
                </Link>
                </>
               
              )
            )}
          </p>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navbars