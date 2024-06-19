import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../service/authservice";
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/'); // Arahkan ke halaman login setelah logout
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className="container-fluid sticky-top bg-white shadow-sm">
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-white navbar-light py-3 py-lg-0">
          <a href="index.html" className="navbar-brand">
            <h1 className="m-0 text-uppercase text-primary">
              <i className="fa fa-clinic-medical me-2"></i>Sahabat Sehat
            </h1>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse show" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
              <Link to="/dashboardDokter" className="nav-item nav-link">
                dashboard
              </Link>
              <Link to="/pemeriksaan" className="nav-item nav-link">
                My Schedule
              </Link>
              <Link to="/jadwalPemeriksaan" className="nav-item nav-link">
                Jadwal Pemeriksaan
              </Link>
              <Link to="/dokter/dataPasien" className="nav-item nav-link">
                Data Pasien
              </Link>
              <Link to="/RekapMedis" className="nav-item nav-link">
                Rekap Pasien
              </Link>
              <Link to="/dokter" className="nav-item nav-link">
                dokter
              </Link>
              <button onClick={handleLogout} className="nav-item nav-link btn btn-link">
                Logout
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
