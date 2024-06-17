import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const RegisterUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    nohandphone:'',
    role: '',
    foto: null
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [role, setRole] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await axios.get('http://localhost:5000/role');
        setRole(response.data);
      } catch (error) {
        setError('Data tidak ditemukan');
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchRole();
  }, []);

  const handleChange = (e) => {
    const value = e.target.type === 'file' ? e.target.files[0] : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSelectChange = (e) => {
    setSelectedRole(e.target.value);
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
    data.append('role', selectedRole);

    try {
      const response = await axios.post('http://localhost:5000/users', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Success:', response);
      alert('Register berhasil!');  // Menampilkan alert setelah pendaftaran berhasil
      setErrorMessage('');
      navigate('/');  // Mengarahkan ke halaman beranda setelah pendaftaran berhasil
    } catch (error) {
      console.error('Error occurred:', error);
      setErrorMessage(error.response ? error.response.data : error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
   
    <div className="register-form" style={{ width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
     
      <h2 className='text-center mb-3'>Register Users</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <Link to={'/PerawatAdmin'} className='btn btn-danger'>Kembali</Link>
      <form onSubmit={handleSubmit} method='post'>
        <div className="form-group">
          <label htmlFor="name">Nama Perawat/Register</label>
          <input type="text" id="name" name='name' value={formData.name} onChange={handleChange} placeholder='Enter Name' style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name='email' value={formData.email} onChange={handleChange} placeholder='Enter Email' style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name='password' value={formData.password} onChange={handleChange} placeholder='*********' style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name='confPassword' value={formData.confPassword} onChange={handleChange} placeholder='*********' style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label htmlFor="nohanphone">No Handphone</label>
          <input type="number" id="nohandphone" name='nohandphone' value={formData.nohandphone} onChange={handleChange} placeholder='No Handphone' style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <div className="form-group">
          <label htmlFor="spesialis">Role</label>
          <select value={selectedRole} onChange={handleSelectChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}>
            <option value="">Pilih Role .....</option>
            {role.map((item) => (
              <option key={item.id} value={item.namarole}>{item.namarole}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input type="file" id="photo" name='foto' onChange={handleChange} style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}>Daftar</button>
      </form>
    </div>
  );
};

export default RegisterUser;
