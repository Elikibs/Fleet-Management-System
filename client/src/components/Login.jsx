import React,{useState} from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState(" ")
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  function handleClick(){
    navigate("/register")
  }
  const handleLogin = async () => {
    try {
      const response = await axios.post('/auth/login', {
        username,
        password,
      });

      console.log(response.data.access_token)

      const { access_token, refresh_token } = response.data;
      // console.log(access_token)
      // setToken(access_token);
    

      // Store tokens in local storage
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('refreshToken', refresh_token);

      // Redirect to home or another page
      navigate('/home');
    } catch (error) {
      alert('Error logging in:', error);
    }
  };
  return (
    <div className='containerr'>
      <div className='form-container sign-in'>
        <form>
          <h1>Sign In</h1>
          <div className='icons'>
            <FontAwesomeIcon icon={faGoogle} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon icon={faGithub} />
          </div>
          <span>or use your email for registration</span>
          <input type='email'
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Email'/>
          <input type='password' 
           value={password}
           onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'/>
          {/* <Link>Forgot your password?</Link> */}
          <button onClick={handleLogin}>Sign In</button>
        </form>
      </div>
      <div className='toggle-container'>
        <div className='toggle'>
            <div className="toggle-panel toggle-right">
                <h1>Hello, User!</h1>
                <p>Register with your personal details to use
                     all of site features</p>
                <button className='hidden' onClick={handleClick}>Sign Up</button>
            </div>
        </div>
      </div>
    </div>
  );
}