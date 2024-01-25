import React from 'react';
import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';



function NavBar() {
  return (
    
      <div>
        <Navbar style={{backgroundColor: "navy"}} variant="dark">
        <Container>
          <Navbar.Brand href="#home">Fleet Sense</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Link as={Link} to={"/home"}>Home</Nav.Link>
            <Nav.Link as={Link} to={"/"}>Members</Nav.Link>
            <Nav.Link as={Link} to={"/"}>About Us</Nav.Link>
            <Nav.Link as={Link} to={"/"}>Log out</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
    
    
  )
}

export default NavBar;
