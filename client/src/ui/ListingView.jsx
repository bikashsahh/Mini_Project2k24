import React from "react";
import Featurette from "../components/Home/Featurette";
import { useSelector } from "react-redux";

const ListingView = () => {
  const featuretteData = useSelector((state) => state.listing.featuretteData);

  return (
    <div className="row featurette">
      {featuretteData.map((data, index) => (
        <div key={index}>
          <hr className="featurette-divider" />
          <Featurette
            heading={data.heading}
            text={data.text}
            image={data.image} // Pass image URL to Featurette component
            order={data.order}
          />
        </div>
      ))}
    </div>
  );
};

export default ListingView;
