import React from 'react'
import NavBar from './NavBar'
import Dashboard from './Dashboard'
import Footer from './Footer'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function MatatuRoutes() {
  return (
    <div>
       <NavBar/>
      <div className='display'>
      <Dashboard/>
      <div className='content'>
        <h1>Routes Page</h1>
        <button className='button'>Add Route</button>
        <ul>
          <span>
            <div className='lists'>
              <h5>NRB-Juja</h5>
              <h5 className='price'>Price:80</h5>
              <span className='deleteroute'>
              <FontAwesomeIcon icon={faTrashCan} style={{color:'navy'}}/>
              </span>
            </div>
            <div className='lists'>
              <h5>NRB-Kikuyu</h5>
              <h5 className='price'>Price:70</h5>
              <span className='deleteroute'>
              <FontAwesomeIcon icon={faTrashCan} style={{color:'navy'}}/>
              </span>
            </div>
          </span>
        </ul>
      </div>
      </div>
     <Footer/>
    </div>
  )
}

