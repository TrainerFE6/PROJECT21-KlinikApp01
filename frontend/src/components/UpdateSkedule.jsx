import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UpdateSkeduleForm = () => {
  const { noantrian } = useParams(); // Get the noantrian from URL params
  const [formData, setFormData] = useState({
    sceduledate: '',
    sceduletime: '',
    namedokter: '',
    namepasien: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the current schedule data
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/skeduleId/${noantrian}`);
        const data = response.data;
        setFormData({
          sceduledate: data.sceduledate,
          sceduletime: data.sceduletime,
          namedokter: data.namedokter,
          namePasien: data.namePasien,
        });
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching schedule');
      }
    };

    fetchSchedule();
  }, [noantrian]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/updateSkedule/${noantrian}`, formData);
      setMessage(response.data.msg);
      setError('');
      
    } catch (err) {
      setError(err.response?.data?.msg || 'Error updating schedule');
      setMessage('');

    }
  };

  return (
    <div className="container mt-5">
      <Link to='/jadwalPemeriksaan' className='btn btn-danger mb-3'>Kembali</Link>
      <h2 className='text-center' style={{ fontSize:'20px', color:'blueviolet'}}>Update Schedule</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="sceduledate" className="form-label">Schedule Date</label>
          <input
            type="text"
            className="form-control"
            id="sceduledate"
            name="sceduledate"
            value={formData.sceduledate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="sceduletime" className="form-label">Schedule Time</label>
          <input
            type="time"
            className="form-control"
            id="sceduletime"
            name="sceduletime"
            value={formData.sceduletime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="namedokter" className="form-label">Doctor's Name</label>
          <input
            type="text"
            className="form-control"
            id="namedokter"
            name="namedokter"
            value={formData.namedokter}
            onChange={handleChange}
            required readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="namepasien" className="form-label">Patient's Name</label>
          <input
            type="text"
            className="form-control"
            id="namepasien"
            name="namepasien"
            value={formData.namePasien}
            onChange={handleChange}
            required readOnly
          />
        </div>
        <input type="hidden" name="noantrian" value={noantrian} />
        <button type="submit" className="btn btn-primary">Update Schedule</button>
      </form>
    </div>
  );
};

export default UpdateSkeduleForm;
