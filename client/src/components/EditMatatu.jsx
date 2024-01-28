import React,{useEffect, useState} from 'react'
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import { Button,FloatingLabel, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function EditMatatu() {
  const navigate = useNavigate()
  const {id}= useParams();
  const [input, setInput] = useState({
    id : id,
    capacity: '',
    route_id:''
  })
  const handleInputChange = (e) =>{
    const { name, value } = e.target;
      setInput({
         ...input,
         [name]: value
       });
  } 
  useEffect(()=> {
    fetch(`http://localhost:3000/matatus/${id}`)
    .then((r) => r.json())
    .then((data) => setInput(data))
},[id]);

   const handleSubmit= (e) =>{
    e.preventDefault();
    fetch(`http://localhost:3000/matatus/${id}`,{
      method:'PATCH',
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })
    .then(response => {
      if (response.ok){
        navigate("/matatus")
      }
    })
    .catch(err => console.log(err))
   }
  return (
    <div>
      <NavBar />
      <div className='display'>
        <Dashboard />
        <div className='content'>
          <h1>Edit Matatu</h1>
          <div>
        <div>
            <br></br>
            <div className='form' style={{borderRadius:"50px", backgroundColor:"#BEC0D4"}}>
                <br></br>
                <br></br>
            <FloatingLabel label="Capacity" className='mb-5'>
             <Form.Control type="number" style={{width:'90%'}}
             name='capacity'
             value = {input.capacity}
             onChange={handleInputChange}
             placeholder="Name" />
            </FloatingLabel>
            <FloatingLabel label="Operation Route" className='mb-5'>
             <Form.Control type="number" style={{width:'90%'}}
             name='route_id'
             value= {input.route_id}
             onChange={handleInputChange}
             placeholder="route_id" />
            </FloatingLabel>
            <Button variant="secondary" onClick={handleSubmit} style={{backgroundColor:"navy", marginBottom:"50px",marginLeft:'500px'}}>Edit Matatu</Button>

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

export default EditMatatu
