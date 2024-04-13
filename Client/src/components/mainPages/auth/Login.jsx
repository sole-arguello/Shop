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
      console.log('user info', userInfo);
      const res = await axios.post('/api/user/login', {...userInfo});
      console.log('handle submit response', res.data)
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';

    } catch (error) {
      console.log('error submit loguin', error);
      alert("Login failed", error.response.data.message);
    }

  }
  return (
    <div className='login-page'>
      <form  onSubmit={handleSubmitLogin}>
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
