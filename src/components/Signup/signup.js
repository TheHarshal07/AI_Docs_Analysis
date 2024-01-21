/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import styles from './signup.module.css';
import InputFile from '../InputControl/inputFiled';
import {Link,useNavigate} from 'react-router-dom';
import logo2 from '../../images/logo.png';
import { useState } from 'react';
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth';

import { signInWithPopup } from "firebase/auth"
import { auth, provider } from '../../firebase';
import TopBar from "../Home/navbar"

export default function login(props) {
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [values1, setValues1] = useState("");
    const googleAuth = () =>{
       
        signInWithPopup(auth,provider).then((data)=>{
            setValues1(data.user.email)
            localStorage.setItem("email",data.user.email)
            navigate("/Home")
        
        })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(()=>{
        setValues1(localStorage.getItem.email)
    })

    

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
    });

};






  return (
    <>
     <div>
      <TopBar icon={props.icon} />
     
    </div>
    <div className={styles.body}>
    <div className="row">
    
        {/* <img className={styles.logo} src={logo2} alt="logo" /> */}
        <div className="col-md-8">
            <div className={styles.font1}>
                <h2 className="auto-type1"><span class="auto">Automate document correction system for Admit cards </span></h2>
            </div>
            <div className={styles.btn}>
            <button className={styles.know_more}>Know more</button>
            <button className={styles.get_started}>Get Started</button>
        </div>
        </div>
        <div className="col-md-4">
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
                        <p>Already have an account? <span><Link to="/login">login</Link></span></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}
