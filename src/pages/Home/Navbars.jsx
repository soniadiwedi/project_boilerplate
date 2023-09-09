import React from 'react'
import { Button, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUserAuth } from '../../context/UserAuthContext';
const UserNavbars = () => {
  const {logout,user}=useUserAuth()

  console.log("user",user)
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
    <div><Navbar bg="dark" variant="dark" className="header">
    <Container>
      <Link to="/" style={linkStyle}>
        Dashboard
      </Link>
      <p style={linkStyle}> {user && user.name}</p>  
          <p style={linkStyle}>
            {user ? (
              <Button onClick={() => handleLogOut()}>Log Out</Button>
            ) : (
              (
                <>
                 <Link to="/userlogin" style={linkStyle}>
                  Login
                </Link>
             
                <Link to="/usersignin" style={linkStyle}>
                  Sign Up
                </Link>
                </>
               
              )
            )}
          </p>
     
    </Container>
  </Navbar></div>
  )
}

export default UserNavbars