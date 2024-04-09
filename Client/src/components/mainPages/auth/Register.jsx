import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('info', userInfo);
    try {
      const response = await axios.post("/api/user/register", { ...userInfo });
      //console.log('response', response, "user", userInfo);
      localStorage.setItem("firstLogin", response.data.Token);
      window.location.href = "/";
      // if (response.data.accessToken) {
      //   localStorage.setItem('accessToken', response.data.Token);
      //   window.location.href = '/';
      // }
    } catch (error) {
      console.log("error", error);
      alert(error.response.data.message);
    }
  };
  return (
    <div className="login-page" onSubmit={handleSubmit}>
      <form>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={userInfo.name}
          onChange={handleChangeInput}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChangeInput}
        />

        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={userInfo.password}
          onChange={handleChangeInput}
        />

        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
