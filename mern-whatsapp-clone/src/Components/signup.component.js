import React, { useState } from "react";
import axios from "axios";
function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleName = (e) => {
    setUsername(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userDetails = { username: username, password: password };
    axios
      .post("http://localhost:5000/user/add", userDetails)
      .then((resp) => {
        window.sessionStorage.setItem("loggedUser", username);
        props.setShow(false);
        props.setLoggedUser(username);
      })
      .catch((err) => console.log(err));
    setUsername("");
    setPassword("");
  };
  return (
    <div className='form_body'>
      <form onSubmit={handleSubmit}>
        <input
          className='inputbox'
          type='text'
          required
          placeholder='Username'
          value={username}
          onChange={handleName}
        />
        <input
          className='inputbox'
          type='password'
          required
          placeholder='Password'
          value={password}
          onChange={handlePassword}
        />
        <input className='inputbtn' type='submit' value='SignUp' />
      </form>
    </div>
  );
}

export default SignUp;
