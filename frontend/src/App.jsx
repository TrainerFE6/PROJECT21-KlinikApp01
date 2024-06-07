import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";


// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Pages
import Home from "./pages/Home";
import TentangKami from "./components/TentangKami";
import PelayananPage from "./pages/PelayananPage";
import LoginDokter from "./pages/LoginDokter";
import RegisPasien from "./pages/RegisPasien";
import DokterPage from "./pages/DokterPage";
import DataPasienDokter from "./pages/DataPasienDokter";
import RegisterDokter from "./components/super admin/RegisterDokter";



const App = () => {
  return (
    <Router>
       <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/Tentang Kami" element={<TentangKami />} />
          <Route path="/Pelayanan" element={<PelayananPage />} />
          <Route path="/dokter" element={<DokterPage />} />
          <Route path="/" element={<LoginDokter />} />
          <Route path="/Daftar" element={<RegisPasien />} />
          <Route path="/dokter/dataPasien" element={<DataPasienDokter />} />
          <Route path="/registerDokter" element={<RegisterDokter />} />
          
          {/* <Route path="/services" element={<ServicesPage />} /> */}
        </Routes>
       <Footer />
    </Router>
  );
};

export default App;
