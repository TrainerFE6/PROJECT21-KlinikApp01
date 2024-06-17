import React from 'react';
import { useNavigate } from 'react-router-dom';

const Team = () => {
  const navigate = useNavigate();

  const handleDoctorClick = () => {
    // Navigasi ke halaman "/LoginDokter" saat tombol "Doctor" diklik
    navigate('/LoginDokter');
  };

  const handleAdminClick = () =>{
    navigate('/LoginAdmin');
  };
  const handleUserClick = () =>{
    navigate('/LoginUser');
  };

  return (
    <div className="container-fluid bg-primary my-5 py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: '500px' }}>
          <h5 className="d-inline-block text-white text-uppercase border-bottom border-5">Find A Doctor</h5>
          <h1 className="display-4 mb-4">Find A Healthcare Professional</h1>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-dark border-0 w-25 d-flex justify-content-center align-items-center mx-2" onClick={handleAdminClick}>
            <i className="fas fa-user me-2"></i> Admin
          </button>
          <button className="btn btn-dark border-0 w-25 d-flex justify-content-center align-items-center mx-2" onClick={handleDoctorClick}>
            <i className="fas fa-user-md me-2"></i> Doctor
          </button>
          <button className="btn btn-dark border-0 w-25 d-flex justify-content-center align-items-center mx-2" onClick={handleUserClick}>
            <i className="fas fa-user-nurse me-2"></i> Perawat
          </button>
        </div>
      </div>
    </div>
  );
}

export default Team;
