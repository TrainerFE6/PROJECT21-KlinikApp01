import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DataObatAdmin = () => {
  const [obat, setObat] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchObat = async () => {
      try {
        const response = await axios.get('http://localhost:5000/obat');
        setObat(response.data);
      } catch (err) {
        setError(err.response?.data?.msg || 'Error fetching schedule');
      }
    };

    fetchObat();
  }, []);

  const handleDeleteObat = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteObat/${id}`);
      setObat(obat.filter(item => item.id !== id)); // Menghapus obat dari state lokal setelah berhasil dihapus dari server
    } catch (err) {
      setError(err.response?.data?.msg || 'Error deleting obat');
    }
  };

  return (
    <div className="container mt-5">
      <Link to={'/create-obat'} className='btn btn-primary'>Tambahkan Obat</Link>
      {error && <div className="alert alert-danger">{error}</div>}
      {obat.length > 0 ? (
        <div className="row">
          <h2 className='text-center mb-3 mt-3'>Data Obat Rumah Sakit</h2>
          {obat.map((item) => (
            <div className="col-md-4 mb-3" key={item.id}>
              <div className="card h-100 d-flex align-items-center justify-content-center">
                <div className="card-body text-center">
                  <h5 className="card-title">Nama: {item.name_obat}</h5>
                  <p className="card-text"><strong>Stok:</strong> {item.stok}</p>
                  <p className="card-text"><strong>Harga:</strong> {item.harga}</p>
                  <p className="card-text"><strong>Jenis Obat:</strong> {item.Jenis_obat}</p>
                  <button className='btn btn-danger mt-3' onClick={() => handleDeleteObat(item.id)}>Hapus</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada data obat.</p>
      )}
    </div>
  );
};

export default DataObatAdmin;
