import React from 'react'
import NavBar from './NavBar';
// import { Carousel } from 'react-bootstrap';
import Dashboard from './Dashboard';
import Footer from './Footer';

export default function Home() {
  return (
    <div>
    <NavBar/>
   <div className='display'>
   <Dashboard/>
   <div className='content'>
   {/* <h1>Home Page</h1> */}
   <div className='welcome'>
    <h1>Hello User</h1>

   </div>
   </div>
   </div>
  <Footer/>
 </div>
  )
}