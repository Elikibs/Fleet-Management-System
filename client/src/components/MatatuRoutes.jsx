import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddRoute from './AddRoute';

export default function MatatuRoutes() {
  const [modalShow, setModalShow] = useState(false);
  const [routes, setRoutes] = useState([])

  const toggleModal = () => setModalShow(!modalShow);
  const handleAddRoute = (event) => {
    event.preventDefault();
    toggleModal();
  };
  useEffect(()=> {
     fetch('http://localhost:3000/routes')
    .then((r) => r.json())
     .then((data) => setRoutes(data))
 },[]);
function handleAddRoutes(newRoute){
    setRoutes([...routes,newRoute])
  }


  const handleDeleteRoute = (id) => {
    fetch(`http://localhost:3000/routes/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            setRoutes((prevroute) => prevroute.filter((route) => route.id !== id));
        } else {
            console.error('Failed to delete matatu');
        }
    })
    .catch(error => {
        console.error('Error deleting matatu:', error);
    });
};

  const hideModal = () => setModalShow(false);

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
              src="https://www.trinetrawireless.com/wp-content/uploads/2017/12/Efficient-Fleet-Route-Optimization-With-Trinetra-Wireless.jpg"  // Replace with your image source
              alt=""
              style={{ width: '100%',height:'400px',borderRadius:'20px' }}
            />
          </div>
          <ul>
            <span>
              {routes.map((route)=>(
                <div className='lists'>
                <h5>{route.name}</h5>
                <h5 className='price'>Price:{route.price}</h5>
                <span className='deleteroute' >
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: 'navy' }} onClick={() => handleDeleteRoute(route.id)}/>
                </span>
              </div>

              ))}
            </span>
          </ul>
        </div>
      </div>
      {/* pass handleroutes prop */}
      <AddRoute show={modalShow} onHide={hideModal} onAddRoute={handleAddRoute} handleAddRoutes={handleAddRoutes} />
      <Footer />
    </div>
  );
}
