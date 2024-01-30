import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddRoute from './AddRoute';

export default function MatatuRoutes({ accessToken }) {
  const [modalShow, setModalShow] = useState(false);
  const [routes, setRoutes] = useState([]);

  const toggleModal = () => setModalShow(!modalShow);

  const handleAddRoute = async (newRoute) => {
    try {
      const response = await fetch('https://fleetsense.onrender.com/routes/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(newRoute)
      });
  
      if (response.ok) {
        const addedRoute = await response.json();
        setRoutes((prevRoutes) => [...prevRoutes, addedRoute.route]);
      } else {
        console.error('Failed to add route');
      }
    } catch (error) {
      console.error('Error adding route:', error);
    }
  };

  const handleDeleteRoute = async (id) => {
    try {
      // Delete the route from the backend
      const response = await fetch(`https://fleetsense.onrender.com/routes/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${accessToken}` }
      });
  
      if (response.status === 200) {
        // If the route is deleted from the backend, update state to remove it from the UI
        setRoutes((prevRoutes) => prevRoutes.filter((route) => route.id !== id));
      } else {
        console.error('Failed to delete route');
      }
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };
  

  const hideModal = () => setModalShow(false);

  useEffect(() => {
    // Fetch routes when the component mounts
    fetch('https://fleetsense.onrender.com/routes/allroutes', {
      headers: { Authorization: `Bearer ${accessToken}` }
    })
      .then((r) => r.json())
      .then((data) => setRoutes(data));
  }, [accessToken]);

  return (
    <div>
      <NavBar />
      <div className='display'>
        <Dashboard />
        <div className='content'>
          <h1>Routes Page</h1>
          <button className='button' onClick={toggleModal}>
            Add Route
          </button>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <img
              src="https://www.trinetrawireless.com/wp-content/uploads/2017/12/Efficient-Fleet-Route-Optimization-With-Trinetra-Wireless.jpg"
              alt=""
              style={{ width: '100%', height: '400px', borderRadius: '20px' }}
            />
          </div>
          <ul>
            <span>
              {routes.map((route) => (
                <div className='lists' key={route.id}>
                  <h5>{route.name}</h5>
                  <h5 className='price'>Price: {route.price}</h5>
                  <span className='deleteroute'>
                    <FontAwesomeIcon icon={faTrashCan} style={{ color: 'navy' }} onClick={() => handleDeleteRoute(route.id)} />
                  </span>
                </div>
              ))}
            </span>
          </ul>
        </div>
      </div>
      <AddRoute show={modalShow} onHide={hideModal} onAddRoute={handleAddRoute} />
      <Footer />
    </div>
  );
}
