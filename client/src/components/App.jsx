import React,{useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Members from './Members';
import MatatuRoutes from './MatatuRoutes';
import Matatus from './Matatus';
import AddMatatu from './AddMatatu';
import EditMatatu from './EditMatatu'
import "./App.css";


function App() {
  // fetch matatus
  const [matatus, setMatatus] = useState([])
  useEffect(()=> {
    fetch("")
    .then((r) => r.json())
    .then((data) => setMatatus(data))
},[]);

//function to delete matatus
const handleDeleteMatatu = (id) => {
  fetch(``, {
      method: 'DELETE'
  })
  .then(response => {
      if (response.ok) {
          setMatatus((prevmatatu) => prevmatatu.filter((matatu) => matatu.id !== id))
      } else {
          console.error('Failed to delete matatu');
      }
  })
  .catch(error => {
      console.error('Error deleting matatu:', error);
  });
};

//add matatus 
  function handleAddMatatu(newMatatu){
    setMatatus([...matatus,newMatatu])
  }
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/members" element={<Members/>}/>
      <Route path="/matatu_routes" element={<MatatuRoutes/>}/>
      <Route path="/matatus" element={<Matatus matatus={matatus}  handleDeleteMatatu={handleDeleteMatatu}/>}/> 
      <Route path="/add_matatu" element={<AddMatatu handleAddMatatu={handleAddMatatu}/>}/>
      <Route path="/edit_matatu/:id" element={<EditMatatu />} />

      </Routes>

    </div>
  );
}

export default App;
