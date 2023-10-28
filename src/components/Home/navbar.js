import React from 'react'
import styles from '../Home/navbar.module.css'
import icon from "../../images/logo.png";

function TopBar(props) {
  return (
    <>
        <div className='topbar'>
        <img className="icon" src={icon} alt="icon" />
        <div className="navbar">
          <nav>
            <a href="">Home</a>
            <a href="">Service</a>
            <a href="">About us</a>
            <a href="">Contact</a>
          </nav>
        </div>
      </div>
      <br />
      <h2 className="user">
        <span>{props.name}</span>
      </h2>
    </>
  )
}
export default TopBar;
