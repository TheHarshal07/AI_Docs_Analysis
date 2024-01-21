import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserInfo.module.css";
import Inputfield from "../InputControl/input";
import imgg from "../../images/upload.png";
import countrydata from "../../Countrystate.json";
import Top from "../Home/navbar";
import {getDownloadURL ,ref, uploadBytes} from 'firebase/storage'
import {imageDb} from '../../firebase'
import {v4} from 'uuid';
import axios from "axios";
import Dashboard from "../Home/dashboard";
import Details from "./Details";
import HomeIcon from "@mui/icons-material/HomeOutlined";
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/Chatting"

const UserInfo = ({ onSubmit } ) => {
  // All state
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploadFiles, setuploadFile] = useState([]);
  const [showprogess, setShowprogess] = useState(false);
  const fileInputRef = useRef(null);
  const [photo, setImg]  = useState(null)
  const [signature, setSignature] = useState([])
  const [selectedFileName, setselectedFileName] = useState("Browse file to upload")
  const [selectedSignature, setselectedSignature] = useState("Browse file to upload")
  
  const handleinputChange = (e) => {
    const selectedFile = e.target.files[0]
    setImg(selectedFile)
    // setselectedFileName(selectedFile)
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    setImg(file)
    setselectedFileName(file.name)
  }

  const handlefileInputClick = () => {
    fileInputRef.current.click();
  };


  const uploadFile = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const filename =
      file.name.length > 12
        ? `${file.name.substring(0, 13)}... .${file.name.split(".")[1]}`
        : file.name;
    const formData = new FormData();
    formData.append("file", file);
    setFiles((prevState) => [...prevState, { name: filename, loading: 10 }]);
    setShowprogess(true);
    alert("Hello");
    axios
      .post("http://127.0.0.1:5000/upload", formData, {
        onUploadProgress: ({ loaded, total }) => {
          setFiles((prevState) => {
            const newFiles = [...prevState];
            newFiles[newFiles.length - 1].loading = Math.floor(
              (loaded / total) * 100
            );

            return newFiles;
          });
          if (loaded == total) {
            alert("error");
            const filesize =
              total < 1024
                ? `${total} KB`
                : `${(loaded / (1024 * 1024)).toFixed(2)} MB`;
            setuploadFile([...uploadFiles, { name: filename, size: filesize }]);
            setFiles([]);
            setShowprogess(false);
          }
        },
      })
      .catch(console.error);
  };

  const handleInputsignature = (e) =>{
    const selectSignature = e.target.files[0]
    setSignature(selectSignature)
    setselectedSignature(selectSignature.name)
  }

  const [CountryId, setCountryId] = useState("");
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState("");

  const handleCountry = (e) => {
    const getcountryId = e.target.value;
    setCountryId(getcountryId);

    const getCountrydata = countrydata.find(
      (country) => country.country_id === getcountryId
    ).states;
    setState(getCountrydata);
  };
  const handlestate = (e) => {
    const stateId = e.target.value;
    setStateId(stateId);
  };

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    dob: "",
    addr: ""

  });

  const submitdata = async (event) =>{
    // To upload the image on firebase
    // const imgset = ref(imageDb, `files/${v4()}`)
    // uploadBytes(imgset, photo).then(data=>{
    //   getDownloadURL(data.ref).then(val=>{
    //     setImg(val)
    //   })
    // })

    event.preventDefault();
    const  {fname,lname,mobile, email, dob, addr} = values;
    // const res = fetch(
    //   "https://major-project-2d90b-default-rtdb.firebaseio.com/userRecord.json",
    //   {

    //     method: "POST",
    //     headers: {
    //      "Content-Type" : "applictaion/json"
    //     },
    //     body: JSON.stringify({
    //       fname ,
    //       lname ,
    //       mobile ,
    //       email ,
    //       dob ,
    //       addr ,
    //       CountryId,
    //       stateId

    //     })
    //   })

    //   if (res){
    //     alert("Data is saved")
    //   }
    //   else{
    //     alert("Please fill the data")
    //   }

//  Fetching the response from the model
    console.log(photo)
    console.log(signature)
    const response = await fetch(
    "https://api-inference.huggingface.co/models/maurya22/photo_and_signature_classifier_model",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: photo,
    }
    );
    if (!response.ok) {
      console.error(`Failed to fetch the model ${response.status}.`);
      console.log("response",response)
      return;
    }
    const result = await response.json();
    console.log(result)

    // Exrtacting the label from the response
    const labelArray = result.map(item => item.label)
    console.log(labelArray[0])

    // onSubmit({ photo, signature, modelResult: { label: labelArray[0], result: result } });
    console.log("Till now runs fine")

    let keys = Object.values(labelArray)
    let firstIndex = keys[0]
    let secondIndex = keys[1]

    if (firstIndex === "photo" && secondIndex === "signature"){

      alert("Great!")
        // Pass data to onSubmit method
        onSubmit({ fname, lname,mobile,email,dob,addr, photo, signature, modelResult: { label: labelArray[0], result: result } });
  
        // Navigate to 'Result' page
        navigate('/Result');
    }
    else{
      alert("Ooahoo! Please upload correct documents in the fields ")
    }
}

  return (
    <>

<form onSubmit={submitdata}>
<div className="row">
  <div className="col-md-4">
  <Dashboard/>
  </div>
  <div className="col-md-8">
  <div className={styles.main_container}>
        <h1>User Information</h1>
        <div className="row">
          <div className="col-md-6">
            <div className={styles.container1}>
              <div className="upload-box">
                <p className="para">Upload your photo</p>
                <form onClick={() => document.querySelector(".input_field").click()}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="input_field"
                    hidden
                    onChange={handlePhotoChange}
                  ></input>
                  <div className="icon1" >
                    <img src={imgg} alt="" />
                  </div>
                    <p>Browse file to upload</p>
                </form>
                <p style={{fontSize:13, textAlign:"center", justifyContent:"space-between"}}>{selectedFileName ? `${selectedFileName}`: `Browse the file`} 
                  <HomeIcon style={{width:18, height:20}} onClick={() =>{
                     setselectedFileName("No selected file");
                      setImg(null)}} >
                        </HomeIcon></p>
              </div>
              <br />
            </div>
          </div>

          <div className="col-md-6">
            <div className={styles.container1}>
              <div className="upload-box">
                <p className="para">Upload signature</p>
                <form onClick={() => document.querySelector(".input_field_2").click()}>
                  <input
                    type="file"
                    name="signature"
                    hidden
                    className="input_field_2"
                    onChange={handleInputsignature}
                  ></input>
                  <div className="icon1">
                    <img src={imgg} alt="" />
                  </div>
                  <p>"Browse the file"</p>
                </form>
                <p style={{fontSize:13, textAlign:"center", justifyContent:"space-between"}}>{selectedFileName ? `${selectedSignature}`: `Browse the file`} 
                  <HomeIcon style={{width:18, height:20}} onClick={() =>{
                     setselectedSignature("No selected file");
                      setSignature(null)}} >
                        </HomeIcon></p>
              </div>
              <br />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <Inputfield
              label="First Name"
              placeholder="First Name"
              type="text"
              name="fname"
              value={values.fname}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, fname: event.target.value }))
              }
              required
            ></Inputfield>

            <Inputfield
              label="Address"
              placeholder="Address"
              type="textarea"
              name="addr"
              value={values.addr}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, addr: event.target.value }))
              }
              required
            ></Inputfield>

            <Inputfield
              label="Email"
              placeholder="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, email: event.target.value }))
              }
              required
            ></Inputfield>
            
            <div className="form-floating mb-3">
              <select
                className="form-control"
                onChange={(e) => handleCountry(e)}
              >
                <option value="">--select-country--</option>
                {countrydata.map((getcountry, index) => (
                  <option value={getcountry.country_id} key={index}>
                    {getcountry.country_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-6">
            <Inputfield
              label="Last Name"
              placeholder="mobile number"
              name="lname"
              value={values.lname}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, lname: event.target.value }))
              }
              required
            ></Inputfield>

            <Inputfield
              label="Birth Date"
              placeholder="Birth Date"
              type="date"
              name="dob"
              value={values.dob}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, dob: event.target.value }))
              }
              required
            ></Inputfield>
            <Inputfield
              label="Mobile no."
              placeholder="Mobile no."
              name="mobile"
              value={values.mobile}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, mobile: event.target.value }))
              }
              required
            ></Inputfield>
            <div className="form-floating mb-3">
              <select className="form-control" onChange={(e) => handlestate(e)}>
                <option value="">--select-state--</option>
                {state.map((getstate, index) => (
                  <option value={getstate.state_id} key={index}>
                    {getstate.state_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className={styles.button}>
        <button className="btn" type="submit">Submit</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <Details/>
  </div>
</div>
</form>
      <ChatBot/>
    </>
  );
}

export default UserInfo;
