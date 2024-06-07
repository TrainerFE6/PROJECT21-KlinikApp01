import React, { useState } from 'react';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [phone, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validasi sederhana
    if (name === '' || email === '' || password === '' || confirmPassword === '' || phone === '') {
      setErrorMessage('Semua field harus diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password harus sama.');
      return;
    }
    // Logika registrasi bisa ditambahkan di sini, misalnya memanggil API
    console.log('Registrasi berhasil dengan data:', { name, email, password, photo, phone });
    // Reset form setelah submit
    setName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setPhoto(null);
    setPhone('');
    setErrorMessage('');
  };

  return (
    <div className="register-form" style={{ width: '300px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <h2>Register</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
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
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', border: 'none', color: 'white', borderRadius: '5px', cursor: 'pointer', marginTop: '15px' }}>Daftar</button>
      </form>
    </div>
  );
};

export default RegisterForm;
