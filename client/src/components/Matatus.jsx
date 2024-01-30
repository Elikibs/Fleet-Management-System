import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { Table } from 'react-bootstrap';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Matatus({ handleDeleteMatatu }) {
  const [matatus, setMatatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch matatus when the component mounts
    fetchMatatus();
  }, []);

  const fetchMatatus = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('https://fleetsense.onrender.com/matatus/allmatatus', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMatatus(response.data);
    } catch (error) {
      console.error('Error fetching matatus:', error);
      // Handle errors as needed
    }
  };
  

  function addMatatu() {
    navigate("/add_matatu");
  }

  return (
    <div>
      <NavBar />
      <div className='display'>
        <Dashboard />
        <div className='content'>
          <h1>List of Matatus</h1>
          <button className='buttons' onClick={addMatatu}>Add Matatu</button>
          <br></br>
          <br></br>
          <Table responsive style={{ width: '1400px', height: '400px' }}>
            <thead>
              <tr>
                <th>Matatu ID</th>
                <th>Number Plate</th>
                <th>Capacity</th>
                <th>Avg Rounds Per Day</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {matatus.map((matatu) => (
                <tr key={matatu.id}>
                  <td>{matatu.id}</td>
                  <td>{matatu.number_plate}</td>
                  <td>{matatu.capacity}</td>
                  <td>{matatu.avg_rounds_pd}</td>
                  <td>
                    <Link to={`/edit_matatu/${matatu.id}`}>
                      <FontAwesomeIcon icon={faPen} style={{ color: '#40A2D8' }} />
                    </Link>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: '#40A2D8' }} onClick={() => handleDeleteMatatu(matatu.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
