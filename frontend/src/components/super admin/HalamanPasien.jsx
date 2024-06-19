import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HalamanPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getPasien');
        setPasien(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDeletePasien = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletePasien/${id}`);
      setPasien(pasien.filter(item => item.id !== id)); // Menghapus obat dari state lokal setelah berhasil dihapus dari server
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting obat');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>

      <h2 className="mt-4 mb-4 text-center">Daftar Pasien</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Tanggal Lahir</th>
            <th>nohandphone</th>
            <th>Keluhan</th>
            <th>dokter spesialis</th>
            <th className='text-center'>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {pasien.map((pas) => (
            <tr key={pas.id}>
              <td>{pas.id}</td>
              <td>{pas.name}</td>
              <td>{pas.alamat}</td>
              <td>{pas.ttl}</td>
              <td>{pas.nohanphone}</td>
              <td>{pas.keluhan}</td>
              <td>{pas.dokterSPesialis}</td>
             
              <td style={{ width:'25%' }}>
              <button className='btn btn-danger me-3' onClick={() => handleDeletePasien(pas.id)}>Hapus</button>
                
                <Link to={`/RekapPasien/${pas.name}`} className='btn btn-info'>View Rekap</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HalamanPasien;
