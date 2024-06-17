import React from 'react';
import testimonial1 from '../assets/images/testimonial-1.jpg';
import testimonial2 from '../assets/images/testimonial-2.jpg'; 
import testimonial3 from '../assets/images/testimonial-3.jpg'; 

const Testimonial = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5">
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Testimonial</h5>
          <h1 className="display-4">Apa Kata Pasien Kami</h1>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-md-4">
                <div className="card testimonial-item text-center border-0">
                  <div className="card-body">
                    <img className="img-fluid rounded-circle mx-auto" src={testimonial1} alt="Pasien 1" />
                    <div className="position-relative mt-3">
                      <i className="fa fa-quote-left fa-2x text-primary"></i>
                    </div>
                    <p className="fs-4 fw-normal mt-4">"Saya memiliki pengalaman yang sangat baik di klinik ini. Stafnya profesional dan fasilitasnya sangat baik. Saya merasa dirawat dengan baik sepanjang perawatan saya."</p>
                    <hr className="w-25 mx-auto" />
                    <h3>Anna Frastie</h3>
                    <h6 className="fw-normal text-primary mb-0">Testimonial 1</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card testimonial-item text-center border-0">
                  <div className="card-body">
                    <img className="img-fluid rounded-circle mx-auto" src={testimonial2} alt="Pasien 2" />
                    <div className="position-relative mt-3">
                      <i className="fa fa-quote-left fa-2x text-primary"></i>
                    </div>
                    <p className="fs-4 fw-normal mt-4">"Klinik ini memberikan pelayanan yang luar biasa. Dokter-dokternya sangat berpengetahuan dan meluangkan waktu untuk menjelaskan setiap prosedur. Sangat merekomendasikan kepada siapa saja yang membutuhkan perawatan kesehatan berkualitas."</p>
                    <hr className="w-25 mx-auto" />
                    <h3>Jane Smith</h3>
                    <h6 className="fw-normal text-primary mb-0">Testimonial 2</h6>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card testimonial-item text-center border-0">
                  <div className="card-body">
                    <img className="img-fluid rounded-circle mx-auto" src={testimonial3} alt="Pasien 3" />
                    <div className="position-relative mt-3">
                      <i className="fa fa-quote-left fa-2x text-primary"></i>
                    </div>
                    <p className="fs-4 fw-normal mt-4">"Dari saat saya masuk, saya tahu saya berada di tangan yang baik. Lingkungan klinik sangat ramah dan perawatan yang saya terima sangat luar biasa."</p>
                    <hr className="w-25 mx-auto" />
                    <h3>Emily Johnson</h3>
                    <h6 className="fw-normal text-primary mb-0">Testimonial 3</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
