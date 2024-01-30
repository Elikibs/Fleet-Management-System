import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import React,{useState} from 'react';
import axios from 'axios';


export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate()

    function handleClick(){
        navigate("/login")
    }
    const handleSignup = async () => {
      try {
        // Check if passwords match
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        // Check if username is 'admin' or 'Admin'
      if (username.toLowerCase() === 'admin') {
        alert('Invalid username. Please choose a different username.');
        return;
      }
        const response = await axios.post('https://fleetsense.onrender.com/auth/register', {
          username,
          email,
          password,
        });
  
        alert('User registered successfully:', response.data);
        navigate('/login');
      } catch (error) {
        console.error('Error signing up:', error);
      }
    };
  return (
    <div className='containers'>
      <div className='form-containers sign-up'>
        <form >
          <h1>Create Account</h1>
          <div className='icons'>
            <FontAwesomeIcon  icon={faGoogle} />
            <FontAwesomeIcon icon={faFacebook} />
            <FontAwesomeIcon  icon={faGithub} />
          </div>
          <span>or use your email for registration</span>
          <input type='text'
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          placeholder='UserName'/>
          <input type='email'
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'/>
          <input type='password' 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'/>
          <input type='password'
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword} 
          placeholder='Confirm Password'/>
          <select>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
          <button onClick={handleSignup}>Sign Up</button>
        </form>
      </div>
      <div className='toggles-containers'>
        <div className='toggles'>
            <div className='toggles-panel toggle-left' >
                <h1>Welcome Back!</h1>
                <p>Enter your personal details to use all of site features</p>
                <button className='hidden' onClick={handleClick}>Sign In</button>
            </div>
        </div>
      </div>
    </div>
  )
}