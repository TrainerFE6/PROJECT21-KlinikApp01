import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const DashboardDokter = () => {
  const [skedule, setSkedule] = useState([]);
  const [pasien, setPasien] = useState([]);
  const [jumlahRekap, setJumlahRekap] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [aktivitasTerbaru, setAktivitasTerbaru] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skeduleResponse = await axios.get('http://localhost:5000/skeduleDokter');
        setSkedule(skeduleResponse.data);

        const pasienResponse = await axios.get('http://localhost:5000/pasienDokter');
        setPasien(pasienResponse.data);

        const aktivitasResponse = await axios.get('http://localhost:5000/aktivitasDokter');
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
            <Card.Header className="bg-primary text-white">Menu Halaman</Card.Header>
            <Card.Body>
              <Button variant="link" className="d-block">Dashboard</Button>
              <Button variant="link" className="d-block">My Schedule</Button>
              <Button variant="link" className="d-block">Jadwal Pemeriksaan</Button>
              <Button variant="link" className="d-block">Data Pasien</Button>
              <Button variant="link" className="d-block">Rekap Medis</Button>
              <Button variant="link" className="d-block">Profile</Button>
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
                  <Card.Title>Jumlah Jadwal Perawatan</Card.Title>
                  <Card.Text>
                    {loading ? 'Loading...' : skedule.length}
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
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardDokter;
