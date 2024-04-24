import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import ApplyNowBanner from "../Students/ApplyNowBanner";
import IgnouRegistrationBanner from "../Students/Registration";
import { Box, Stack } from "@mui/material";
import AnnouncementBanner from "../Common/AnnouncementBanner";

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselData = [
    { id: 1, imgURL: "/clg.avif" },
    { id: 2, imgURL: "/clg2.avif" },
    { id: 3, imgURL: "/img1.webp" },
    { id: 4, imgURL: "/img2.webp" },
    { id: 5, imgURL: "/img1.webp" },
    { id: 6, imgURL: "/img2.webp" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
    }, 500);

    return () => clearInterval(interval);
  }, [carouselData.length]);

  return (
    <div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          {carouselData.map((Data, index) => (
            <Carousel
              key={Data.id}
              id={Data.id}
              imgURL={Data.imgURL}
              active={index === currentIndex}
            />
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

      <Stack
        direction="row"
        className="container service"
        justifyContent="space-evenly"
      >
        <Stack
          direction="row"
          alignContent="center"
          justifyContent="space-around"
          spacing={4}
          sx={{ flexWrap: "wrap" }}
        >
          <Box sx={{ flex: 1, maxWidth: "33.33%", minWidth: "300px" }}>
            <ApplyNowBanner />
          </Box>
          <Box sx={{ flex: 1, maxWidth: "33.33%", minWidth: "300px" }}>
            <IgnouRegistrationBanner />
          </Box>
          <Box sx={{ flex: 1, maxWidth: "33.33%", minWidth: "300px" }}>
            <AnnouncementBanner />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default Banner;
