import React from 'react';

// Import gambar (gantilah dengan impor gambar yang sesuai)
import Doctor1 from '../assets/images/about.jpg';
import Doctor2 from '../assets/images/about.jpg';
import Doctor3 from '../assets/images/about.jpg';

const doctors = [
  {
    id: 1,
    name: "Dr. Andi Wijaya",
    specialty: "Umum",
    practiceHours: "Senin - Jumat: 08:00 - 16:00",
    image: Doctor1
  },
  {
    id: 2,
    name: "Dr. Budi Santoso",
    specialty: "Pediatri",
    practiceHours: "Senin - Jumat: 09:00 - 17:00",
    image: Doctor2
  },
  {
    id: 3,
    name: "Dr. Citra Dewi",
    specialty: "Ginekologi",
    practiceHours: "Senin - Jumat: 10:00 - 18:00",
    image: Doctor3
  }
];

const Dokter = () => {
  return (
    <div className="container-fluid py-5">
      <div className="container">
        <div className="mb-5 text-center">
          <h1 className="display-4">Profil Dokter</h1>
        </div>
        <div className="row g-5">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="col-lg-4 col-md-6">
              <div className="card h-100">
                <img 
                  src={doctor.image} 
                  className="card-img-top" 
                  alt={doctor.name} 
                  style={{ objectFit: 'cover', height: '300px' }} 
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{doctor.name}</h5>
                  <p className="card-text"><strong>Spesialis:</strong> {doctor.specialty}</p>
                  <p className="card-text"><strong>Jam Praktik:</strong> {doctor.practiceHours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dokter;
