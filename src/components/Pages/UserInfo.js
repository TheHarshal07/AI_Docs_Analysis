import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserInfo.module.css";
import Inputfield from "../InputControl/input";
import imgg from "../../images/upload.png";
import countrydata from "../../Countrystate.json";
import Dashboard from "../Home/dashboard";
import Details from "./Details";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate } from "react-router-dom";
import ChatBot from "../ChatBot/Chatting"
import FAQ from "../LandingPage/Faq"

const UserInfo = ({ onSubmit } ) => {
  // All state
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [photo, setImg]  = useState(null)
  const [signature, setSignature] = useState(null)
  const [selectedFileName, setselectedFileName] = useState("")
  const [selectedSignature, setselectedSignature] = useState("")
  const [ ErrorFile, setErrorFile] = useState("")

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;
      const extension = fileName.split('.').pop().toLowerCase();
      if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
        setselectedFileName(fileName);
        setImg(file);
      } else {
        alert('Please upload a JPEG or PNG file.');
      }
    }
  }
  const handleInputsignature = (e) =>{
    const file = e.target.files[0];
  if (file) {
    const fileName = file.name;
    const extension = fileName.split('.').pop().toLowerCase();
    if (extension === 'jpeg' || extension === 'jpg' || extension === 'png') {
      setselectedSignature(fileName);
      setSignature(file);
    } else {
      alert('Please upload a JPEG or PNG file.');
    }
  }
  }

  const [CountryId, setCountryId] = useState("");
  const [state, setState] = useState([]);
  const [stateId, setStateId] = useState("");
  const [ Error, setError] = useState("Only accpet jpeg, png, jpg");
  const [ Error2, setError2] = useState("");


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
    addr: "", 
    sex: "",
    course:""

  });

  const [loading, setLoading] = useState(false);

  const handleGenderChange = (e) => {
    // Update gender state
    setValues((prev) => ({ ...prev, sex: e.target.value }));
  };

  const handleCourseChange = (e) => {
    // Update course state
    setValues((prev) => ({ ...prev, course: e.target.value }));
  };
  console.log(values.sex)

  const submitdata = async (event) =>{
    // To upload the image on firebase
    // const imgset = ref(imageDb, `files/${v4()}`)
    // uploadBytes(imgset, photo).then(data=>{
    //   getDownloadURL(data.ref).then(val=>{
    //     setImg(val)
    //   })
    // })

    event.preventDefault();
    console.log(!photo && !signature)
    if (!photo && !signature) {
      alert("Please upload both photo and signature files.");
      return;
    } else if (!photo) {
      alert("Please upload the photo file.");
      return;
    } else if (!signature) {
      alert("Please upload the signature file.");
      return;
    }

    
    if (values.sex === '' || values.sex === 'select' || values.course === '' || values.course === 'select') {
      alert("Please select the valid option")
      return;
    }

    setLoading(true);
    const  {fname,lname,mobile, email, dob, addr,sex,course} = values;
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
      // Show popup message when API call fails
      alert("Something went wrong. Please try again later.");
      return;
    }

    setLoading(false);

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
    
    if (selectedFileName === selectedSignature){
      alert(" Please select the different photo and signature")
    }
    else{
      if ((firstIndex === "photo" && secondIndex === "signature") || (firstIndex === "signature" && secondIndex === "photo")){
  
        alert("Great!")
          // Pass data to onSubmit method
          onSubmit({ fname, lname,mobile,email,dob,addr, photo, signature, sex,course, modelResult: { label: labelArray[0], result: result } });
    
          // Navigate to 'Result' page
          navigate('/Result');
      }
      else{
        alert("Ooahoo! Please upload correct documents in the fields ")
      }
    }
}
// For date picker 
const currentDate = new Date();
currentDate.setDate(currentDate.getDate() - 2); // Subtract 2 days
const maxDate = currentDate.toISOString().split('T')[0];

