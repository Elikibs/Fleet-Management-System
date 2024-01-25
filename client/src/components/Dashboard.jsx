import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faRoad, faBus } from '@fortawesome/free-solid-svg-icons';



export default function Dashboard() {
  const iconStyle = { color: 'navy', marginRight: '10px' };
  return (
    
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <ul className='list'>
                <li>
                <Link to={"/home"}>
                   <FontAwesomeIcon icon={faHome} style={iconStyle} /> Home
               </Link>
                </li>
                <li>
                <Link to ={"/members"}>
                  <FontAwesomeIcon icon={faUsers} style={iconStyle} /> 
                  Members</Link> 
                </li>
                <li>
                <Link to ={"/matatu_routes"}>
                <FontAwesomeIcon icon={faRoad} style={iconStyle} /> 
                  Routes</Link>
                </li>
                <li>
                <Link to ={"/matatus"}>
                <FontAwesomeIcon icon={faBus} style={iconStyle} /> 
                  Matatus</Link>
                </li>
                
            </ul>

        </div>
  )
}
