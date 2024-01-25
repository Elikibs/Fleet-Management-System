import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function AddRoute({ show, onHide, onAddRoute }) {
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
            <Form.Control type='text' placeholder='Enter route name' />
          </Form.Group>
          <Form.Group controlId='routePrice'>
            <Form.Label>Route Price</Form.Label>
            <Form.Control type='number' placeholder='Enter route price' />
          </Form.Group>
          <Button variant='primary' type='submit' style={{color:'white', background:'#40A2D8',marginTop:'30px'}}>
            Add Route
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
