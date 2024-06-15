import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UpdateRekapPerawat = () => {
  const { id } = useParams(); // Get the id from URL params
  const [formData, setFormData] = useState({
    biaya_obat: '',
    biaya_pemeriksaan: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the current rekap data
    const fetchRekap = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/rekapById/${id}`);
        const data = response.data;
        setFormData({
          biaya_pemeriksaan: data.biayaPemeriksaan || '',
          nama_pasien : data.nama_pasien,
          biaya_obat: formData.biaya_obat // Pastikan tidak mengubah nilai biaya_obat di sini
        });
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching rekap');
      }
    };

    fetchRekap();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/updateRekap/${id}`, formData);
      setMessage(response.data.msg);
      setError('');
    } catch (err) {
      setError(err.response?.data?.msg || 'Error updating rekap');
      setMessage('');
    }
  };

  return (
    <div className="container mt-5">
      <Link to={`/view-rekap-medis/${formData.nama_pasien}`} className='btn btn-danger mb-3'>Kembali</Link>
      <h2 className='text-center' style={{ fontSize: '20px', color: 'blueviolet' }}>Proses Rekap</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="biaya_pemeriksaan" className="form-label">Biaya Pemeriksaan</label>
          <input
            type="number"
            className="form-control"
            id="biaya_pemeriksaan"
            name="biaya_pemeriksaan"
            value={formData.biaya_pemeriksaan}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="biaya_obat" className="form-label">Biaya Obat</label>
          <input
            type="number"
            className="form-control"
            id="biaya_obat"
            name="biaya_obat"
            value={formData.biaya_obat}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default UpdateRekapPerawat;
