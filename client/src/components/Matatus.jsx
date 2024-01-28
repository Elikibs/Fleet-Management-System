import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import Footer from './Footer'
import { Table } from 'react-bootstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'


//matatu prop
export default function Matatus({matatus, handleDeleteMatatu}) {
    const navigate= useNavigate()

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
            {matatus.map((matatu) =>(
               <tr key={matatu.id}>
               <td>{matatu.number_plate}</td>
               <td>{matatu.capacity}</td>
               <td>{matatu.route_id}</td>
               <td>
               <Link to={`/edit_matatu/${matatu.id}`}>
                        <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                </Link>
               </td>
               <td>
                 <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}} onClick={() => handleDeleteMatatu(matatu.id)}/>
               </td>
           </tr>

            ))}
          </tbody>
        </Table>
      </div>
      </div>
     <Footer/>
    </div>
  )
}
