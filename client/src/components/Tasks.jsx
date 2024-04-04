import React from "react";

const Tasks = ({ image, heading, text }) => {
  return (
    <div className="col-lg-4 p-5">
      <img
        className="bd-placeholder-img rounded-circle"
        src={image}
        alt="Placeholder"
        width="140"
        height="140"
      />
      <h2 className="fw-normal">{heading}</h2>
      <p>{text}</p>
      <p>
        <a className="btn btn-secondary" href="#">
          View details »
        </a>
      </p>
    </div>
  );
};

export default Tasks;
