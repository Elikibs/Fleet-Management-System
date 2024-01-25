import React from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { Button,FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AddMatatu() {
    const navigate= useNavigate()
    function handleMatatu(){
       navigate("/matatus")
    }
  return (
    <div>
      <NavBar/>
      <div className='display'>
      <Dashboard/>
      <div className='content'>
        <h1>Add Matatu</h1>
        <div>
        <div>
            <br></br>
            <div className='form' style={{borderRadius:"50px", backgroundColor:"#BEC0D4"}}>
                <br></br>
                <br></br>
            <FloatingLabel label="Name" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='name'
             placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel label="Route" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='image'
             placeholder="Route" />
            </FloatingLabel>
            <FloatingLabel  label="Drivers contact" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='description' 
             placeholder="Drivers contact" />
            </FloatingLabel>
            <FloatingLabel  label="Number Plate" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='material'
             placeholder="Number Plate" />
            </FloatingLabel>
            <FloatingLabel  label="Capacity" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='price' 
             placeholder="Capacity" />
            </FloatingLabel>
            <FloatingLabel  label="Trips" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='price' 
             placeholder="Trips" />
            </FloatingLabel>
            <Button variant="secondary" onClick={handleMatatu}style={{backgroundColor:"navy", marginBottom:"50px",marginLeft:'500px'}}>Add Matatu</Button>

            </div>
            <br></br>
         </div>
    </div>
      </div>
      </div>
      <Footer/>
    </div>
  )
}
