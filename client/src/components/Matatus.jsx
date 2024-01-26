import React from 'react'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import { useState } from 'react'
import Footer from './Footer'
import { Table } from 'react-bootstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import EditMatatu from './EditMatatu'

//matatu prop
export default function Matatus() {
    const navigate= useNavigate()
    const [modalShow, setModalShow] = useState(false);
    const hideModal = () => setModalShow(false);
    const toggleModal = () => setModalShow(!modalShow);
    const handleAddRoute = (event) => {
      event.preventDefault();
      toggleModal();
    };
    const handleDeleteMatatu = (matatuId) => {
      fetch(`/api/matatus/${matatuId}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (response.ok) {
              console.log('Matatu deleted successfully');
          } else {
              console.error('Failed to delete matatu');
          }
      })
      .catch(error => {
          console.error('Error deleting matatu:', error);
      });
  };

    function addMatatu(){
        navigate("/add_matatu")
    }
  return (
    <div>
       <NavBar/>
      <div className='display'>
      <Dashboard/>
      <div className='content'>
      <h1>List of Matatus</h1>
      <button className='buttons'onClick={addMatatu}>Add Matatu</button>
      <br></br>
      <br></br>
      <Table responsive style={{width:'1400px', height:'400px'}}>
          <thead>
            <tr>
              <th>Indentity</th>
              <th>Capacity</th>
              <th>Operation Route</th>
              <th>Edit</th>
              <th>Delete</th>  
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}} onClick={toggleModal}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}} onClick={handleDeleteMatatu}/>
                </td>
            </tr>
            <tr>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}}onClick={toggleModal}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}} onClick={handleDeleteMatatu}/>
                </td>
            </tr>
            <tr>
               <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}} onClick={toggleModal} />
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}} onClick={handleDeleteMatatu}/>
                </td>
            </tr>
            <tr>
               <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}} onClick={toggleModal}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}} onClick={handleDeleteMatatu}/>
                </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </div>
      <EditMatatu show={modalShow} onHide={hideModal} onAddRoute={handleAddRoute} />
     <Footer/>
    </div>
  )
}
