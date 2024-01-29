import React, {useState} from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { Button,FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AddMatatu({handleAddMatatu}) {
    const navigate= useNavigate()
    const[input, setInput] = useState({
        drivers_name : " ",
        route_id: " ",
        drivers_contact:" ",
        number_plate: " ",
        capacity: " ",
        trips: " ",
    })
    const handleInput = (e)=>{
      const { name, value } = e.target;
      setInput({
        ...input,
        [name]: value
      });

  }
// handleAddMatatu
    function handleMatatu(e){
      e.preventDefault();
      const item= {
        drivers_name : input.drivers_name,
        route_id: input.route_id,
        drivers_contact:input.drivers_contact,
        number_plate: input.number_plate,
        capacity: input.capacity,
        trips: input.trips,
      };
      fetch("" ,{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(item),
      })
      .then((r) => r.json())
      .then((newMatatu) => handleAddMatatu(newMatatu))
      setInput({
        drivers_name : " ",
        route_id: " ",
        drivers_contact:" ",
        number_plate: " ",
        capacity: " ",
        trips: " ",

      })

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
             name='drivers_name'
             onChange={handleInput}
             value={input.drivers_name}
             placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel label="Route" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='route_id'
             onChange={handleInput}
             value={input.route_id}
             placeholder="Route" />
            </FloatingLabel>
            <FloatingLabel  label="Drivers contact" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='drivers_contact' 
             onChange={handleInput}
             value={input.drivers_contact}
             placeholder="Drivers contact" />
            </FloatingLabel>
            <FloatingLabel  label="Number Plate" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='number_plate'
             onChange={handleInput}
             value={input.number_plate}
             placeholder="Number Plate" />
            </FloatingLabel>
            <FloatingLabel  label="Capacity" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='capacity' 
             onChange={handleInput}
             value={input.capacity}
             placeholder="Capacity" />
            </FloatingLabel>
            <FloatingLabel  label="Trips" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='trips' 
             onChange={handleInput}
             value={input.trips}
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
