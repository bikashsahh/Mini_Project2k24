import React from "react";
import Carousel from "./Carousel";
import ApplyNowBanner from "../ApplyNowBanner";
import IgnouRegistrationBanner from "../Registration";

const Banner = () => {
  const carouselData = [
    { id: 1, imgURL: "/img1.webp" },
    { id: 2, imgURL: "/img2.webp" },
    { id: 3, imgURL: "/img1.webp" },
    { id: 4, imgURL: "/img2.webp" },
    { id: 5, imgURL: "/img1.webp" },
    { id: 6, imgURL: "/img2.webp" },
  ];

  return (
    <div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {carouselData.map((Data) => (
            <Carousel key={Data.id} id={Data.id} imgURL={Data.imgURL} />
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* apply banner */}
      <div className="container service">
        <div className="row">
          <ApplyNowBanner></ApplyNowBanner>
          <IgnouRegistrationBanner></IgnouRegistrationBanner>
          <ApplyNowBanner></ApplyNowBanner>
        </div>
      </div>
    </div>
  );
};
export default Banner;
