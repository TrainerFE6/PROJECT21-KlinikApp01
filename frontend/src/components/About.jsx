import React from 'react';

// Import Images
import FirstImage from '../assets/images/about.jpg';

const About = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="row gx-5">
          <div className="col-lg-5 mb-5 mb-lg-0" style={{ minHeight: '500px' }}>
            <div className="position-relative h-100">
              <img className="position-absolute w-100 h-100 rounded" src={FirstImage} style={{ objectFit: 'cover' }} alt="About Us" />
            </div>
          </div>
          <div className="col-lg-7">
            <div className="mb-4">
              <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
              <h1 className="display-4">Solusi Kesehatan Terlengkap Untuk Anda Dan Keluarga!</h1>
            </div>
            <p>Chat dokter, kunjungi rumah sakit, beli obat, cek lab dan update informasi seputar kesehatan, semua bisa di website Sahabat Sehat kami. </p>
            <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Fasilitas Kesehatan</h5>
            <div className="row g-3 pt-3">
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Tunggu<small className="d-block text-primary">Doctors</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Konsultasi<small className="d-block text-primary">Services</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Pemeriksaan<small className="d-block text-primary">Testing</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-vial text-primary mb-3"></i>
                  <h6 className="mb-0">Laboratorium<small className="d-block text-primary">Testing</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-pills text-primary mb-3"></i>
                  <h6 className="mb-0">Apotek<small className="d-block text-primary">Pharmacy</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-x-ray text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Radiologi<small className="d-block text-primary">Radiology</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-heartbeat text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Gawat Darurat<small className="d-block text-primary">Emergency</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-syringe text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Imunisasi<small className="d-block text-primary">Immunization</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-tooth text-primary mb-3"></i>
                  <h6 className="mb-0">Kesehatan Gigi<small className="d-block text-primary">Dental</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-dumbbell text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Fisioterapi<small className="d-block text-primary">Physiotherapy</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-baby text-primary mb-3"></i>
                  <h6 className="mb-0">Ruang Ibu & Anak<small className="d-block text-primary">Maternity</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-ambulance text-primary mb-3"></i>
                  <h6 className="mb-0">Ambulance Jenazah Gratis<small className="d-block text-primary">Service</small></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
