import React from 'react'
import NavBar from './NavBar';
// import { Carousel } from 'react-bootstrap';
import Dashboard from './Dashboard.jsx';
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
    <h2>Revolutionize Your Fleet Management with <strong>Fleetsense</strong>.Your All-in-One Solution for Streamlined Operations. Experience Advanced Analytics, and Seamless Communication. Boost Efficiency, Cut Costs, and Drive Success. Join us Today for a Smarter Tomorrow!</h2>

   </div>
   </div>
   </div>
  <Footer/>
 </div>
  )
}
