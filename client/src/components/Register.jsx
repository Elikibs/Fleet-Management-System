import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub } from '@fortawesome/free-brands-svg-icons';


export default function Register() {
    const navigate = useNavigate()

    function handleClick(){
        console.log("yoo")
        navigate("/")
    }
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
          <input type='text' placeholder='Name'/>
          <input type='email' placeholder='Email'/>
          <input type='password' placeholder='Password'/>
          <button>Sign Up</button>
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
