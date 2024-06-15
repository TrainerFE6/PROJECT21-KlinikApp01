import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const UpdateJadwalForm = () => {
  const { id } = useParams(); // Mengambil id dari URL
  const [formData, setFormData] = useState({
    waktu_pelayanan: '',
    waktu_selesai: '',
    jadwal_pelayanan: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing jadwal data based on id
    const fetchJadwal = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/jadwalDokter/${id}`);
        setFormData(response.data);
      } catch (err) {
        setError('Failed to fetch jadwal data');
      }
    };

    fetchJadwal();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/jadwal/${id}`, formData);
      navigate('/pemeriksaan'); // Redirect to jadwal dokter page after successful update
    } catch (err) {
      setError('Failed to update jadwal');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Jadwal</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="waktu_pelayanan">Waktu Pelayanan</label>
          <input
            type="time"
            className="form-control"
            id="waktu_pelayanan"
            name="waktu_pelayanan"
            value={formData.waktu_pelayanan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="waktu_selesai">Waktu Selesai</label>
          <input
            type="time"
            className="form-control"
            id="waktu_selesai"
            name="waktu_selesai"
            value={formData.waktu_selesai}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jadwal_pelayanan">Jadwal Pelayanan</label>
          <input
            type="text"
            className="form-control"
            id="jadwal_pelayanan"
            name="jadwal_pelayanan"
            value={formData.jadwal_pelayanan}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update Jadwal</button>
      </form>
    </div>
  );
};

export default UpdateJadwalForm;
