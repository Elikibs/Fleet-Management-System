import React, {useState} from 'react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';
import Footer from './Footer';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddRoute from './AddRoute';

export default function MatatuRoutes() {
  const [modalShow, setModalShow] = useState(false);
  // const [route, setRoute] = useState([])

  const toggleModal = () => setModalShow(!modalShow);
  const handleAddRoute = (event) => {
    event.preventDefault();
    toggleModal();
  };
//   useEffect(()=> {
//     fetch('https://pizza-restaurant-buse.onrender.com/restaurants')
//     .then((r) => r.json())
//     .then((data) => setRestaurants(data))
// },[]);
// function handleAddRoutes(newRoute){
  //   setRoute([...route,newRoute])
  // }
//   const handleDeleteRoute = (routeId) => {
//     fetch(`/api/matatus/${routeId}`, {
//         method: 'DELETE'
//     })
//     .then(response => {
//         if (response.ok) {
//             console.log('Matatu deleted successfully');
//         } else {
//             console.error('Failed to delete matatu');
//         }
//     })
//     .catch(error => {
//         console.error('Error deleting matatu:', error);
//     });
// };

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
              <div className='lists'>
                <h5>NRB-Juja</h5>
                <h5 className='price'>Price:80</h5>
                <span className='deleteroute'>
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: 'navy' }} />
                </span>
              </div>
              <div className='lists'>
                <h5>NRB-Kikuyu</h5>
                <h5 className='price'>Price:70</h5>
                <span className='deleteroute'>
                  <FontAwesomeIcon icon={faTrashCan} style={{ color: 'navy' }} />
                </span>
              </div>
            </span>
          </ul>
        </div>
      </div>
      {/* pass handleroutes prop */}
      <AddRoute show={modalShow} onHide={hideModal} onAddRoute={handleAddRoute} />
      <Footer />
    </div>
  );
}
