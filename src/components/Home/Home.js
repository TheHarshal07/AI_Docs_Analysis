import React from 'react'
import styles from './Home.module.css'
import TopBar from '../Home/navbar'
import Homepic from '../../images/Home2.png'
import { useNavigate } from 'react-router-dom'
import ChatBot from "../ChatBot/Chatting"

export default function Home(props) {
  const navigate = useNavigate();
  const handleroute=() =>{
    navigate('/UserInfo')
  }
  
  return (
    <>
    <div>
      <TopBar icon={props.icon} />
      <br />
      <h2 className="user">
        Welcome <span>{props.name}</span>
      </h2>
    </div>
    <br />

    <div className={styles.homesection}>
      <div className={styles.content_box}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <br />
            Welcome to 
            <br />
            <span className={styles.title_short}> AutoDocs</span>
          </h1>
          <p className={styles.description}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
             Cupiditate facere fuga rerum reprehenderit repellendus recusandae possimus, beatae modi ducimus corrupti a magnam odit voluptates? Excepturi ipsum nam earum ducimus modi!
           
          </p>
        </div>
        <div className={styles.button}>
        <button className="btn" onClick={handleroute}>Let's get started</button>
        </div>
      </div> 
      <picture>
        <img src={Homepic} alt="" />
      </picture>
      
    </div>
    {/* <ChatBot></ChatBot> */}

    </>
  )
}
