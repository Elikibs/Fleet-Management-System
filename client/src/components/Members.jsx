import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';

export default function Members({ accessToken }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('https://fleetsense.onrender.com/users/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMembers(data))
      .catch((error) => console.error('Error fetching members:', error));
  }, [accessToken]);

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
                  <br />
                  <br />
                  <Card.Subtitle className="mb-2 text-muted">{member.username}</Card.Subtitle>
                  <Card.Text>{member.email}</Card.Text>
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
