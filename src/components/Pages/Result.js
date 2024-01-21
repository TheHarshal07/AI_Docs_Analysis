// UserInfo.js

import React from 'react';
import style from "./Result.module.css"
import { useState } from 'react';

const UserInfo = ({ data }) => {
  const [printButtonVisible, setPrintButtonVisible] = useState(true);

  const TakePrint = (e) =>{
    
    setPrintButtonVisible(false)
    window.print()

  }
  return (
    <>
   
    <div className={style.parent}>
    <div className={style.container2}>
      <div className={style.header}>
        <div className={style.fullName}>
          <span className={style.firstName}>{data.fname}</span> 
          <span className={style.lastName}>{data.lname}</span>
          <hr className={style.hrr}></hr>
        </div>
        <div className={style.photo_container}>
        {data.modelResult.label === 'photo' && (
          <div>
            <strong>Photo:</strong>
            {data.photo && <img src={URL.createObjectURL(data.photo)} alt="User's Photo" />}
          </div>
        )}
      </div>
        <div className={style.contactInfo}>
          <span className={style.email}>Email: </span>
          <span className={style.emailVal}>{data.email}</span>
        </div>
        <div className={style.about}>
          <span className={style.desc}>DOB: {data.dob}</span>
        </div>
        <div className={style.about}>
          <span className={style.desc}>Address:{data.addr}</span>
        </div>
      </div>
      

      <div className={style.signature_container}>
        <strong>Signature:</strong>
        {data.signature && <img src={URL.createObjectURL(data.signature)} alt="User's Signature" />}
      </div>
    <div className={style.button} style={{
   
    }}>
     {printButtonVisible && (
              <button style={{ padding: 2 }} onClick={TakePrint}>
                Print
              </button>
            )}
    </div>
    </div>
    </div>

    </>
  );
};

export default UserInfo;
