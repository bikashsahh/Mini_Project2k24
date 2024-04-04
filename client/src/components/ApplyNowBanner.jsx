import React from "react";
import "../base.css";

const ApplyNowBanner = () => {
  return (
    <div className="col-md-4 box box-bg2">
      <a className="" data-bs-target="#myModal" data-bs-toggle="modal">
        <i className="fa fa-mouse-pointer"></i>
        <h4 className="title">Apply Now</h4>
        <p className="description">
          Click here for online registration and admission module of online
          programmes on offer.
        </p>
      </a>
      {/* The Modal */}
      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content">
            {/* Modal Header */}
            <div className="modal-header">
              <h4 className="modal-title">Registration for Online Programme</h4>
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
                    National Students
                  </a>
                </div>
                <div className="col internationalStudents">
                  <a
                    className="btn btn-info btnInfo float-right text"
                    target="_blank"
                    href="https://ignouforeigniop.samarth.edu.in/index.php/registration/user/register"
                  >
                    International Students
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

export default ApplyNowBanner;
