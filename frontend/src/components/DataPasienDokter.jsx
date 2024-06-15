import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasienTable = () => {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // State untuk notifikasi
  const [skeduleCreated, setSkeduleCreated] = useState({}); // State untuk status skedule

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

    // Muat status skedule dari localStorage
    const savedSkeduleCreated = JSON.parse(localStorage.getItem('skeduleCreated')) || {};
    setSkeduleCreated(savedSkeduleCreated);
  }, []);

  // Fungsi untuk menampilkan notifikasi
  const showNotification = (message) => {
    setNotification(message); // Set notifikasi
    setTimeout(() => {
      setNotification(null); // Hilangkan notifikasi setelah beberapa detik
    }, 3000); // Sesuaikan dengan kebutuhan
  };

  // Fungsi untuk membuat skedule
  const createSkedule = async (id) => {
    try {
      await axios.post(`http://localhost:5000/skedulePasien/${id}`);
      const updatedSkeduleCreated = { ...skeduleCreated, [id]: true };
      setSkeduleCreated(updatedSkeduleCreated); // Tandai skedule sebagai sudah dibuat
      localStorage.setItem('skeduleCreated', JSON.stringify(updatedSkeduleCreated)); // Simpan ke localStorage
      showNotification('Skedule berhasil dibuat!'); // Tampilkan notifikasi setelah skedule berhasil dibuat
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
                  disabled={skeduleCreated[item.id]} // Disable button jika skedule sudah dibuat
                >
                  {skeduleCreated[item.id] ? 'Skedule Telah Dibuat' : 'Buat Skedule'} {/* Ubah teks button */}
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
