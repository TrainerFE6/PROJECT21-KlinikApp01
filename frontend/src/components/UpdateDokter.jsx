import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDokter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dokter, setDokter] = useState({
    name: '',
    email: '',
    spesialis: '',
    password: '',
    confPassword: '',
    foto: ''
  });
  const [spesialisList, setSpesialisList] = useState([]);
  const [foto, setFoto] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDokter = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getdokter/${id}`, {
          withCredentials: true
        });
        setDokter(response.data);
      } catch (error) {
        setError('Gagal memuat data dokter');
        console.error('Error fetching dokter data:', error.message);
      }
    };

    const fetchSpesialisList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/spesialis', {
          withCredentials: true
        });
        setSpesialisList(response.data);
      } catch (error) {
        setError('Gagal memuat daftar spesialis');
        console.error('Error fetching spesialis list:', error.message);
      }
    };

    fetchDokter();
    fetchSpesialisList();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDokter({ ...dokter, [name]: value });
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (dokter.password !== dokter.confPassword) {
      alert('Password dan konfirmasi password tidak cocok.');
      return;
    }

    const data = new FormData();
    data.append('name', dokter.name);
    data.append('email', dokter.email);
    data.append('spesialis', dokter.spesialis);
    data.append('password', dokter.password);
    data.append('confPassword', dokter.confPassword);
    if (foto) {
      data.append('foto', foto);
    }

    try {
      await axios.put(`http://localhost:5000/dokterupdate/${id}`, data, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profil berhasil diperbarui');
      navigate('/dokter');
    } catch (error) {
      setError('Gagal memperbarui profil');
      console.error('Error updating dokter profile:', error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container py-5">
      <h1>Update Profil Dokter</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={dokter.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={dokter.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="spesialis" className="form-label">Spesialis</label>
          <select
            className="form-control"
            id="spesialis"
            name="spesialis"
            value={dokter.spesialis}
            onChange={handleChange}
          >
            <option value="">Pilih Spesialis</option>
            {spesialisList.map((spesialis) => (
              <option key={spesialis.id} value={spesialis.name}>
                {spesialis.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={dokter.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confPassword" className="form-label">Konfirmasi Password</label>
          <input
            type="password"
            className="form-control"
            id="confPassword"
            name="confPassword"
            value={dokter.confPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="foto" className="form-label">Foto</label>
          <input
            type="file"
            className="form-control"
            id="foto"
            name="foto"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateDokter;