// For Mobile number
const mobileNumberRegex = /^\d{0,10}$/;

  return (
    <>

<form onSubmit={submitdata}>

{loading && <div className={styles.loading_spinner}></div>}

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
                <p className={styles.para}><strong>Upload photo</strong></p>
                <form onClick={() => document.querySelector(".input_field").click()}>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="input_field"
                    hidden
                    onChange={handlePhotoChange}
                    required
                  ></input>
                  <div className="icon1" >
                    <img src={imgg} alt="" />
                  </div>
                    <p>Browse file to upload</p>
                </form>
                <p style={{fontSize:13, textAlign:"center", justifyContent:"space-between"}}>{selectedFileName ? `${selectedFileName}`: `Not selected file    `} 
                  <DeleteOutlineIcon style={{width:18, height:20, justifyContent:"space-between"}} onClick={() =>{
                     setselectedFileName("Not selected file");
                      setImg(null)}} >
                        </DeleteOutlineIcon></p>
                        <p className={styles.error}>{Error}</p>
              </div>
              <br />
            </div>
          </div>

          <div className="col-md-6">
            <div className={styles.container1}>
              <div className="upload-box">
                <p className={styles.para}><strong>Upload Signature</strong></p>
                <form onClick={() => document.querySelector(".input_field_2").click()}>
                  <input
                    type="file"
                    name="signature"
                    hidden
                    className="input_field_2"
                    onChange={handleInputsignature}
                    required
                  ></input>
                  <div className="icon1">
                    <img src={imgg} alt="" />
                  </div>
                  <p>Browse file to upload</p>
                </form>
                <p style={{fontSize:13, textAlign:"center", justifyContent:"space-between"}}>{selectedFileName ? `${selectedSignature}`: `Not selected file   `} 
                  <DeleteOutlineIcon style={{width:18, height:20}} onClick={() =>{
                     setselectedSignature("Not selected file");
                      setSignature(null)}} >
                        </DeleteOutlineIcon></p>
                <p className={styles.error}>{Error}</p>
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
              label="Birth Date"
              placeholder="Birth Date"
              type="date"
              name="addr"
              value={values.dob}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, dob: event.target.value }))
              }
              max={maxDate}
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

            

             <select
              className={styles.gnd}
              label="Gender"
              placeholder="gender"
              type="text"
              name="gnd"
              value={values.gender}
              onChange={handleGenderChange}
              required
            > <option value="select">select-</option>
              <option value="Male">male</option>
              <option value="female">female</option>
              <option value="Other">Other</option>
            </select>
            <br />
            <br />
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
              placeholder="last name"
              type="text"
              name="lname"
              value={values.lname}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, lname: event.target.value }))
              }
              required
            ></Inputfield>

            <Inputfield
              label="Address"
              placeholder="Address"
              type="textarea"
              name="dob"
              value={values.addr}
              onChange={(event) =>
                setValues((prev) => ({ ...prev, addr: event.target.value }))
              }
              required
            ></Inputfield>
            {Error2 && <div className={styles.setErr}> {Error2} </div>}
            <Inputfield
              label="Mobile no."
              placeholder="Mobile no."
              type="tel"
              name="mobile"
              value={values.mobile}
              onChange={(event) => {
                const newValue = event.target.value;
                // Check if the input matches the regex pattern
                if (newValue === '' || mobileNumberRegex.test(newValue)) {
                  // If it matches, update the state
                  setValues((prev) => ({ ...prev, mobile: event.target.value }));
                  setError2(" ")
                }
                else{
                  setError2('Mobile number must be 10 digits');
                }
              }}
              required
            ></Inputfield>

<select
              className={styles.crs}
              label="Course"
              type="text"
              name="fname"
              value={values.cou}
              onChange={handleCourseChange}
              required
            > <option value="select">Select the course-</option>
              <option value="B.E/B.Tech">B.E/B.Tech</option>              
              <option value="BSC">BSC</option>              
              <option value="B.Com">B.Com</option>              

            </select>
            <br />
            <br />
            
        
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
      <br />
      <br />
      <br />
  </div>
</div>
</form>
<div className={styles.faq}>
      <FAQ/>
</div>
      <ChatBot/>
    </>
  );
}

export default UserInfo;
