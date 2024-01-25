import Login from './Login';
import Register from './Register';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Members from './Members';
import Matatus from './Matatus';
import MatatuRoutes from './MatatuRoutes';
import AddMatatu from './AddMatatu';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/members" element={<Members/>}/>
        <Route path="/matatu_routes" element={<MatatuRoutes/>}/>
        <Route path="/matatus" element={<Matatus/>}/>
        <Route path="/add_matatu" element={<AddMatatu/>}/>
      </Routes>
    </div>
  );
}

export default App;
