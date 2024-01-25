import React from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { Card } from 'react-bootstrap';
// import { useState, useEffect } from 'react';

export default function Members() {
//   const [members,setMembers ] = useState([])
//   useEffect(()=> {
//     fetch('https://pizza-restaurant-buse.onrender.com/restaurants')
//     .then((r) => r.json())
//     .then((data) => setMembers(data))
// },[]);
  return (
  <div>
    <NavBar/>
     <div className='display'>
       <Dashboard/>
     <div className='content'>
      <h1>Members Page</h1>
      <br></br>
      <div className='cards' style={{gap:'30px'}}>
      <Card style={{ width: '18rem',borderRadius:'20px' }}>
      <Card.Body>
      <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" style={{height:'90px',width:'90px',display:'block', margin:'auto'}}/>
      <br></br>
        <Card.Subtitle className="mb-2 text-muted">Member name</Card.Subtitle>
        <Card.Text>Member Description</Card.Text>
        <Card.Link href="#">View Member</Card.Link>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',borderRadius:'20px' }}>
      <Card.Body>
      <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" style={{height:'90px',width:'90px',display:'block', margin:'auto'}}/>
      <br></br>
        <Card.Subtitle className="mb-2 text-muted">Member name</Card.Subtitle>
        <Card.Text>Member Description</Card.Text>
        <Card.Link href="#">View Member</Card.Link>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem',borderRadius:'20px' }}>
      <Card.Body>
      <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" style={{height:'90px',width:'90px',display:'block', margin:'auto'}}/>
      <br></br>
        <Card.Subtitle className="mb-2 text-muted">Member name</Card.Subtitle>
        <Card.Text>Member Description</Card.Text>
        <Card.Link href="#">View Member</Card.Link>
      </Card.Body>
    </Card>
      </div>
      
    
     </div>
    </div>
     <Footer/>
 </div>
  )
}
