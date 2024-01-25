import { Route, Routes } from 'react-router-dom';
import LangingPage from './LangingPage';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Members from './Members';
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

      </Routes>

    </div>
  );
}

export default App;
