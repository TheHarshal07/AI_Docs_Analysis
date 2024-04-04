// FAQ.js

import React, { useState } from "react";


const FAQ = () => {
  const faqData = [
    {
      question: "What is the purpose of this project?",
      answer: "The objective of this project is to ensure the accurate placement of photos in admit cards or scholarship applications, thereby reducing errors caused by document misuploads, especially common among economically disadvantaged candidates."
    },
    {
      question: "Why are faulty admit cards a concern?",
      answer: "Faulty admit cards can lead to administrative complications and inconvenience for both students and educational institutions. They may result in students being denied entry to examinations or facing challenges in accessing essential academic resources."
    },
    {
      question: "What are the common issues with admit cards? ",
      answer: "Common issues with admit cards include incorrect or missing photographs, mismatched signatures, and other document misuploads. These errors can occur due to various reasons, such as technical glitches, misunderstanding of requirements, or lack of access to proper documentation."
    }
    // Add more questions and answers as needed
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" id="faq">
      <h1>Frequently Asked Questions</h1>
      <br />
      <div className="accordion">
        {faqData.map((item, index) => (
          <div className="accordion-item" key={index}>
            <button
              className="accordion-button"
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </button>
            <div
              className={`accordion-content ${
                activeIndex === index ? "show" : ""
              }`}
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
