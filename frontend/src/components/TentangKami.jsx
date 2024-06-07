import React from 'react';

// Import Images
import FirstImage from '../assets/images/about.jpg';

const TentangKami = () => {
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
              <h1 className="display-4 text-primary">Selamat datang di Klinik Sahabat Sehat</h1>
            </div>
            <p>Di Klinik Sahabat Sehat, kesehatan dan kesejahteraan Anda adalah prioritas utama kami. Didirikan dengan misi untuk memberikan perawatan kesehatan yang komprehensif dan penuh kasih, kami berdedikasi untuk menjadi mitra terpercaya Anda dalam menjaga kesehatan. Nama kami, "Sahabat Sehat," mencerminkan komitmen kami untuk merawat setiap pasien dengan perhatian, rasa hormat, dan persahabatan yang mereka layak dapatkan.</p>
            
            <div className="mb-4">
              <h2 className="display-6 text-primary">Visi Kami</h2>
              <p>Menjadi penyedia layanan kesehatan terkemuka yang dikenal karena memberikan perawatan berkualitas tinggi yang berpusat pada pasien dan meningkatkan kesehatan serta kesejahteraan masyarakat kami.</p>
            </div>
            
            <div className="mb-4">
              <h2 className="display-6 text-primary">Misi Kami</h2>
              <ul>
                <li><strong>Perawatan Penuh Kasih:</strong> Kami merawat setiap pasien dengan empati dan pengertian, memastikan bahwa kebutuhan individu mereka terpenuhi dengan rasa hormat dan perhatian tertinggi.</li>
                <li><strong>Keunggulan dalam Layanan:</strong> Kami berupaya mencapai keunggulan dalam semua aspek layanan kami, mulai dari fasilitas canggih hingga tenaga kesehatan yang berdedikasi.</li>
                <li><strong>Fokus pada Komunitas:</strong> Kami bertujuan untuk menjadi bagian integral dari komunitas, menawarkan layanan kesehatan yang mudah diakses dan mempromosikan gaya hidup sehat melalui program pendidikan dan penyuluhan.</li>
              </ul>
            </div>

            <div className="row g-3 pt-3">
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-user-md text-primary mb-3"></i>
                  <h6 className="mb-0">Qualified<small className="d-block text-primary">Doctors</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-procedures text-primary mb-3"></i>
                  <h6 className="mb-0">Emergency<small className="d-block text-primary">Services</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-microscope text-primary mb-3"></i>
                  <h6 className="mb-0">Accurate<small className="d-block text-primary">Testing</small></h6>
                </div>
              </div>
              <div className="col-sm-3 col-6">
                <div className="bg-light text-center rounded-circle py-4">
                  <i className="fa fa-3x fa-ambulance text-primary mb-3"></i>
                  <h6 className="mb-0">Free<small className="d-block text-primary">Ambulance</small></h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TentangKami;
