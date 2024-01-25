import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate()

  function handleClick(){
    navigate("/register")
  }
  function handleLogIn(){
    const isAdmin = false; // Replace with your authentication logic

    if (isAdmin) {
      // Navigate to admin page
      navigate("/admin");
    } else {
      // Navigate to home page
      navigate("/home");
    }
  }
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
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          {/* <Link>Forgot your password?</Link> */}
          <button onClick={handleLogIn}>Sign In</button>
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

