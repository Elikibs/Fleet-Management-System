// import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

// pass handleAddRoutes as a prop
export default function EditMatatu({ show, onHide, onAddRoute }) {
  // const [input, setInput]= useState({
  //    routename:'',
  //    routeprice:''
  // })
  // const handleInputChange = (e) =>{
  //   const { name, value } = e.target;
  //     setInput({
  //        ...input,
  //        [name]: value
  //      });
  // }
  // function handleSubmit(e){
  //   // e.preventDefault();
  //   //const formData = new FormData
  //   //const capacity = formData.get('capacity')
  //   //const operationRoute = formData.get('operation_route')
  //   // const data ={
  //   //   capacity: capacity,
  //  //   operatioRoute: operatioRoute
  //   //  }
  //   // fetch("/matatus/${matatuId}" ,{
  //   //   method: "PATCH",
  //   //   headers:{
  //   //     "Content-Type": "application/json"
  //   //   },
  //   //   body: JSON.stringify(data)
  //   // })
  //   // .then((r) => r.json())
  //   // .then(updatedMatatu => {
  //   //  console.log("Matatu updated:", updatedMatatu)
  //   // onHide();
  //   // })
  //   // setInput({
  //     // routename:'',
  //     // routeprice:''
  //   // })

  //    navigate("/matatu_routes")
  // }


  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit Matatu Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add your form elements here */}
        <Form onSubmit={onAddRoute}>
          <Form.Group controlId='routeName'>
            <Form.Label>Capacity</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Enter capacity'
            name='capacity' 
            // value={input.routename}
            />
          </Form.Group>
          <Form.Group controlId='routePrice'>
            <Form.Label>Operation</Form.Label>
            <Form.Control 
            type='text' 
            placeholder='Enter operation route'
            name='operation route'
            // value={input.routeprice}
             />
          </Form.Group>
          <Button 
          variant='primary' 
          type='submit' 
          style={{color:'white', background:'#40A2D8',marginTop:'30px'}}
          >
            Edit Matatu
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
// onClick={handleSubmit}