import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HalamanDokter = () => {
  const [dokter, setDokter] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/dokter');
        setDokter(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Link to={'/registerDokter'} className='btn btn-primary mb-3 mt-3 me-3'>Register Dokter</Link>
      <Link to={'/spesialis'} className='btn btn-primary mb-3 mt-3'>View Spesialis</Link>

      <h2 className="mt-4 mb-4 text-center">Daftar Dokter</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Spesialis</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>
          {dokter.map((doc) => (
            <tr key={doc.id}>
              <td>{doc.id}</td>
              <td>{doc.name}</td>
              <td>{doc.email}</td>
              <td>{doc.spesialis}</td>
              <td>
                <img src={`http://localhost:5000/images/dokter/${doc.foto}`} alt={doc.name} style={{ width: '100px', height: 'auto' }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HalamanDokter;
