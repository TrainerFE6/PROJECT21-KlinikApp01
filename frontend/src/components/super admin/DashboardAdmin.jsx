import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const DashboardAdmin = () => {
  const [dokter, setDokter] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dokterResponse = await axios.get('http://localhost:5000/dokter');
        setDokter(dokterResponse.data);

        const pasienResponse = await axios.get('http://localhost:5000/getPasien');
        setPasien(pasienResponse.data);
        const UserResponse = await axios.get('http://localhost:5000/users');
        setUsers(UserResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid className="mt-4">
      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Jumlah Pasien</Card.Title>
              <Card.Text>
                {loading ? 'Loading...' : pasien.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Jumlah Dokter</Card.Title>
              <Card.Text>
                {loading ? 'Loading...' : dokter.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Jumlah Perawat</Card.Title>
              <Card.Text>
                {loading ? 'Loading...' : user.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      
      </Row>
      <Row className="mb-4">
      </Row>
      <Row>
        <h2 className='text-center mb-3'>Daftar Dokter Rumah Sakit</h2>
        {dokter.map((item) => (
          <Col md={4} key={item.id} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Email: {item.email}<br />
                  Spesialis: {item.spesialis}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <img src={`http://localhost:5000/images/dokter/${item.foto}`} alt={`Foto ${item.name}`} style={{ width: '100%', height: 'auto' }} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Row>
      <h2 className='text-center mb-3'>Daftar Perawat Rumah Sakit</h2>
        {user.map((it) => (
          <Col md={4} key={it.id} className="mb-4">
            <Card className="text-center">
              <Card.Body>
                <Card.Title>{it.name}</Card.Title>
                <Card.Text>
                  Email: {it.email}<br />
                  Role: {it.role}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <img src={`http://localhost:5000/images/${it.foto}`} alt={`Foto ${it.name}`} style={{ width: '100%', height: 'auto' }} />
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default DashboardAdmin;
