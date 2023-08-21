import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as  Router, Route, Routes  } from 'react-router-dom';
import Home from './components/Home/Home';
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import { useEffect, useState } from 'react';
import { auth } from './firebase';

function App() {
 const [userName, setName] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user)=>{
      if (user){
        setName(user.displayName);
      }
      else setName("");
    })

  },[])
  return (
  <>
  {/* <Navbar Home="Home" About="About us" contact="Contact Us" > </Navbar> */}
  <div className="App">
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Home name={userName} />}></Route>
      </Routes>
    </Router>
  </div>

  
  </>
  );
}

export default App;
