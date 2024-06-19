import React, { useState, useEffect } from 'react';
import { Table, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const HalamanPasien = () => {
  const [pasien, setPasien] = useState([]);
  const [filteredPasien, setFilteredPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getPasien');
        setPasien(response.data);
        setFilteredPasien(response.data); // Initialize filtered list with the full data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter pasien based on searchTerm in all fields
    const filtered = pasien.filter((pas) =>
      Object.values(pas).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredPasien(filtered);
  }, [searchTerm, pasien]);

  const handleDeletePasien = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletePasien/${id}`);
      setPasien(pasien.filter(item => item.id !== id)); // Menghapus pasien dari state lokal setelah berhasil dihapus dari server
      setFilteredPasien(filteredPasien.filter(item => item.id !== id)); // Update filtered list as well
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting pasien');
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

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Cari Data Pasien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

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
          {filteredPasien.map((pas, index) => (
            <tr key={pas.id}>
              <td>{index + 1}</td>
              <td>{pas.name}</td>
              <td>{pas.alamat}</td>
              <td>{pas.ttl}</td>
              <td>{pas.nohanphone}</td>
              <td>{pas.keluhan}</td>
              <td>{pas.dokterSPesialis}</td>
              <td style={{ width:'25%' }}>
                <Button className='btn btn-danger me-3' onClick={() => handleDeletePasien(pas.id)}>Hapus</Button>
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
