import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Dashboard = () => {
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
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Jumlah Pasien</Card.Title>
                  <Card.Text>
                    120
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Jumlah Dokter</Card.Title>
                  <Card.Text>
                    15
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-4">
                <Card.Body>
                  <Card.Title>Jadwal Hari Ini</Card.Title>
                  <Card.Text>
                    8
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Card className="mb-4">
            <Card.Header className="bg-primary text-white">Aktivitas Terbaru</Card.Header>
            <Card.Body>
              <ul>
                <li>Pendaftaran Pasien Baru: John Doe</li>
                <li>Jadwal Pertemuan dengan Dokter: Dr. Smith</li>
                <li>Update Laporan Keuangan</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
