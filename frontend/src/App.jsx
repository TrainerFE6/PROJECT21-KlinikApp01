import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import Pages
import Home from "./pages/Home";
import TentangKami from "./components/TentangKami";
import PelayananPage from "./pages/PelayananPage";
import LoginDokter from "./pages/LoginDokter";

import JadwalDoc from "./pages/JadwalDoc";
import DocCreateJadwal from "./pages/DocCreateJadwal";
import DokterPage from "./pages/DokterPage";
import DataPasienDokter from "./pages/DataPasienDokter";
import RegisterDokter from "./pages/RegisDokter";
import RegisUser from "./pages/RegisUser";
import UpdateDokter from "./components/UpdateDokter";
import CrateSkepasien from "./pages/CrateSkepasien";

// untuk user
import NavUser from "./components/users/NavbarUser";
import UserLogin from "./pages/users/LoginUser";
import DashboardUser from "./pages/users/dashboardUser"; // Pastikan nama file ini benar
import UserProfile from "./pages/users/UserProfile";
import ShowPacient from "./pages/users/ShowPacient";
import RegisPasien from "./pages/users/RegisPasient";
import ViewSKed from "./pages/users/ViewSKed";

const AppContent = () => {
  const location = useLocation();

  // Define paths for user and doctor pages
  const userPaths = [
    "/registerUser",
    "/LoginUser",
    "/dashboardUser",
    "/profileUser",
    "/Pacient",
    "/createPasien",
    // Sesuaikan path ini dengan yang digunakan
    // Add more user-specific paths here
  ];

  const doctorPaths = [
    "/dokter",
    "/dokter/dataPasien",
    "/registerDokter",
    "/update-dokter/:id",
    "/pemeriksaan",
    "/createJadwal",
    "/create-skedule",
    // Add more doctor-specific paths here
  ];

  // Check if the current path is a user path
  const isUserPath = userPaths.includes(location.pathname);

  // Check if the current path is a doctor path
  const isDoctorPath = doctorPaths.includes(location.pathname);

  // Paths where neither Navbar nor Footer should be displayed
  const noNavbarFooterPaths = [
    "/",
    "/registerDokter",
    "/LoginUser",
    "/createJadwal",
    "/Pacient",
  ];

  // Use regex to match dynamic paths
  const viewSkedulePath = /^\/view-skedule\/[^/]+$/;

  // Function to determine if current path matches the dynamic path
  const isViewSkedulePath = viewSkedulePath.test(location.pathname);

  return (
    <>
      {!isViewSkedulePath && isUserPath && location.pathname === "/dashboardUser" && <NavUser />}
      {!isViewSkedulePath && isUserPath && location.pathname === "/profileUser" && <NavUser />}
      {!isViewSkedulePath && isUserPath && location.pathname === "/Pacient" && <NavUser />}
      {!isViewSkedulePath && !isUserPath && !noNavbarFooterPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/Tentang Kami" element={<TentangKami />} />
        <Route path="/Pelayanan" element={<PelayananPage />} />
        <Route path="/dokter" element={<DokterPage />} />
        <Route path="/" element={<LoginDokter />} />
       
        <Route path="/dokter/dataPasien" element={<DataPasienDokter />} />
        <Route path="/pemeriksaan" element={<JadwalDoc />} />
        <Route path="/createJadwal" element={<DocCreateJadwal />} />
        <Route path="/registerDokter" element={<RegisterDokter />} />
        <Route path="/registerUser" element={<RegisUser />} />
        <Route path="/update-dokter/:id" element={<UpdateDokter />} />
        <Route path="/create-skedule/:id" element={<CrateSkepasien />} />

        {/* untuk user */}
        <Route path="/LoginUser" element={<UserLogin />} />
        <Route path="/dashboardUser" element={<DashboardUser />} /> {/* Pastikan path ini sesuai */}
        <Route path="/profileUser" element={<UserProfile />} /> {/* Pastikan path ini sesuai */}
        <Route path="/Pacient" element={<ShowPacient />} /> {/* Pastikan path ini sesuai */}
        <Route path="/createPasien" element={<RegisPasien />} /> {/* Pastikan path ini sesuai */}
        <Route path="/view-skedule/:namaPasien" element={<ViewSKed />} /> {/* Pastikan path ini sesuai */}
      </Routes>
      {!isViewSkedulePath && !isDoctorPath && !noNavbarFooterPaths.includes(location.pathname) && <Footer />}
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
