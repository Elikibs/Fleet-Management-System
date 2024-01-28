import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/members')
      .then((r) => r.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <div>
      <NavBar />
      <div className='display'>
        <Dashboard />
        <div className='content'>
          <h1>Members Page</h1>
          <br />
          <div className='cards'>
            {members.map((member) => (
              <Card key={member.id} className='member-card'>
                <Card.Body>
                  <Card.Img
                    variant="top"
                    src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
                    className='member-img'
                  />
                  <br></br>
                  <br />
                  <Card.Subtitle className="mb-2 text-muted">{member.name}</Card.Subtitle>
                  <Card.Text>location{member.location}</Card.Text>
                  <Card.Link href="#">View Member</Card.Link>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
