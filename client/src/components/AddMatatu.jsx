// import React, {useState} from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { Button,FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function AddMatatu() {
    const navigate= useNavigate()
    // const[input, setInput] = useState({
    //   name :'',
    //   route:'',
    //   driverscontact:'',
    //   numberplate: '',
    //   capacity:'',
    //   trips:''
    // })
  //   const handleInput = (e)=>{
  //     const { name, value } = e.target;
  //     setInput({
  //       ...input,
  //       [name]: value
  //     });

  // }
// handleAddMatatu
    function handleMatatu(e){
      // e.preventDefault();
      // const item= {
      //   name : input.name,
      //   route: input.route,
      //   driverscontact:input.driverscontact,
      //   numberplate: input.numberplate,
      //   capacity: input.capacity,
      //   trips: input.trips,
      // };
      // fetch("/add_matatu" ,{
      //   method: "POST",
      //   headers:{
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify(item),
      // })
      // .then((r) => r.json())
      // .then((newMatatu) => handleAddMatatu(newMatatu))
      // setInput({
      //   name :'',
      // route:'',
      // driverscontact:'',
      // numberplate: '',
      // capacity:'',
      // trips:''

      // })

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
            //  onChange={handleInput}
             placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel label="Route" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='route'
             //  onChange={handleInput}
             placeholder="Route" />
            </FloatingLabel>
            <FloatingLabel  label="Drivers contact" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='driverscontact' 
             //  onChange={handleInput}
             placeholder="Drivers contact" />
            </FloatingLabel>
            <FloatingLabel  label="Number Plate" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='numberplate'
             //  onChange={handleInput}
             placeholder="Number Plate" />
            </FloatingLabel>
            <FloatingLabel  label="Capacity" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='capacity' 
             //  onChange={handleInput}
             placeholder="Capacity" />
            </FloatingLabel>
            <FloatingLabel  label="Trips" className='mb-5'>
             <Form.Control type="text" style={{width:'90%'}}
             name='trips' 
             //  onChange={handleInput}
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
