import React from "react"
import styles from "../InputControl/inputFiled.module.css"
export default function input(props){
    return(
        <div className={styles.InputContent}>
            {/* This for the label */}
            {props.label && <labe>{props.label}</labe> } 

            {/* This for the input field  */}
            <input type={props.label} {...props} />
        </div>
    )
}
