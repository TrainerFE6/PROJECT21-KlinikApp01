import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PasienList = () => {
  const [skeduleList, setSkeduleList] = useState([]);
  const [rekapCreated, setRekapCreated] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skeduleDokter', {
          withCredentials: true
        });
        setSkeduleList(response.data);
      } catch (error) {
        if (error.response) {
          setErrorMessage(error.response.data.msg);
        } else {
          setErrorMessage('Gagal mengambil data pasien, silakan coba lagi');
        }
      }
    };

    fetchData();
    const savedRekapCreated = JSON.parse(localStorage.getItem('rekapCreated')) || {};
    setRekapCreated(savedRekapCreated);
  }, []);

  const handleCreateRekapClick = (noantrian) => {
    const updatedRekapCreated = {
      ...rekapCreated,
      [noantrian]: true
    };
    setRekapCreated(updatedRekapCreated);
    localStorage.setItem('rekapCreated', JSON.stringify(updatedRekapCreated));
  };

  return (
    <div className="container mt-5">
      <h2>Daftar SKedule Untuk di Rekap</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No antrian</th>
            <th>Nama</th>
            <th>Nama Pemerikasa</th>
            <th>Keluhan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {skeduleList.map((pasien) => (
            <tr key={pasien.noantrian}>
              <td>{pasien.noantrian}</td>
              <td>{pasien.namePasien}</td>
              <td>{pasien.namedokter}</td>
              <td>{pasien.title}</td>
              <td>
                <Link
                  to={`/create-rekap-medis/${pasien.noantrian}`}
                  className={`btn btn-primary ${rekapCreated[pasien.noantrian] ? 'disabled' : ''}`}
                  onClick={() => handleCreateRekapClick(pasien.noantrian)}
                >
                  {rekapCreated[pasien.noantrian] ? 'Rekap Medis Dibuat' : 'Buat Rekap Medis'}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasienList;
