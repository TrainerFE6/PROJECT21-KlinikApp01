import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import RekapPrintComponent from './RekapPrintComponent'; // Import komponen cetak
import { useReactToPrint } from 'react-to-print';

const ViewRekapMedis = () => {
  const { name } = useParams();
  const [rekap, setRekap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const printRef = useRef(); // Reference untuk komponen cetak

  useEffect(() => {
    const fetchRekap = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rekap/${encodeURIComponent(name)}`);
        console.log("Respons dari backend:", response.data);
        setRekap(response.data);
      } catch (error) {
        console.log("Error:", error.response?.data?.msg || 'Terjadi kesalahan');
        setError(error.response?.data?.msg || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchRekap();
  }, [name]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current, // Tentukan konten yang akan dicetak
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!rekap) return <p>Skedule belum dibuat</p>;

  return (
    <div className="container mt-5">
      <RekapPrintComponent ref={printRef} rekap={rekap} />
      <div className="button-container">
        <button onClick={handlePrint} className="btn btn-secondary mt-3 me-3">Cetak ke PDF</button>
        {!rekap.isProcessed && (
          <Link to={`/updateRekap/${rekap.id}`} className='btn btn-primary mt-3 me-3'>Proses Rekap</Link>
        )}
        <Link to={'/rekap-medis-perawat'} className='btn btn-danger mt-3'>Kembali</Link>
      </div>
    </div>
  );
};

export default ViewRekapMedis;
