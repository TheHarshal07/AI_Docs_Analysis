/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import React from "react";
import styles from "./login.module.css";
import InputFile from "../InputControl/inputFiled";
import logo1 from "../../images/logo.png";
import Gicon from "../../images/google.png"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";

export default function login() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [values2, setValues2] = useState();
  const googleAuth= () =>{
    signInWithPopup(auth,provider).then((data)=>{
      setValues2(data.user.email);
      localStorage.setItem("email", data.user.email)
      navigate("/Home")
    })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [errormsg, setError] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [SuccesMsg, setMsg] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [submitButtonDisabled, setsubmitButtonDisabled] = useState(false);

  // var typed = new Typed(".auto-type",{
  //     strings:["HEllo Harshal"],
  //     typespeed: 80,
  //     backspeed: 70,
  //     loop: true

  // })

  const handlefunction = () => {
    // if(values.name ? "" : setError("Please enter the name"))
    if (!values.email || !values.password) {
      setError("Please fill all fileds");
      return;
    }
    setError("");
    console.log(values);

    // API calling to firebase

    setsubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        console.log(res);
        setsubmitButtonDisabled(false);
        setMsg("Login successfully");
        navigate("/Home");
      })
      .catch((err) => {
        setsubmitButtonDisabled(false);
        setError(err.message);
        console.log("Error-", err.message);

        // setError("Something went wrong!");
        // return;
      });
  };

  return (
    <div className="row">
      <img className={styles.logo} src={logo1} alt="logo" />
      <div className="col-md-8">
        <div className={styles.font}>
          <h2 class="auto-type">
            <span class="auto">Automate document correction</span> system for
            Admit cards
          </h2>
        </div>
      </div>
      <div className="col-md-4">
        <div className={styles.container}>
          <div className={styles.innerbox}>
            <h2 className={styles.heading}>Login</h2>

            <InputFile
              label="email"
              placeholder="Enter you email"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            ></InputFile>

            <InputFile
              label="Password"
              placeholder="Enter you password"
              onChange={(event) =>
                setValues((prev) => ({ ...prev, password: event.target.value }))
              }
              required
            ></InputFile>

            <div className={styles.footer}>
              <b className={styles.error}>{errormsg}</b>
              <b className={styles.success}>{SuccesMsg}</b>
              <button onClick={handlefunction} disabled={submitButtonDisabled}>
                Login
              </button>
              <p>
                New user?{" "}
                <span>
                  <Link to="/signup">Signup</Link>
                </span>
              </p>
            </div>
            <div className={styles.googlebtn}>
              <div className={styles.icons}>
                
                <button onClick={googleAuth} type="button">Sign with google
                <img src={Gicon} alt="Google" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
