import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

// Import Components
import Navbar from "./components/Navbar";

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
import DoctorSchedule from "./components/JadwalPemeriksaan";
import UpdateJadwalForm from "./components/updateJadwal";
import UpdateSkeduleForm from "./components/UpdateSkedule";
import PasienList from "./components/RekapMedis";
import CreateRekapMedis from "./components/CreateRekapMedis";

// untuk user
import NavUser from "./components/users/NavbarUser";
import UserLogin from "./pages/users/LoginUser";
import DashboardUser from "./pages/users/dashboardUser";
import UserProfile from "./pages/users/UserProfile";
import ShowPacient from "./pages/users/ShowPacient";
import RegisPasien from "./pages/users/RegisPasient";
import ViewSKed from "./pages/users/ViewSKed";
import DataObat from "./components/users/DataObat";
import RekapMedisPerawat from "./components/users/RekapMedisPerawat";
import ViewRekapMedis from "./components/users/ViewRekapMedis";
import UpdateRekapPerawat from "./components/users/ProsesRekap";

// UNTUK ADMIN
import NavbarAdmin from "./components/super admin/NavbarAdmin";
import RegisterAdmin from "./components/super admin/RegisterAdmin";
import LoginAdmin from "./components/super admin/LoginAdmin";
import DashboardAdmin from "./components/super admin/DashboardAdmin";
import HalamanDokter from "./components/super admin/HalamanDokter";
import Spesialis from "./components/super admin/spesialis";
import RegisterSpesialis from "./components/super admin/CreateSpesialis";

const AppContent = () => {
  const location = useLocation();
  // admin path 
  const adminPaths =[
    '/LoginAdmin',
    '/dashboardAdmin',
    '/halamanDokter',
    '/spesialis',
    '/createSPesialis'
  ]

  // Define paths for user and doctor pages
  const userPaths = [
    "/registerUser",
    "/LoginUser",
    "/dashboardUser",
    "/profileUser",
    "/Pacient",
    "/createPasien",
    "/dataObat",
    "/rekap-medis-perawat",
    "/view-rekap-medis/:name"
  ];

  const doctorPaths = [
    "/dokter",
    "/dokter/dataPasien",
    "/registerDokter",
    "/update-dokter/:id",
    "/pemeriksaan",
    "/createJadwal",
    "/create-skedule",
    "/jadwalPemeriksaan",
    "/updateJadwal/:id",
  ];

  // adminPath 
  const isAdminPath = adminPaths.includes(location.pathname);

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
    "/dataObat",
    "/view-rekap-medis/:name",
    "/Admin",
    '/createSPesialis'
  ];

  // Use regex to match dynamic paths
  const viewSkedulePath = /^\/view-skedule\/[^/]+$/;

  // Function to determine if current path matches the dynamic path
  const isViewSkedulePath = viewSkedulePath.test(location.pathname);
  const isViewRekapMedisPath = /^\/view-rekap-medis\/[^/]+$/.test(location.pathname);

  return (
    <>
    {/* user */}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath && isUserPath && location.pathname === "/dashboardUser" && <NavUser />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath  && isUserPath && location.pathname === "/profileUser" && <NavUser />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath  && isUserPath && location.pathname === "/Pacient" && <NavUser />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath  && isUserPath && location.pathname === "/dataObat" && <NavUser />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath  && isUserPath && location.pathname === "/rekap-medis-perawat" && <NavUser />}


      {/* admin */}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isUserPath &&isAdminPath && location.pathname === "/dashboardAdmin" && <NavbarAdmin />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isUserPath &&isAdminPath && location.pathname === "/halamanDokter" && <NavbarAdmin />}
      {!isViewSkedulePath && !isViewRekapMedisPath &&!isUserPath &&isAdminPath && location.pathname === "/spesialis" && <NavbarAdmin />}


      {!isViewSkedulePath && !isViewRekapMedisPath &&!isAdminPath  && !isUserPath && !noNavbarFooterPaths.includes(location.pathname) && <Navbar />}
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
        <Route path="/jadwalPemeriksaan" element={<DoctorSchedule />} />
        <Route path="/updateJadwal/:id" element={<UpdateJadwalForm />} />
        <Route path="/updateSkedule/:noantrian" element={<UpdateSkeduleForm />} />
        <Route path="/RekapMedis" element={<PasienList />} />
        <Route path="/create-rekap-medis/:noantrian" element={<CreateRekapMedis />} />

        {/* untuk user */}
        <Route path="/LoginUser" element={<UserLogin />} />
        <Route path="/dashboardUser" element={<DashboardUser />} />
        <Route path="/profileUser" element={<UserProfile />} />
        <Route path="/Pacient" element={<ShowPacient />} />
        <Route path="/createPasien" element={<RegisPasien />} />
        <Route path="/view-skedule/:namaPasien" element={<ViewSKed />} />
        <Route path="/dataObat" element={<DataObat />} />
        <Route path="/rekap-medis-perawat" element={<RekapMedisPerawat />} />
        <Route path="/view-rekap-medis/:name" element={<ViewRekapMedis />} />
        <Route path="/updateRekap/:id" element={<UpdateRekapPerawat />} />

        {/* untuk admin */}
        <Route path="/Admin" element={<RegisterAdmin />} />
        <Route path="/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/halamanDokter" element={<HalamanDokter />} />
        <Route path="/spesialis" element={<Spesialis />} />
        <Route path="/createSPesialis" element={<RegisterSpesialis />} />

      </Routes>
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
