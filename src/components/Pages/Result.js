  

import React from "react";
import { useState,useEffect } from "react";
import style from "./Result.module.css";

const UserInfo = ({ data }) => {
  const [printButtonVisible, setPrintButtonVisible] = useState(true);
  const [enrollmentNo, setEnrollmentNo] = useState("");

  useEffect(() => {
    // Generate a random enrollment number when the component mounts
    generateEnrollmentNo();
  }, []);

  const generateEnrollmentNo = () => {
    // Generate a random number between 100000 and 999999
    const randomNo = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    setEnrollmentNo(randomNo.toString()); // Convert to string
  };

  const TakePrint = (e) => {
    // Hide the print button
    const printButton = document.getElementById("printButton");
    printButton.style.display = "none";
    // Initiate the print function
    window.print();
    printButton.style.display = "block";
  };



  

  return (
    <>
      <section>
  <div className="container">
    <div className="admit_card border-">
      <div className="BoxA border- padding mar_bot">
        <div className="row">
          <div className="col-sm-4">
            <h4><b>Mumbai University</b></h4>
            <p>Vidya Nagari, Kalina, Santacruz East, Mumbai, Maharashtra 400098 <br /> Maharashtra, INDIA</p>
          </div>
          <div className="col-sm-4">
            <h4><b>Admit Card</b></h4>
            <p>{data.course} - 2019</p>
          </div>
        </div>
      </div>
      <div className="BoxC border- padding mar_bot">
        <div className="row">
          <div className="col-sm-6">
            <h5>Enrollment No :{enrollmentNo}</h5>
          </div>
        </div>
      </div>
      <div className="BoxD border- padding mar_bot">
        <div className="row">
          <div className="col-sm-10">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td><b>Student Name: </b> {data.fname} {data.lname}</td>
                  <td><b>Gender: </b> {data.sex}</td>
                </tr>
                <tr>
                  <td><b>Course: </b>{data.course}</td>
                  <td><b>DOB: </b> {data.dob}</td>
                </tr>
          
                <tr>
                  <td colSpan="2"><b>Address: </b> {data.addr}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-2 txt-center">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row txt-center">
                    <strong>{data.modelResult.label === "photo" ? "Photo:" : "Photo:"}</strong>
                    {data.modelResult.label === "photo"
                      ? data.photo && (
                        <img src={URL.createObjectURL(data.photo)} alt="User's Photo" />
                      )
                      : data.signature && (
                        <img src={URL.createObjectURL(data.signature)} alt="User's Signature" />
                      )}
                  </th>
                </tr>
                <tr>
                  <th scope="row txt-center">
                    <strong>{data.modelResult.label === 'photo' ? 'Signature:' : 'Signature:'}</strong>
                    {data.modelResult.label === 'photo' ? (
                      data.signature && <img src={URL.createObjectURL(data.signature)} alt="User's Signature" />
                    ) : (
                      data.photo && <img src={URL.createObjectURL(data.photo)} alt="User's Photo" />
                    )}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="BoxE border- padding mar-bot txt-center">
        <div className="row">
          <div className="col-sm-12">
            <h5>EXAMINATION VENUE</h5>
            <p>NPlot No. 46, near MSEB Sub Station, Sector-5, Kharghar, Navi Mumbai, Maharashtra 410210 <br /> Maharashtra, INDIA</p>
          </div>
        </div>
      </div>
      <div className="BoxF border- padding mar-bot txt-center">
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Subject/Paper</th>
                  <th>Exam Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Science</td>
                  <td>15 April 2024</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mathematics</td>
                  <td>20 April 2024</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Physics</td>
                  <td>23 April 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <footer className="txt-center">
        <p>*** Mumbai University ***</p>
      </footer>
    </div>
  </div>
</section>
<div className="prnt">
  <button onClick={TakePrint} id="printButton" >Print</button>
</div>

    </>
  );
};

export default UserInfo;
