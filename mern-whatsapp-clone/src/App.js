import "./Css/App.css";
import Sidebar from "./Components/sidebar.component.js";
import Chat from "./Components/chat.component.js";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "./Axios";
import Login from "./Components/login.component.js";
import SignUp from "./Components/signup.component.js";
import Logout from "./Components/logout.component.js";
function App() {
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);
  const [logControl, setLogControl] = useState("login");
  const [loggedUser, setLoggedUser] = useState("default");
  const [showLogoutComponent, setShowLogoutComponent] = useState(false);
  useEffect(() => {
    setLoggedUser(window.sessionStorage.getItem("loggedUser") || "default");
  }, [loggedUser]);
  useEffect(() => {
    axios
      .get("/messages")
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const pusher = new Pusher("c605530d5c2f615b6493", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (data) => {
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  const logComponentShow = () => {
    if (logControl === "login") {
      return (
        <Login
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          setShow={setShow}
        />
      );
    } else {
      return (
        <SignUp
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          setShow={setShow}
        />
      );
    }
  };
  const logoutComponentControl = () => {
    if (showLogoutComponent) {
      return (
        <Logout
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
          showLogoutComponent={showLogoutComponent}
          setShowLogoutComponent={setShowLogoutComponent}
        />
      );
    }
  };
  return (
    <div className='app'>
      <div className='app_body'>
        {logoutComponentControl()}
        <div className='block' style={{ opacity: show ? "100" : "0" }}>
          <p className='log_header'>
            <span
              className={`loginbtn ${
                logControl === "login" ? "highlight" : ""
              }`}
              onClick={() => {
                setLogControl("login");
              }}
            >
              Login
            </span>
            <span
              className={`signupbtn ${
                logControl === "signup" ? "highlight" : ""
              }`}
              onClick={() => {
                setLogControl("signup");
              }}
            >
              SignUp
            </span>
          </p>
          {logComponentShow()}
        </div>
        <Sidebar
          show={show}
          setShow={setShow}
          loggedUser={loggedUser}
          showLogoutComponent={showLogoutComponent}
          setShowLogoutComponent={setShowLogoutComponent}
        />
        <Chat messages={messages} loggedUser={loggedUser} />
      </div>
    </div>
  );
}

export default App;
