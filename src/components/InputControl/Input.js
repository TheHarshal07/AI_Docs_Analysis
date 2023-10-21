import React from "react";
import styles from "../InputControl/input.module.css";
export default function input(props) {
  return (
    <div className={styles.InputContent}>

        <div className="form-floating mb-3">

        <input type={props.type} class="form-control" {...props} />
        
        {props.label && <label>{props.label}</label>}

        </div>
    </div>
  );
}
