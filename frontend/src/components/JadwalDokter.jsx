import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function JadwalDokter() {
  const [jadwal, setJadwal] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchJadwalDokter();
  }, []);

  const fetchJadwalDokter = async () => {
    try {
      const response = await axios.get('http://localhost:5000/jadwalDokter');
      
      setJadwal(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleCreateJadwal = ()  =>{
    navigate('/createJadwal');
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center mb-4">Jadwal Dokter</h2>
          <button className='btn btn-primary mb-4' onClick={handleCreateJadwal}>Buat Jadwal</button>
          <div className="card">
            <div className="card-header">
              Jadwal Dokter : Dr. {jadwal.nama_dokter}
            </div>
            <div className="card-body">
              <h5 className="card-title">Nama Dokter: {jadwal.nama_dokter}</h5>
              <p className="card-text">Jadwal Praktek: {jadwal.spesialis}</p>
              <p className="card-text">Waktu Mulai: {jadwal.waktu_pelayanan}</p>
              <p className="card-text">Waktu Selesai: {jadwal.waktu_selesai}</p>
              <p className="card-text">Jadwal Pelayanan: {jadwal.jadwal_pelayanan}</p>
              {/* Tambahkan elemen lain sesuai kebutuhan */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JadwalDokter;
