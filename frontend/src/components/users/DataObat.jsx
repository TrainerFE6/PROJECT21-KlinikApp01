import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const DataObat = () => {
  const [obat, setObat] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await axios.get('http://localhost:5000/obat'); // Replace with your actual endpoint
        setObat(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching schedule');
      }
    };

    fetchObat();
  }, []);

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      {obat.length > 0 ? (
        <div className="row">
          {obat.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card h-100 d-flex align-items-center justify-content-center">
                <div className="card-body text-center">
                  <h5 className="card-title">Nama :{item.name_obat}</h5>
                  <p className="card-text">
                    <strong>Stok: </strong> {item.stok}
                  </p>
                  <p className="card-text">
                    <strong>Harga :</strong> {item.harga}
                  </p>
                  <p className="card-text">
                    <strong>Jenis Obat :</strong> {item.Jenis_obat}
                  </p>
                 

                  <Link to={`/viewObat/${item.id}`} className='btn btn-primary mt-3'>Masukan Kerekap Medis</Link>
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

export default DataObat;
