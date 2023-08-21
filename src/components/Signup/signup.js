/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './signup.module.css';
import InputFile from '../InputControl/inputFiled';
import {Link,useNavigate} from 'react-router-dom';
import { useState } from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

import { Auth } from 'firebase/auth';
import { auth } from '../../firebase';

export default function login() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values, setValues] = useState({
        name:"",
        email: "",
        password : "",
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [errormsg, setError] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [SuccesMsg, setMsg] = useState("");
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

    

    const handlefunction = () =>{
        // if(values.name ? "" : setError("Please enter the name"))
        if(!values.name || !values.email || !values.password ){
            setError("Please fill all fileds");
            return;
        }
        setError("")
        console.log(values);

    // API calling to firebase

        setsubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.password).then(
    (res) =>{
        console.log(res);
        setsubmitButtonDisabled(false);
        const user = res.user;
        updateProfile(user,{
            displayName: values.name,
        } )
        setMsg("Account Created Successfully");
        navigate("/login");

    })
    .catch((err) =>{
        setsubmitButtonDisabled(false);
        setError(err.message);
        console.log("Error-",err.message);
        
        // setError("Something went wrong!");
        // return;
    });

};






  return (
    <div className={styles.container}>
        <div className={styles.innerbox}>
            <h2 className={styles.heading}>Sign up</h2>
            <InputFile label="Name" placeholder="Enter you Name"
             onChange={(event)=>
                setValues((prev) => ({...prev, name:event.target.value}))
            
            }
            
            ></InputFile>


            <InputFile label="email" placeholder="Enter you email"
            onChange={(event)=>
                setValues((prev) => ({...prev, email:event.target.value}))
            
            }
            
            ></InputFile>




            <InputFile label="Password" placeholder="Enter you password" 

            onChange={(event)=>
            setValues((prev)=>({...prev,password: event.target.value}))
            }
            
            ></InputFile>


            <div className={styles.footer}>
                <b className={styles.error}>{errormsg}</b>
                <b className={styles.success}>{SuccesMsg}</b>
                <button onClick={handlefunction}
                disabled={submitButtonDisabled}
                >Sign up</button>
                <p>Already have login? <span><Link to="/login">login</Link></span></p>
            </div>
        </div>

    
    </div>
  )
}
