import React from 'react'
import NavBar from './NavBar';
import Dashboard from './Dashboard.jsx';
import Footer from './Footer';
import Card from 'react-bootstrap/Card';


export default function Home() {
  return (
    <div>
    <NavBar/>
   <div className='display'>
   <Dashboard/>
   <div className='content'>
   <div className='welcome'>
    <br></br>
   <img className='homeimage'
      src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png" alt="Fleetsense" />
      <br></br>
      <br></br>
    <h1>Hello User</h1>
    <h2 className='paragraph'>Revolutionize Your Fleet Management with <strong>Fleetsense</strong>.</h2>
    </div>
    <br></br>
    <div className='cardcontainer'>
    <div className='home-cards'>
    <Card style={{ width: '18rem', borderRadius:'40px' }}>
      <Card.Img variant="top" src="https://abiweb.com/wp-content/uploads/2022/08/61880478-0-1384868-PeriodLandin.webp" style={{height: '140px',width: '90px;'}}/>
      <Card.Body>
        <Card.Title>Fleets Companion</Card.Title>
        <Card.Text style={{ fontSize: '14px' }}>
          Digitalize end to end fleet operations and dispatches to improve efficiency, complience and management. 
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem', borderRadius:'40px'  }}>
      <Card.Img variant="top" src="https://www.svgrepo.com/show/375378/cloud-optimization-ai-fleet-routing-api.svg" style={{height: '140px',width: '90px;'}}/>
      <Card.Body>
        <Card.Title>Manage routes</Card.Title>
        <Card.Text style={{ fontSize: '14px' }}>
        It allows administrators or authorized users to add new routes and remove existing ones as per operational requirements. 
       The ability to add and delete routes provides flexibility in adjusting the transportation network to meet changing demands and optimize efficiency.
        </Card.Text>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem', borderRadius:'40px'  }}>
      <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/512/10794/10794258.png" style={{height: '140px',width: '90px;'}}/>
      <Card.Body>
        <Card.Title>Manage Matatus</Card.Title>
        <Card.Text style={{ fontSize: '14px' }}>
          Authorized users can add new matatus to the system, edit existing matatu details such as capacity and operation route,
           and also remove matatus that are no longer in service or require updating.
        </Card.Text>
      </Card.Body>
    </Card>

    </div>
    </div>
   </div>
   </div>
  <Footer/>
 </div>
  )
}
