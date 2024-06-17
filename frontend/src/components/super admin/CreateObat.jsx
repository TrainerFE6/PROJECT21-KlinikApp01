import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const BuatObat = () => {
  const [nameObat, setNameObat] = useState('');
  const [jenisObat, setJenisObat] = useState('');
  const [stok, setStok] = useState('');
  const [harga, setHarga] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/obat', {
        name_obat: nameObat,
        Jenis_obat: jenisObat,
        stok: stok,
        harga: harga
      });
      setSuccessMsg(response.data);
      setErrorMsg('');
      setNameObat('');
      setJenisObat('');
      setStok('');
      setHarga('');
      navigate('/ObatAdmin')
    } catch (error) {
      setErrorMsg(error.response?.data || 'Error creating data obat');
      setSuccessMsg('');
    }
  };

  return (
    <div className="container mt-5">
      <Link to={'/ObatAdmin'} className='btn btn-danger'>Kembali</Link>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h2>Buat Data Obat</h2>
            </div>
            <div className="card-body">
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nameObat">Nama Obat</label>
                  <input
                    type="text"
                    id="nameObat"
                    className="form-control"
                    value={nameObat}
                    onChange={(e) => setNameObat(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jenisObat">Jenis Obat</label>
                  <input
                    type="text"
                    id="jenisObat"
                    className="form-control"
                    value={jenisObat}
                    onChange={(e) => setJenisObat(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="stok">Stok</label>
                  <input
                    type="number"
                    id="stok"
                    className="form-control"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="harga">Harga</label>
                  <input
                    type="number"
                    id="harga"
                    className="form-control"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block mt-3">
                  Buat
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatObat;
