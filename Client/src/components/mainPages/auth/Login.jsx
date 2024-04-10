import  { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'

function Login() {
 
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: ''
  });

  const handleChangeInput = ({target}) => {
    const {name, value} = target;
    setUserInfo({...userInfo, [name]: value});
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    //console.log('info', userInfo);
    try {
      await axios.post('/api/user/login', {...userInfo});
      //console.log('response', response, "user", userInfo);
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';

    } catch (error) {
      console.log('error', error);
      alert("Loguin  "+ error.response.data.msg);
    }

  }
  return (
    <div className='login-page' onSubmit={handleSubmitLogin}>
      <form >
        <h2>Login</h2>
        <input type="email" name='email' required placeholder='Email'
        value={userInfo.email} onChange={handleChangeInput}/>

        <input type="password" name='password' required placeholder='Password'
        value={userInfo.password} onChange={handleChangeInput}/>

        <div className='row'>
          <button type='submit'>Login</button>
          <Link to='/register'>Register</Link>
        </div>
      </form>

    </div>
  );
}

export default Login;
