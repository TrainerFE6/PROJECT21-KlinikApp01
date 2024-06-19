import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, Container, Row, Col, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DataObatAdmin = () => {
  const [obat, setObat] = useState([]);
  const [filteredObat, setFilteredObat] = useState([]);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await axios.get('http://localhost:5000/obat');
        setObat(response.data);
        setFilteredObat(response.data); // Initialize filtered list with the full data
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching schedule');
      }
    };

    fetchObat();
  }, []);

  useEffect(() => {
    // Filter obat based on searchTerm in all fields
    const filtered = obat.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredObat(filtered);
  }, [searchTerm, obat]);

  const handleDeleteObat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteObat/${id}`);
      setObat(obat.filter(item => item.id !== id)); // Menghapus obat dari state lokal setelah berhasil dihapus dari server
      setFilteredObat(filteredObat.filter(item => item.id !== id)); // Update filtered list as well
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting obat');
    }
  };

  return (
    <Container className="mt-5">
      <Link to={'/create-obat'} className='btn btn-primary mb-3'>Tambahkan Obat</Link>
      {error && <div className="alert alert-danger">{error}</div>}

      <InputGroup className="mb-3">
        <InputGroup.Text>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Text>
        <FormControl
          type="text"
          placeholder="Cari Data Obat..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {filteredObat.length > 0 ? (
        <Row>
          <h2 className='text-center mb-3 mt-3'>Data Obat Klinik</h2>
          {filteredObat.map((item) => (
            <Col md={4} className="mb-3" key={item.id}>
              <div className="card h-100 d-flex align-items-center justify-content-center">
                <div className="card-body text-center">
                  <h5 className="card-title">Nama: {item.name_obat}</h5>
                  <p className="card-text"><strong>Stok:</strong> {item.stok}</p>
                  <p className="card-text"><strong>Harga:</strong> {item.harga}</p>
                  <p className="card-text"><strong>Jenis Obat:</strong> {item.Jenis_obat}</p>
                  <Button className='btn btn-danger mt-3' onClick={() => handleDeleteObat(item.id)}>Hapus</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center">Tidak ada data obat.</p>
      )}
    </Container>
  );
};

export default DataObatAdmin;
