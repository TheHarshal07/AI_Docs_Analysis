import React from 'react'
import styles from '../Home/navbar.module.css'
import icon from "../../images/logo.png";
import {NavDropdown} from "react-bootstrap"
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';


function TopBar(props) {
  let user = JSON.parse(localStorage.getItem("user-info"))
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

  const navigate = useNavigate();
  function logout(){
    navigate("/login")

  }

  return (
    <>
        
        <div className={styles.navbar}>
        <img className={styles.icon} src={icon} alt="icon" />
          <div className={styles.topbar}>
          <nav>
            <a href="">Home</a>
            <a href="">Service</a>
            <a href="">About us</a>
            <a href="">Contact</a>
          </nav>
        </div>
           <nav>
            <NavDropdown style={{color:'#6C63FF'}} title={userName}>
              <NavDropdown.Item onClick={logout}>logout</NavDropdown.Item>
            </NavDropdown>
          </nav>
      </div>
      <br />
      <h2 className="user">
        <span>{props.name}</span>
      </h2>
    </>
  )
}
export default TopBar;
