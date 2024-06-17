import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BuatJadwal = () => {
  const [waktuPelayanan, setWaktuPelayanan] = useState('');
  const [jadwalPelayanan, setJadwalPelayanan] = useState('');
  const [waktuSelesai, setWaktuSelesai] = useState('');
  const [dokterData, setDokterData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();
  const { id } = useParams(); // Get the doctor ID from the URL parameters

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getdokter/${id}`);
        setDokterData(response.data);
      } catch (error) {
        setErrorMsg(error.response?.data?.msg || 'Error fetching data');
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/jadwalDokter/${id}`, {
        waktu_pelayanan: waktuPelayanan,
        waktu_selesai: waktuSelesai,
        jadwal_pelayanan: jadwalPelayanan
      });
      console.log(response.data);
      navigate('/halamanDokter');
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || 'Error creating schedule');
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
          
            <div className="card-header">
            <Link to={`/view-dokter/${id}`} className='btn btn-danger mb-3'>Kembali</Link>
              <h2 className="text-center" style={{ marginLeft:'100px' }}>Buat Jadwal Anda</h2>
            </div>
            <div className="card-body">
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
              {dokterData && (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Nama Dokter</label>
                    <input type="text" id="name" value={dokterData.name} className="form-control" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="spesialis">Spesialis :</label>
                    <input type="text" id="spesialis" value={dokterData.spesialis} className="form-control" disabled />
                  </div>
                  <div className="form-group">
                    <label htmlFor="waktu">Waktu Mulai :</label>
                    <input type="time" id="waktu" value={waktuPelayanan} className="form-control" onChange={(e) => setWaktuPelayanan(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="selesai">Waktu Selesai :</label>
                    <input type="time" id="selesai" value={waktuSelesai} className="form-control" onChange={(e) => setWaktuSelesai(e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="jadwal">Jadwal Pelayanan</label>
                    <input type="text" id="jadwal" value={jadwalPelayanan} className="form-control" onChange={(e) => setJadwalPelayanan(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-block">Save</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuatJadwal;
