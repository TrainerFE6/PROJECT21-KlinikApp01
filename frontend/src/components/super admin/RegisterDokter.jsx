import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterDokter = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    foto: null
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [spesialis, setSpesialis] = useState([]);
  const [selectedSpesialis, setSelectedSpesialis] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpesialis = async () => {
      try {
        const response = await axios.get('http://localhost:5000/spesialis');
        setSpesialis(response.data);
      } catch (error) {
        setError('Data tidak ditemukan');
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchSpesialis();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSelectChange = (e) => {
    setSelectedSpesialis(e.target.value);
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
    data.append('spesialis', selectedSpesialis);

    try {
      const response = await axios.post('http://localhost:5000/dokter', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response);
      alert('Register berhasil!');  // Menampilkan alert setelah pendaftaran berhasil
      setErrorMessage('');
      navigate('/halamanDokter');  // Mengarahkan ke halaman beranda setelah pendaftaran berhasil
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage(error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <Link to={'/halamanDokter'} className='btn btn-danger mb-3'>Kembali</Link>
          <div className="card">
            <div className="card-header">
              
              <h2 className="text-center">Register Dokter</h2>
            </div>
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <form onSubmit={handleSubmit} method='post'>
                <div className="form-group">
                  <label htmlFor="name">Nama Dokter</label>
                  <input type="text" id="name" name='name' value={formData.name} onChange={handleChange} className="form-control" placeholder='Masukkan Nama' />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} className="form-control" placeholder='Masukkan Email' />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input type="password" id="password" name='password' value={formData.password} onChange={handleChange} className="form-control" placeholder='*********' />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password:</label>
                  <input type="password" id="confirmPassword" name='confPassword' value={formData.confPassword} onChange={handleChange} className="form-control" placeholder='*********' />
                </div>
                <div className="form-group">
                  <label htmlFor="spesialis">Spesialis:</label>
                  <select value={selectedSpesialis} onChange={handleSelectChange} className="form-control">
                    <option value="">Pilih Spesialis .....</option>
                    {spesialis.map((item) => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="photo">Photo:</label>
                  <input type="file" id="photo" name='foto' onChange={handleChange} className="form-control-file" />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Daftar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterDokter;
