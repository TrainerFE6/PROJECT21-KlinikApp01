import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skeduleDokter'); // Replace with your actual endpoint
        setSchedule(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching schedule');
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {schedule.length > 0 ? (
        <div className="row">
          {schedule.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card h-100 d-flex align-items-center justify-content-center">
                <div className="card-body text-center">
                  <h5 className="card-title">{item.namedokter}</h5>
                  <p className="card-text">
                    <strong>Time:</strong> {item.sceduletime}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {item.sceduledate}
                  </p>
                  <p className="card-text">
                    <strong>No antrian:</strong> {item.noantrian}
                  </p>
                  <p className="card-text">
                    <strong>Pacient:</strong> {item.namePasien}
                  </p>

                  <Link to={`/updateSkedule/${item.noantrian}`} className='btn btn-primary mt-3'>Proses Skedule</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
};

export default DoctorSchedule;
