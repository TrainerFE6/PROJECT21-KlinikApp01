import React, { useState, useEffect } from 'react';
import { Table, Container } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HalamanPerawat = () => {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUser(response.data);
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
      <Link to={'/registerUser'} className='btn btn-primary mb-3 mt-3 me-3'>Register Perawat</Link>
     
      <h2 className="mt-4 mb-4 text-center">Daftar Dokter</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Email</th>
            <th>Nohandphone</th>
            <th>Foto</th>
            <th>Jabatan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {user.map((us) => (
            <tr key={us.id}>
              <td>{us.id}</td>
              <td>{us.name}</td>
              <td>{us.email}</td>
              <td>{us.nohandphone}</td>
              <td>
                <img src={`http://localhost:5000/images/${us.foto}`} alt={us.name} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>{us.role}</td>
              <td>
                <Link to={`/hapus/${us.id}`} className='btn btn-danger'>Hapus</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HalamanPerawat;
