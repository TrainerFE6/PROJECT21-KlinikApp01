import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    foto: null,
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:5000/admin', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Success:', response);
      alert('Register berhasil!'); // Menampilkan alert setelah pendaftaran berhasil
      setErrorMessage('');
      navigate('/LoginAdmin'); // Mengarahkan ke halaman beranda setelah pendaftaran berhasil
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Register Admin</h2>
            </div>
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit} method="post">
                <div className="form-group">
                  <label htmlFor="name">Nama Admin</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan Nama"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Masukkan Email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="*********"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confPassword"
                    value={formData.confPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="*********"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Photo:</label>
                  <input
                    type="file"
                    id="photo"
                    name="foto"
                    onChange={handleChange}
                    className="form-control-file"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Daftar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
