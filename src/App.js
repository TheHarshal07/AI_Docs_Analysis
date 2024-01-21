import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfo from "./components/Pages/UserInfo";
import Home from "./components/Home/Home"
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import UploadImage from "./components/Pages/Uploading"
import Dashboard  from "./components/Home/dashboard";
import Details from "./components/Pages/Details"
import ResultPage from "./components/Pages/Result"
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {HashLink} from "react-router-hash-link"
import AppRoutes from "./components/Pages/AppRoutes";
import ChatBot from "./components/ChatBot/Chatting"


function App() {
  const [userName, setName] = useState();
  useEffect(() => {
    // Hooks will allow us to refer the state changes or interaction with external changes
    auth.onAuthStateChanged((user) => {
      // It is an event in firebase is listner that trigger user's authintication state changed
      if (user) {
        setName(user.displayName);
      } else setName("");
    });
  }, []);

  const [userData, setUserData] = useState(null);

  const handleFormSubmit = (data) => {
    setUserData(data);
    console.log("Form submitter",data)
  };


  return (
    <>
      {/* <Navbar Home="Home" About="About us" contact="Contact Us" > </Navbar> */}
      <div className="App">
        <BrowserRouter>
            <AppRoutes onSubmit={handleFormSubmit} userData={userData} />
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/Home" element={<Home name={userName} />}></Route>
            <Route path="/dashboard" element={<Dashboard name={ userName}/>}></Route>
            <Route path="/Uploading" exact component={UploadImage}></Route>
            <Route path="/UserInfo" exact component={UserInfo}></Route>
            <Route path="/Details" exact component={Details}></Route>
            <Route path="/chat" exact component={ChatBot}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
