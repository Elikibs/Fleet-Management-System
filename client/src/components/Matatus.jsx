import React from 'react'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import Footer from './Footer'
import { Table } from 'react-bootstrap'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

export default function Matatus() {
    const navigate= useNavigate()
    // const [matatus, setMatatus] = useState([])
  //   useEffect(()=> {
  //     fetch('https://pizza-restaurant-buse.onrender.com/restaurants')
  //     .then((r) => r.json())
  //     .then((data) => setMatatus(data))
  // },[]);

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
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}}/>
                </td>
            </tr>
            <tr>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}}/>
                </td>
            </tr>
            <tr>
               <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}} />
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}}/>
                </td>
            </tr>
            <tr>
               <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>KCB 490B</td>
                <td>
                  <FontAwesomeIcon icon={faPen} style={{color:'#40A2D8'}}/>
                </td>
                <td>
                  <FontAwesomeIcon icon={faTrashCan} style={{color:'#40A2D8'}}/>
                </td>
            </tr>
          </tbody>
        </Table>
      </div>
      </div>
     <Footer/>
    </div>
  )
}
