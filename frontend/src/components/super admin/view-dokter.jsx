import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const ViewDokter = () => {
  const { id } = useParams();
  const [dokter, setDokter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isJadwalCreated, setIsJadwalCreated] = useState(false);

  useEffect(() => {
    const fetchSkedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getdokter/${encodeURIComponent(id)}`);
        console.log("Respons dari backend:", response.data);
        setDokter(response.data);
        const jadwalCreated = localStorage.getItem(`jadwalCreated_${id}`) === 'true';
        setIsJadwalCreated(jadwalCreated);
      } catch (error) {
        console.log("Error:", error.response?.data?.msg || 'Terjadi kesalahan');
        setError(error.response?.data?.msg || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchSkedule();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!dokter) return <p>Data Dokter tidak ditemukan</p>;

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header bg-primary text-white">
        </div>
        <div className="card-body">
          <img src={`http://localhost:5000/images/dokter/${dokter.foto}`} alt={dokter.name} style={{ width: '100px', height: 'auto' }} />
          <h5 className="card-title">Nama : Dr.{dokter.name}</h5>
          <p className="card-text">Email: {dokter.email}</p>
          <p className="card-text">Spesialis: {dokter.spesialis}</p>
        </div>
        <div className="card-footer text-muted">
          Terima kasih telah menggunakan layanan kami
        </div>
      </div>
      <Link to={`/buatJadwal/${dokter.id}`} className={`btn me-3 ${isJadwalCreated ? 'btn-secondary' : 'btn-info'}`} disabled={isJadwalCreated}>
        {isJadwalCreated ? 'Jadwal Sudah Punya' : 'Buatkan Jadwal'}
      </Link>
      <Link to={'/halamanDokter'} className='btn btn-danger'>Kembali</Link>
    </div>
  );
};

export default ViewDokter;
