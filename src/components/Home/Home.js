import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import icon from "../../images/logo.png";
import Inputfield from "../InputControl/Input";
import imgg from "../../images/upload.png";

import axios from "axios";

export default function Home(props) {
  const [files, setFiles] = useState([]);
  const [uploadFiles, setuploadFile] = useState([]);
  const [showprogess, setShowprogess] = useState(false);
  const fileInputRef = useRef(null);

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

    axios.post("http://127.0.0.1:5000/upload", formData, {
        onUploadProgress: ({ loaded, total }) => {
        
          setFiles((prevState) => {
            const newFiles = [...prevState];
            newFiles[newFiles.length - 1].loading = Math.floor(
              (loaded / total) * 100
            );
            
            
            return newFiles;
          });
          if (loaded == total) {
            alert("error")
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

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    mobile: "",
  });

  return (
    <>
      <div className={styles.topbar}>
        <img className={styles.icon} src={icon} alt="icon" />
        <div className={styles.navbar}>
          <nav>
            <a href="">Home</a>
            <a href="">Service</a>
            <a href="">About us</a>
            <a href="">Contact</a>
          </nav>
        </div>
      </div>
      <br />

      <h2 className={styles.user}>
        Welcome <span>{props.name}</span>
      </h2>

      <div className={styles.main_container}>
        <h1>User Information</h1>
        <div className={styles.container1}>
          <div className="upload-box">
            <p className="para">Upload your photo</p>
            <form action="">
              <input
                className={styles.file_input}
                type="file"
                name="file"
                hidden
                ref={fileInputRef}
                onChange={uploadFile}
              ></input>
              {/* <button  onClick={() => props.uploadFile()}>Submit</button> */}
              <div className="icon" onClick={handlefileInputClick}>
                <img src={imgg} alt="" />
              </div>
              <p>Browse file to uplaod</p>
            </form>

            {showprogess && (
              <section className="loading-area">
                {files.map((file, index) => (
                  <li className="row" key={index}>
                    <div className="content">
                      <i className="fas fa-file-alt"></i>
                      <div className="details">
                        <span className="name">{`${file.name} - uploading`}</span>
                        <span className="percent" max="100">{`${file.loading}%`}</span>
                        <div className="loading-bar">
                          <div
                            className="loading"
                            style={{ width: `${file.loading}` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </section>
            )}

            <section className="uploaded-area">
              {uploadFiles.map((file, index) => (
                <li className="row" key={index}>
                  <div className="content upload">
                    <i className="fas fa-file-alt"></i>
                    <div className="details">
                      <span className="name">{file.name}</span>
                      <span className="size">{file.size}</span>
                    </div>
                    <i className="fas fa-check"></i>
                  </div>
                </li>
              ))}
            </section>
          </div>
          <br />

          <Inputfield
            label="First Name"
            placeholder="First name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, fname: event.target.values }))
            }
            required
          ></Inputfield>

          <Inputfield
            label="Last Name"
            placeholder="Last name"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, lname: event.target.values }))
            }
            required
          ></Inputfield>

          <Inputfield
            label="Mobile no."
            placeholder="mobile number"
            onChange={(event) =>
              setValues((prev) => ({ ...prev, mobile: event.target.values }))
            }
            required
          ></Inputfield>
        </div>
      </div>
    </>
  );
}
