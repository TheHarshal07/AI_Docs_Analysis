import React from "react";
import PickMeals from "../../Assets/3204121.jpg";
import ChooseMeals from "../../Assets/2888068.jpg";
import DeliveryMeals from "../../Assets/20945443.jpg";

const Work = () => {
  const workInfoData = [
    {
      image: PickMeals,
      title: "File Type and Size",
      text: "Upload files in JPEG or PNG format, Ensure each file size is within the specified limit (e.g., 5 MB)",
    },
    {
      image: ChooseMeals,
      title: "Image Quality",
      text: "Upload clear and high-quality images to ensure legibility.",
    },
    {
      image: DeliveryMeals,
      title: "Correct Files",
      text: "Verify that you are uploading the correct photo and signature files.",
    },
  ];
  return (
    <div id="work">
    <div className="work-section-wrapper">
      <div className="work-section-top">
        <p className="primary-subheading">Work</p>
        <h1 className="primary-heading">Must-Remember Insights</h1>
        <p className="primary-text">
        Autodocs is here to make your document submission process
        smooth and error-free. If you ever have questions, refer to these guidelines or reach out to our ChatBot for assistance.
        </p>
      </div>
      <div className="work-section-bottom">
        {workInfoData.map((data) => (
          <div className="work-section-info" key={data.title}>
            <div className="info-boxes-img-container">
              <img src={data.image} alt="" />
            </div>
            <h2>{data.title}</h2>
            <p>{data.text}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Work;
