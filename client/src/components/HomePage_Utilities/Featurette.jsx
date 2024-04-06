// Featurette.jsx
import React from "react";

const Featurette = ({ heading, text, image, order }) => {
  return (
    <div className="row featurette">
      <div className={`col-md-7 ${order === "second" ? "order-md-2" : ""}`}>
        <h2 className="featurette-heading fw-normal lh-1">{heading}</h2>
        <p className="lead">{text}</p>
      </div>
      <div className={`col-md-5 ${order === "second" ? "order-md-1" : ""}`}>
        <img
          className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto"
          src={image}
          alt="Featurette Image"
          width="500"
          height="500"
        />
      </div>
    </div>
  );
};

export default Featurette;
