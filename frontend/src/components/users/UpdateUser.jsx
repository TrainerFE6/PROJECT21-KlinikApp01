import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confPassword: '',
    foto: null,
    nohandphone: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [roleList, setRoleList] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${id}`, {
          withCredentials: true
        });
        setUser(response.data);
      } catch (error) {
        setError('Gagal memuat data pengguna');
        console.error('Error fetching user data:', error.message);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:5000/role', {
          withCredentials: true
        });
        setRoleList(response.data);
      } catch (error) {
        setError('Gagal memuat daftar roles');
        console.error('Error fetching roles:', error.message);
      }
    };

    fetchUser();
    fetchRoles();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    setUser({ ...user, foto: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confPassword) {
      alert('Password dan konfirmasi password tidak cocok.');
      return;
    }

    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confPassword', user.confPassword);
    formData.append('foto', user.foto);
    formData.append('nohandphone', user.nohandphone);
    formData.append('role', user.role);

    try {
      await axios.put(`http://localhost:5000/updateUser/${id}`, formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profil pengguna berhasil diperbarui');
      navigate('/profileUser');
    } catch (error) {
      setError('Gagal memperbarui profil pengguna');
      console.error('Error updating user profile:', error.message);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container py-5">
      <Link to={'/profileUser'} className='btn btn-danger'>Kembali</Link>
      <h1 className='text-center'>Update Profil Pengguna</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nama</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={user.name}
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
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            autoComplete='new-password'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confPassword" className="form-label">Konfirmasi Password</label>
          <input
            type="password"
            className="form-control"
            id="confPassword"
            name="confPassword"
            value={user.confPassword}
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
        <div className="mb-3">
          <label htmlFor="nohandphone" className="form-label">No Handphone</label>
          <input
            type="text"
            className="form-control"
            id="nohandphone"
            name="nohandphone"
            value={user.nohandphone}
            onChange={handleChange}
          />
</div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <select
            className="form-control"
            id="role"
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option value="">Pilih Role</option>
            {roleList.map((role) => (
              <option key={role.id} value={role.namarole}>
                {role.namarole}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default UpdateUser;
