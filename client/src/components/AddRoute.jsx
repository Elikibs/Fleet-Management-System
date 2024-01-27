import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';


// pass handleAddRoutes as a prop
export default function AddRoute({ show, onHide, onAddRoute, handleAddRoutes }) {

  const [input, setInput]= useState({
     name:'',
     price:''
  })
  const handleInputChange = (e) =>{
    const { name, value } = e.target;
      setInput({
         ...input,
         [name]: value
       });
  }
  function handleSubmit(e){
    e.preventDefault();
    const item= {
       name:input.name,
       price:input.price
    };
    fetch("http://localhost:3000/routes" ,{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item),
    })
    .then((r) => r.json())
    .then((newMatatu) => handleAddRoutes(newMatatu))
    setInput({
      name:'',
      price:''
    })

    onHide();
  }


  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add Route</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your form elements here */}
        <Form onSubmit={onAddRoute}>
          <Form.Group controlId='routeName'>
            <Form.Label>Route Name</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Enter route name'
            name='name' 
            value={input.name}
            onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId='routePrice'>
            <Form.Label>Route Price</Form.Label>
            <Form.Control 
            type='number' 
            placeholder='Enter route price'
            name='price'
            value={input.price}
            onChange={handleInputChange}
             />
          </Form.Group>
          <Button onClick={handleSubmit} 
          variant='primary' 
          type='submit' 
          style={{color:'white', background:'#40A2D8',marginTop:'30px'}}
          >
            Add Route
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
