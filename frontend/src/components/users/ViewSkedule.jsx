import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const SkedulePerawat = () => {
  const { namaPasien } = useParams();
  const [skedule, setSkedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/skedule/${encodeURIComponent(namaPasien)}`);
        console.log("Respons dari backend:", response.data);
        setSkedule(response.data);
      } catch (error) {
        console.log("Error:", error.response?.data?.msg || 'Terjadi kesalahan');
        setError(error.response?.data?.msg || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchSkedule();
  }, [namaPasien]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!skedule) return <p>Skedule belum dibuat</p>;

  return (
    <div className="container mt-5">
      <div className="card text-center">
        <div className="card-header bg-primary text-white">
          <h5>No. Antrian: {skedule.antrian}</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title">Pasien: {skedule.namePasien}</h5>
          <p className="card-text">Dokter: {skedule.namedokter} ({skedule.dokterSpesialis})</p>
          <p className="card-text">Keluhan: {skedule.title}</p>
          <p className="card-text">Tanggal: {skedule.sceduledate}</p>
          <p className="card-text">Waktu: {skedule.sceduletime}</p>
        </div>
        <div className="card-footer text-muted">
          Terima kasih telah menggunakan layanan kami
        </div>

      
      </div>
      <Link to={'/Pacient'} className='btn btn-danger'>Kembali</Link>
    </div>
  );
};

export default SkedulePerawat;
