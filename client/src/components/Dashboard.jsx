import React from 'react'
import { Link } from 'react-router-dom'


export default function Dashboard() {
  return (
    
        <div className='dashboard'>
            <h1>Dashboard</h1>
            <ul className='list'>
                <li>
                <Link to ={"/home"} >Home</Link>
                </li>
                <li>
                <Link to ={"/members"}>Members</Link> 
                </li>
                <li>
                <Link to ={"/matatu_routes"}>Routes</Link>
                </li>
                <li>
                <Link to ={"/matatus"}>Matatus</Link>
                </li>
                
            </ul>

        </div>
  )
}
