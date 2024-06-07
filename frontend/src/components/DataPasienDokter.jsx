import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;

const PasienTable = () => {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="table-container">
      <table className="table is-striped is-hoverable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Alamat</th>
            <th>TTL</th>
            <th>No Handphone</th>
            <th>Keluhan</th>
            <th>Dokter Spesialis</th>
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
              <td>{item.dokterSPesialis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasienTable;
