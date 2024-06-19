import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const CreateSkeduleButton = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const createSkedulePasien = async () => {
    setIsLoading(true);
    try {
      // Mengirimkan permintaan ke backend untuk membuat skedule pasien
      const response = await axios.post(`http://localhost:5000/skedulePasien/${id}`);
      setMessage(response.data.msg);
    } catch (error) {
      setMessage(error.response?.data?.msg || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
      // Redirect ke halaman lain jika diperlukan setelah skedule dibuat
      navigate('/dokter/dataPasien');
    }
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {message && <p>{message}</p>}
      <Button variant="danger" onClick={createSkedulePasien} disabled={isLoading}>
        {isLoading ? 'Membuat Skedule...' : 'Buat Skedule'}
      </Button>
    </div>
  );
};

export default CreateSkeduleButton;
