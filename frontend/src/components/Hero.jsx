import React from "react";

const Hero = () => {
  return (
    <div className="container-fluid bg-primary py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row justify-content-start">
          <div className="col-lg-8 text-center text-lg-start">
            <h5
              className="d-inline-block text-primary text-uppercase border-bottom border-5"
              style={{ borderColor: "rgba(256, 256, 256, .3)" }}
            >
              Welcome To Medinova
            </h5>
            <h1 className="display-1 text-white mb-md-4">
              Best Healthcare Solution In Your City
            </h1>
            <div className="pt-2">
              <a
                href="/doctors"
                className="btn btn-light rounded-pill py-md-3 px-md-5 mx-2"
              >
                Find Doctor
              </a>
              <a
                href="/appointment"
                className="btn btn-outline-light rounded-pill py-md-3 px-md-5 mx-2"
              >
                Appointment
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
