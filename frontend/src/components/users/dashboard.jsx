import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [dokter, setDokter] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [jumlahRekap, setJumlahRekap] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aktivitasTerbaru, setAktivitasTerbaru] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dokterResponse = await axios.get('http://localhost:5000/dokter');
        setDokter(dokterResponse.data);

        const pasienResponse = await axios.get('http://localhost:5000/pasienPerawat');
        setPasien(pasienResponse.data);

        const aktivitasResponse = await axios.get('http://localhost:5000/aktivitasTerbaru');
        setAktivitasTerbaru(aktivitasResponse.data);

        const jumlahRekapResponse = await axios.get('http://localhost:5000/jumlahRekap');
        setJumlahRekap(jumlahRekapResponse.data.jumlahRekap);
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
      <Row>
        <Col md={3}>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">Menu</Card.Header>
            <Card.Body>
              <Button variant="link" className="d-block">Dashboard</Button>
              <Button variant="link" className="d-block">Pasien</Button>
              <Button variant="link" className="d-block">Dokter</Button>
              <Button variant="link" className="d-block">Jadwal</Button>
              <Button variant="link" className="d-block">Laporan</Button>
              <Button variant="link" className="d-block">Pengaturan</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9}>
          <Row>
            <Col md={4}>
              <Card className="mb-4 text-center">
                <Card.Body>
                  <Card.Title>Jumlah Pasien</Card.Title>
                  <Card.Text>
                    {loading ? 'Loading...' : pasien.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 text-center">
                <Card.Body>
                  <Card.Title>Jumlah Dokter</Card.Title>
                  <Card.Text>
                    {loading ? 'Loading...' : dokter.length}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4 text-center">
                <Card.Body>
                  <Card.Title>Jumlah Rekap</Card.Title>
                  <Card.Text>
                    {loading ? 'Loading...' : jumlahRekap}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">Aktivitas Terbaru</Card.Header>
            <Card.Body>
              <ul>
                {loading ? (
                  <li>Loading...</li>
                ) : (
                  aktivitasTerbaru.length === 0 ? (
                    <li>Tidak ada aktivitas terbaru</li>
                  ) : (
                    aktivitasTerbaru.map((aktivitas, index) => (
                      <li key={index}>Pendaftaran Pasien Baru: {aktivitas.name},<b>keluhan: {aktivitas.keluhan}</b></li>
                    ))
                  )
                )}
              </ul>
            </Card.Body>
          </Card>
          <Row>
            {dokter.map((item) => (
              <Col md={4} key={item.id}>
                <Card className="mb-5 text-center mt-5">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      Email: {item.email}<br />
                      Spesialis: {item.spesialis}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <img src={`http://localhost:5000/images/dokter/${item.foto}`} alt={`Foto ${item.name}`} style={{ maxWidth: '100%' }} />
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
