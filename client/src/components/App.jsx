import { Route, Routes } from 'react-router-dom';
import LangingPage from './LangingPage';
import Login from './Login';
import "./App.css";

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<LangingPage/>}/>
      <Route path="/login" element={<Login/>}/>
      </Routes>

    </div>
  );
}

export default App;
