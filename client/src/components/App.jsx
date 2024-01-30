import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Members from './Members';
import MatatuRoutes from './MatatuRoutes';
import Matatus from './Matatus';
import AddMatatu from './AddMatatu';
import EditMatatu from './EditMatatu';
import "./App.css";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  console.log("This is", accessToken);

  // Fetch matatus
  const [matatus, setMatatus] = useState([]);
  useEffect(() => {
    fetch("matatus/peruser", {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then((r) => r.json())
      .then((data) => setMatatus(data));
  }, [accessToken]);

  // Function to delete matatus
  const handleDeleteMatatu = (id) => {
    fetch(``, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setMatatus((prevMatatu) => prevMatatu.filter((matatu) => matatu.id !== id));
        } else {
          console.error('Failed to delete matatu');
        }
      })
      .catch(error => {
        console.error('Error deleting matatu:', error);
      });
  };

  // Add matatus
  function handleAddMatatu(newMatatu) {
    setMatatus([...matatus, newMatatu]);
  }

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login accessToken={accessToken} />} />
        <Route path="/register" element={<Register accessToken={accessToken} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/members" element={<Members accessToken={accessToken} />} />
        <Route path="/matatu_routes" element={<MatatuRoutes accessToken={accessToken} />} />
        <Route path="/matatus" element={<Matatus matatus={matatus} accessToken={accessToken} handleDeleteMatatu={handleDeleteMatatu} />} />
        <Route path="/add_matatu" element={<AddMatatu handleAddMatatu={handleAddMatatu} accessToken={accessToken} />} />
        <Route path="/edit_matatu/:id" element={<EditMatatu accessToken={accessToken} />} />
      </Routes>
    </div>
  );
}

export default App;
