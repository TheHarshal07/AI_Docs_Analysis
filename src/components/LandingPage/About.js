import React from "react";
import AboutBackgroundImage from "../../Assets/2672292.jpg";
import { BsFillPlayCircleFill } from "react-icons/bs";

const About = () => {
  return (
    <>
    <div id="About">
      <div className="about-section-container">
        <div className="about-section-image-container">
          <img src={AboutBackgroundImage} alt="" />
        </div>
        <div className="about-section-text-container">
          <p className="primary-subheading">About</p>
          <h1 className="primary-heading">
          Our Story and Objective
          </h1>
          <p className="primary-text">
          Our story is a journey of commitment and purpose. Founded with a mission to simplify and enhance your experiences, we take pride in providing a seamless platform for you.
          </p>
          <p className="primary-text">
          Explore our world as we strive to make every interaction meaningful and every upload, a reflection of your precision – from photos to signatures. Welcome to a space where simplicity meets accuracy
          </p>
          <div className="about-buttons-container">
            <button className="secondary-button">Learn More</button>
            <button className="watch-video-button">
              {/* <BsFillPlayCircleFill /> Watch Video */}
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
