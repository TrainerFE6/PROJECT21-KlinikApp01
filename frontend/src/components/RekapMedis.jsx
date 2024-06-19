import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const PasienList = () => {
  const [skeduleList, setSkeduleList] = useState([]);
  const [filteredSkeduleList, setFilteredSkeduleList] = useState([]);
  const [rekapCreated, setRekapCreated] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // State untuk input pencarian

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/skeduleDokter', {
          withCredentials: true
        });
        console.log("Data yang diterima dari backend:", response.data);
        setSkeduleList(response.data);
        setFilteredSkeduleList(response.data); // Initialize filtered list with the full data
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

  useEffect(() => {
    // Filter skeduleList berdasarkan searchTerm di semua field
    const filtered = skeduleList.filter((p) =>
      Object.values(p).some(val =>
        String(val).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredSkeduleList(filtered);
  }, [searchTerm, skeduleList]);

  const handleCreateRekapClick = (noantrian) => {
    if (noantrian !== undefined) {
      if (!rekapCreated[noantrian]) {
        const updatedRekapCreated = {
          ...rekapCreated,
          [noantrian]: true
        };
        console.log('Updated rekapCreated:', updatedRekapCreated);
        setRekapCreated(updatedRekapCreated);
        localStorage.setItem('rekapCreated', JSON.stringify(updatedRekapCreated));
        console.log('Saved to localStorage:', JSON.stringify(updatedRekapCreated));
      }
    } else {
      console.error('Invalid noantrian:', noantrian);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Daftar Skedule Untuk di Rekap</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      
      <div className="input-group mb-3">
        <span className="input-group-text">
          <FontAwesomeIcon icon={faSearch} />
        </span>
        <input
          type="text"
          placeholder="Cari Data Pasien..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control search-input"
        />
      </div>

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
          {filteredSkeduleList.map((pasien) => (
            <tr key={pasien.noantrian}>
              <td>{pasien.antrian}</td>
              <td>{pasien.namePasien}</td>
              <td>{pasien.namedokter}</td>
              <td>{pasien.title}</td>
              <td>
                <Link
                  to={`/create-rekap-medis/${pasien.noantrian}`}
                  className={`btn btn-primary ${rekapCreated[pasien.noantrian] ? 'disabled' : ''}`}
                  onClick={(event) => {
                    if (rekapCreated[pasien.noantrian]) {
                      event.preventDefault(); // Prevent link navigation if rekap is already created
                    } else {
                      handleCreateRekapClick(pasien.noantrian);
                    }
                  }}
                >
                  Buat Rekap Medis
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
