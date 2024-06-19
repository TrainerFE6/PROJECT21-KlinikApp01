import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DoctorSchedule = () => {
  const [schedule, setSchedule] = useState([]);
  const [error, setError] = useState('');

  const fetchSchedule = async () => {
    try {
      const response = await axios.get('http://localhost:5000/skeduleDokter');
      setSchedule(response.data);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error fetching schedule');
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleDelete = async (namePasien) => {
    try {
      await axios.delete(`http://localhost:5000/deleteSkedule/${namePasien}`);
      // Setelah berhasil menghapus, ambil kembali jadwal terbaru dari server
      fetchSchedule();
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting schedule');
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {schedule.length > 0 ? (
        <div className="row">
          {schedule.map((item) => (
            <div className="col-md-4 mb-3" key={item.noantrian}>
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
                    <strong>No antrian:</strong> {item.antrian}
                  </p>
                  <p className="card-text">
                    <strong>Patient:</strong> {item.namePasien}
                  </p>

                  {/* Tombol untuk hapus jadwal */}
                  <button
                    onClick={() => handleDelete(item.namePasien)}
                    className="btn btn-danger mt-3"
                  >
                    Delete Schedule
                  </button>

                  <Link
                    to={`/updateSkedule/${item.noantrian}`}
                    className="btn btn-primary mt-3 ms-2"
                  >
                    Process Schedule
                  </Link>
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
