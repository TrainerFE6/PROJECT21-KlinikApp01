import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
   try {
    const response = await axios.post("http://localhost:5000/LoginDokter", {
      email,
      password,
    });
    console.log(response.data);
    localStorage.setItem('dokterData', JSON.stringify(response.data))
    // simpan data dokter ke state atau localStorage sesuai kebutuhan
    navigate('/dahsboardDokter'); 
   } catch (error) {
    if(error.response){
      setErrorMessage(error.response.data.msg);
    }else{
      setErrorMessage('Login Gagal , silahkan coba lagi')
    }
   }
  };

  return (
    <div className="login-form" style={{ width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h2>Login Dokter</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
