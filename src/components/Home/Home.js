import React from 'react'
import {Link} from "react-router-dom";
import styles from './Home.module.css'
import icon from '../../images/logo.png'

export default function Home(props) {
  return (
    <>
    <div className={styles.topbar}>
    <img className={styles.icon} src={icon} alt="icon" />
      <div className={styles.navbar}>
        <nav>
          <a href="">Home</a>
          <a href="">Service</a>
          <a href="">About us</a>
          <a href="">Contact</a>
          
        </nav>
       
      </div>
     
    </div>
    <h2 className={styles.user}>Welcome <span>{props.name}</span></h2>
    </>
  )
}
