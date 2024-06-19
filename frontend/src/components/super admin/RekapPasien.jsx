import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';

const RekapPasien = () => {
  const { name } = useParams();  // Menggunakan useParams untuk mengambil nama pasien dari URL
  const [rekap, setRekap] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRekap = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rekapAdmin/${name}`);
        setRekap(response.data);
        setError('');
      } catch (err) {
        setError(err.response?.data?.msg || 'Terjadi kesalahan');
        setRekap(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRekap();
  }, [name]);

  const handleDeleteRekap = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteRekap/${id}`);
      setRekap(rekap.filter(item => item.id !== id)); // Menghapus obat dari state lokal setelah berhasil dihapus dari server
      navigate('/PasienAdmin')
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting Users');
    }
  };

  const proses2 = rekap?.isProcessed ? 'sudah di periksa' : 'belum di periksa';

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md="8">
          {loading && (
            <div className="text-center my-5">
              <Spinner animation="border" variant="primary" />
              <p>Loading data...</p>
            </div>
          )}
          {!loading && error && (
            <Alert variant="danger">
              {error}
            </Alert>
          )}
          {!loading && rekap && (
            <Card className="shadow-sm">
              <Card.Header className="bg-primary text-white">
                Rekap Medis {rekap.nama_pasien}
              </Card.Header>
              <Card.Body>
                <Card.Title>
                  <i className="bi bi-person-fill"></i> Dokter Pemeriksa: Dr. {rekap.nama_dokter}
                </Card.Title>
                <Card.Title>
                  <i className="bi bi-exclamation-triangle-fill"></i> Keluhan Pasien: {rekap.keluhan_pasien}
                </Card.Title>
                <Card.Title>
                  <i className="bi bi-capsule"></i> Obat Yang digunakan: {rekap.Obat_pasien}
                </Card.Title>
                <Card.Text>
                  <strong>Jenis Pemeriksaan:</strong> {rekap.jenis_pemeriksaan}<br/>
                  <strong>Pesan:</strong> {rekap.pesan}<br/>
                  <strong>Hasil Pemeriksaan:</strong> {rekap.hasil_pemeriksaan}<br/>
                  <strong>Biaya Pemeriksaan:</strong> Rp. {rekap.biayaPemeriksaan} <br/>
                  <strong>Status Rekap :</strong> {proses2}

                </Card.Text>
                <button className='btn btn-danger mt-3' onClick={() => handleDeleteRekap(rekap.id)}>Hapus</button>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
      <Link to={'/PasienAdmin'} className='btn btn-muted'>Kembali</Link>
    </Container>
  );
};

export default RekapPasien;
