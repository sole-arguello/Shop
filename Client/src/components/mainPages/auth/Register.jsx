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

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    //console.log('info', userInfo);
    try {
      await axios.post("/api/user/register", { ...userInfo });
      //console.log('response', response, "user", userInfo);
      //localStorage.setItem("firstLogin", response.data.accessToken);
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
      // if (response.data.accessToken) {
      //   localStorage.setItem('accessToken', response.data.Token);
      //   window.location.href = '/';
      // }
    } catch (error) {
      console.log("error register", error);
      if (error.response && error.response.data && error.response.data.msg) {
        alert("Register error " + error.response.data.msg); // Añadí una verificación para asegurar que 'msg' esté definido
      } else {
        alert("Register failed"); // Añadí una alerta genérica en caso de que 'msg' no esté definido
      }
    }
  };
  return (
    <div className="login-page" onSubmit={handleSubmitRegister}>
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
