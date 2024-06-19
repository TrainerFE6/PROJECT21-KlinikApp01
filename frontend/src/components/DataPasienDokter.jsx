import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PasienTable = () => {
  const [pasien, setPasien] = useState([]);
  const [filteredPasien, setFilteredPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [skeduleCreated, setSkeduleCreated] = useState({});
  const [searchTerm, setSearchTerm] = useState(''); // State untuk input pencarian

  useEffect(() => {
    const fetchPasien = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pasienDokter');
        setPasien(response.data);
        setFilteredPasien(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPasien();

    const savedSkeduleCreated = JSON.parse(localStorage.getItem('skeduleCreated')) || {};
    setSkeduleCreated(savedSkeduleCreated);
  }, []);

  useEffect(() => {
    // Filter pasien berdasarkan searchTerm di semua field
    setFilteredPasien(
      pasien.filter((p) =>
        Object.values(p).some(val =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
  }, [searchTerm, pasien]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const createSkedule = async (id) => {
    try {
      await axios.post(`http://localhost:5000/skedulePasien/${id}`);
      const updatedSkeduleCreated = { ...skeduleCreated, [id]: true };
      setSkeduleCreated(updatedSkeduleCreated);
      localStorage.setItem('skeduleCreated', JSON.stringify(updatedSkeduleCreated));
      showNotification('Skedule berhasil dibuat!');
    } catch (error) {
      setError(error.response?.data?.msg || 'Terjadi kesalahan');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      {notification && <div className="notification">{notification}</div>}
      
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          placeholder="Cari Data Pasien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input"
          
        />
      </div>

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
          {filteredPasien.map((item, index) => (
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
                  disabled={skeduleCreated[item.id]}
                >
                  {skeduleCreated[item.id] ? 'Skedule Telah Dibuat' : 'Buat Skedule'}
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
