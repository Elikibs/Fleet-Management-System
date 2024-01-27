import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Members from './Members';
import MatatuRoutes from './MatatuRoutes';
import Matatus from './Matatus';
import AddMatatu from './AddMatatu';
import "./App.css";


function App() {
  // fetch matatus
  const [matatus, setMatatus] = useState([])
  useEffect(()=> {
    fetch("http://localhost:3000/matatus")
    .then((r) => r.json())
    .then((data) => setMatatus(data))
},[]);

const handleDeleteMatatu = (id) => {
  fetch(`http://localhost:3000/matatus/${id}`, {
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

  // function handleAddMatatu(newMatatu){
  //   setMatatus([...matatus,newMatatu])
  // }
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<LandingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/members" element={<Members/>}/>
      <Route path="/matatu_routes" element={<MatatuRoutes/>}/>
      {/* pass matatu as a prop */}
      <Route path="/matatus" element={<Matatus/>}/> 
      {/* pass prop handleAddMatatu */}
      <Route path="/add_matatu" element={<AddMatatu/>}/>

      </Routes>

    </div>
  );
}

export default App;
