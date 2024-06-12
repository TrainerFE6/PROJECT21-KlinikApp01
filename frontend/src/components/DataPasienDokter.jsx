import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasienTable = () => {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // State untuk notifikasi

  useEffect(() => {
    const fetchPasien = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pasienDokter');
        setPasien(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPasien();
  }, []);

  // Fungsi untuk menampilkan notifikasi
  const showNotification = () => {
    setNotification('Skedule berhasil dibuat!'); // Set notifikasi
    setTimeout(() => {
      setNotification(null); // Hilangkan notifikasi setelah beberapa detik
    }, 3000); // Sesuaikan dengan kebutuhan
  };

  // Fungsi untuk membuat skedule
  const createSkedule = async (id) => {
    try {
      await axios.post(`http://localhost:5000/skedulePasien/${id}`);
      showNotification(); // Tampilkan notifikasi setelah skedule berhasil dibuat
    } catch (error) {
      setError(error.response?.data?.msg || 'Terjadi kesalahan');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      {notification && <div className="notification">{notification}</div>} {/* Tampilkan notifikasi */}
      <table className="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>TTL</th>
            <th>No Handphone</th>
            <th>Keluhan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.alamat}</td>
              <td>{item.ttl}</td>
              <td>{item.nohandphone}</td>
              <td>{item.keluhan}</td>
              <td>
                <button
                  onClick={() => createSkedule(item.id)}
                  className="btn btn-danger"
                >
                  Buat Skedule
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasienTable;
