import { Route, Routes } from 'react-router-dom';
import LangingPage from './LangingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Members from './Members';
import MatatuRoutes from './MatatuRoutes';
import Matatus from './Matatus';
import AddMatatu from './AddMatatu';
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<LangingPage/>}/>
      <Route path="/login" element={<Login/>}/>
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
