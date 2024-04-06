import React from "react";
import "../base.css"; // Corrected path for base.css

const IgnouRegistrationBanner = () => {
  return (
    <div className="col-md-4 box" style={{ backgroundColor: "#B39DDB" }}>
      <a className="" data-bs-target="#ignouModal" data-bs-toggle="modal">
        <i className="fa fa-graduation-cap"></i>
        <h4 className="title">IGNOU Registration</h4>
        <p className="description">
          Register for new admission or re-registration at IGNOU.
        </p>
      </a>
      {/* The Modal */}
      <div className="modal" id="ignouModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">IGNOU Registration</h4>
            </div>
            {/* Modal body */}
            <div className="modal-body">
              <div className="row">
                <div className="col nationalStudents">
                  <a
                    className="btn btn-primary btnBlue float-left text"
                    target="_blank"
                    href="https://ignouiop.samarth.edu.in/index.php/registration/user/register"
                  >
                    New Admission
                  </a>
                </div>
                <div className="col internationalStudents">
                  <a
                    className="btn btn-info btnInfo float-right text"
                    target="_blank"
                    href="https://onlinerr.ignou.ac.in/"
                  >
                    Re-Registration
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IgnouRegistrationBanner;
