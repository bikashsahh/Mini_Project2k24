// Carousel.js
import React from "react";

const Carousel = ({ id, imgURL }) => {
  return (
    <div
      key={id}
      className={id === 1 ? "carousel-item active" : "carousel-item"}
    >
      <img src={imgURL} className="d-block w-100 carousel-image" alt="..." />
    </div>
  );
};

export default Carousel;
