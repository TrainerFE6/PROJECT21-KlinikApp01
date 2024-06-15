import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const RegisterSpesialis = () => {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/spesialis', { name });
      setSuccessMessage(response.data.msg);
      setErrorMessage('');
      setName('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.msg : error.message);
      setSuccessMessage('');
    }
  };

  return (
    <Container className="mt-5">
      <h2>Register Spesialis</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nama Spesialis</Form.Label>
          <Form.Control
            type="text"
            placeholder="Masukkan Nama Spesialis"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Simpan
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterSpesialis;
