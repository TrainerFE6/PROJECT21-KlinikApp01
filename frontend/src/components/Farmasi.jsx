import React from 'react';

// Import images
import prescriptionImg from '../assets/images/prescription.jpg';
import vitaminsImg from '../assets/images/vitamins.jpg';
import vaccinationImg from '../assets/images/vaccination.jpg';
import topicalImg from '../assets/images/topical.jpg';
import heartImg from '../assets/images/heart.jpg';
import antibioticsImg from '../assets/images/antibiotics.jpg';

const Farmasi = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Farmasi</h5>
          <h1 className="display-4">Kami menyediakan berbagai obat obatan sebagai berikut</h1>
        </div>
        <div className="row g-5">
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={prescriptionImg} alt="Obat Resep" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Obat Resep</h4>
              <p className="m-0">Kami menyediakan berbagai obat resep yang dihasilkan dari bahan berkualitas tinggi untuk memastikan kesehatan optimal Anda.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={vitaminsImg} alt="Suplemen Vitamin" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Suplemen Vitamin</h4>
              <p className="m-0">Suplemen vitamin kami membantu memenuhi kebutuhan nutrisi harian Anda dan meningkatkan kesehatan secara keseluruhan.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={vaccinationImg} alt="Vaksinasi" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Vaksinasi</h4>
              <p className="m-0">Kami menawarkan berbagai vaksin untuk melindungi Anda dari berbagai penyakit yang dapat dicegah.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={topicalImg} alt="Obat Topikal" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Obat Topikal</h4>
              <p className="m-0">Kami menyediakan salep dan krim untuk perawatan kondisi kulit seperti luka bakar, iritasi, dan lainnya.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={heartImg} alt="Obat Jantung" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Obat Jantung</h4>
              <p className="m-0">Obat-obatan kami dirancang untuk mendukung kesehatan jantung Anda dan mengelola kondisi kardiovaskular.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
              <img src={antibioticsImg} alt="Antibiotik" className="mb-4" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              <h4 className="mb-3">Antibiotik</h4>
              <p className="m-0">Antibiotik berkualitas tinggi kami membantu melawan infeksi bakteri dan mempercepat proses penyembuhan.</p>
              <a className="btn btn-lg btn-primary rounded-pill" href="/">
                <i className="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Farmasi;
