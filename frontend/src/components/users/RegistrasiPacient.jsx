import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const RegisterPasien = () => {
    const [formData, setFormData] = useState({
        name: '',
        alamat: '',
        ttl: '',
        nohandphone: '',
        keluhan: '',
        dokterSpesialis: ''
    });

    const [dokters, setDokters] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const { name, alamat, ttl, nohandphone, keluhan, dokterSpesialis } = formData;

    useEffect(() => {
        const fetchDokters = async () => {
            try {
                const response = await axios.get('http://localhost:5000/dokter');
                setDokters(response.data);
            } catch (error) {
                console.error('Error fetching dokter:', error);
            }
        };

        fetchDokters();
    }, []);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/pasien', formData, { withCredentials: true });
            setMessage(response.data.msg);
        } catch (error) {
            setMessage(error.response?.data?.msg || 'Terjadi kesalahan');
        }
    };

    const kembaliPasien = () => {
        navigate('/Pacient');
    };

    return (
        <Container className="mt-5">
            <Button variant="danger" className="mb-4" onClick={kembaliPasien}>Kembali</Button>
            <h2 className="text-center">Registrasi Pasien</h2>
            {message && <p className="text-center text-danger">{message}</p>}
            <Form onSubmit={onSubmit}>
                <Form.Group as={Row} controlId="name" className="mb-3">
                    <Form.Label column sm="2">Nama</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="alamat" className="mb-3">
                    <Form.Label column sm="2">Alamat</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="alamat"
                            value={alamat}
                            onChange={onChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="ttl" className="mb-3">
                    <Form.Label column sm="2">Tanggal Lahir</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="date"
                            name="ttl"
                            value={ttl}
                            onChange={onChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="nohandphone" className="mb-3">
                    <Form.Label column sm="2">No Handphone</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="nohandphone"
                            value={nohandphone}
                            onChange={onChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="keluhan" className="mb-3">
                    <Form.Label column sm="2">Keluhan</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="keluhan"
                            value={keluhan}
                            onChange={onChange}
                            required
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} controlId="dokterSpesialis" className="mb-3">
                    <Form.Label column sm="2">Dokter Spesialis</Form.Label>
                    <Col sm="10">
                        <Form.Control
                            as="select"
                            name="dokterSpesialis"
                            value={dokterSpesialis}
                            onChange={onChange}
                            required
                        >
                            <option value="">Pilih Dokter Spesialis</option>
                            {dokters.map(dokter => (
                                <option key={dokter.id} value={dokter.spesialis}>
                                    {dokter.name} - {dokter.spesialis}
                                </option>
                            ))}
                        </Form.Control>
                    </Col>
                </Form.Group>
                <Button type="submit" className="btn btn-primary">Daftar</Button>
            </Form>
        </Container>
    );
};

export default RegisterPasien;
