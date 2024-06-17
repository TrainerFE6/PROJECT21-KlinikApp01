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
              Selamat Datang Di Sahabat Sehat.
            </h5>
            <h2 className="display-1 text-white mb-md-4">
            Kesehatan Adalah Investasi Terbaik
            </h2>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
