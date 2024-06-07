import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const pages = ["Home", "Tentang Kami", "Pelayanan", "Dokter", "contact", "Daftar"];

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

              {pages.map((item, index) => ( // Add a key prop
                <Link key={index} to={item.toLocaleLowerCase() === "home" ? "/home" : item.toLocaleLowerCase()} className="nav-item nav-link">
                  {item.toLocaleLowerCase()}
                </Link>
              ))}

            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
