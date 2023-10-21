import React from 'react'
import styles from "../InputControl/inputFiled.module.css"
export default function inputFiled(props) {
  return (
    <div className={styles.container}>
      {props.label && <label>{props.label}</label>}
      <input type={props.label} {...props}/>
      
    </div>
  )
}

