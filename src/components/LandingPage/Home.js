import React from "react";
import BannerBackground from "../../Assets/Home2.png";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import TopBar from "../Home/navbar";
import About from "./About"
import Contact from "./Contact"
import Testimonial from "./Testimonial";
import Work from "./Work";
import Footer from "./Footer";
import ChatBot from "../ChatBot/Chatting"


const Home = (props) => {
  const navigate = useNavigate()
  const handleInput = () =>{
    navigate("/UserInfo")
  }
  return (
    <>
    <div>
      <TopBar icon={props.icon} />
      <br />
      <h2 className="user">
        Welcome <span>{props.name}</span>
      </h2>
    </div>
    <br />

    <div id="Home" >
    <div className="home-container" >
  
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Seamless Submissions with Precision - Upload Photo and Signature
          </h1>
          <p className="primary-text">
          Ensure error-free form submissions by accurately uploading your photo and signature for a seamless experience.
          </p>
          <button className="secondary-button" onClick={handleInput}>
            Get's started <FiArrowRight />{" "}
          </button>
        </div>
        <div className="home-image-section">
          {/* <img src={BannerImage} alt="" /> */}
        </div>
      </div>
    </div>
    </div>
    <About/>
    <Work/>
    <Testimonial/>
    <Contact/>
    <Footer/>
    < ChatBot/>
    </>
  );
};

export default Home;
