import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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
import RegisterDokter from "./pages/RegisDokter";
import RegisUser from "./pages/RegisUser";
import UpdateDokter from "./components/UpdateDokter";



const AppContent = () => {
  const location = useLocation();

  // Define routes where Navbar and Footer should not be displayed
  const loginPath = "/";
  const registeDokterpath = "/registerDokter";
  const dataPasienDokter = "/dokter/dataPasien";
  const ProfileDokter = '/dokter';
  const RegisterUser = '/registerUser';
 

  const noNavbarFooterPaths = [loginPath, registeDokterpath, RegisterUser];
  const noFooter = [dataPasienDokter, ProfileDokter, loginPath, ProfileDokter, RegisterUser]

  return (
    <>
      {!noNavbarFooterPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Tentang Kami" element={<TentangKami />} />
        <Route path="/Pelayanan" element={<PelayananPage />} />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/" element={<LoginDokter />} />
        <Route path="/Daftar" element={<RegisPasien />} />
        <Route path="/dokter/dataPasien" element={<DataPasienDokter />} />
        <Route path="/registerDokter" element={<RegisterDokter />} />
        <Route path="/registerUser" element={<RegisUser />} />
        <Route path="/update-dokter/:id" element={<UpdateDokter />} />
        
      </Routes>
      {!noFooter.includes(location.pathname) && <Footer />}
      
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
