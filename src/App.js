import logo from "./logo.svg";
import "./App.css";
// import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserInfo from "./components/Pages/UserInfo";
import Home from "./components/Home/Home"
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import UploadImage from "./components/Pages/Uploadimg"
import Dashboard  from "./components/Home/dashboard";
import Details from "./components/Pages/Details"
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import {HashLink} from "react-router-hash-link"


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
  return (
    <>
      {/* <Navbar Home="Home" About="About us" contact="Contact Us" > </Navbar> */}
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/UserInfo" element={<UserInfo name={userName} />}></Route>
            <Route path="/Home" element={<Home name={userName} />}></Route>
            <Route path="/dashboard" element={<Dashboard name={ userName}/>}></Route>
            <Route path="/Uploadimg" exact component={UploadImage}></Route>
            <Route path="/UserInfo" exact component={UserInfo}></Route>
            <Route path="/Details" exact component={Details}></Route>

          </Routes>
          
          {/* <Dashboard>
          <Routes>
              <Route path="/dashboard" element={<Dashboard name={ userName}/>}></Route>
              <Route path="/" element={<Login />}></Route>
              <Route path="/uploadImage" element={<UploadImage/>}></Route>
          </Routes>
            </Dashboard> */}
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
