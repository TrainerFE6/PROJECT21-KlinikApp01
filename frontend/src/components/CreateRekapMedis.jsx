import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CreateRekapMedis = () => {
  const { noantrian } = useParams();
  const [formData, setFormData] = useState({
    nama_pasien: '',
    nama_dokter: '',
    keluhan_pasien: '',
    obat_pasien: '',
    jenis_pemeriksaan: '',
    hasil_pemeriksaan: '',
    pesan: '',
    biayaPemeriksaan: '',
  });
  const [pasienData, setPasienData] = useState(null);
  const [obatList, setObatList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPasienData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/skeduleId/${noantrian}`, {
          withCredentials: true
        });
        setPasienData(response.data);
        setFormData((prevData) => ({
          ...prevData,
          nama_pasien: response.data.namepasien,
          nama_dokter: response.data.namedokter,
          keluhan_pasien: response.data.title,
          jenis_pemeriksaan: response.data.dokterSpesialis
        }));
      } catch (error) {
        setErrorMessage('Gagal mengambil data pasien');
      }
    };

    const fetchObatList = async () => {
      try {
        const response = await axios.get('http://localhost:5000/obat', {
          withCredentials: true
        });
        setObatList(response.data);
      } catch (error) {
        setErrorMessage('Gagal mengambil data obat');
      }
    };

    fetchPasienData();
    fetchObatList();
  }, [noantrian]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/rekapmedis', formData, {
        withCredentials: true
      });
      console.log(response.data);
      navigate('/RekapMedis'); // Ganti dengan path yang sesuai untuk halaman sukses
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
      } else {
        setErrorMessage('Gagal membuat rekap medis, silakan coba lagi');
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Buat Rekap Medis</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {pasienData && (
        <div className="mb-3 card" style={{ backgroundColor: '#E0F7FA', padding: '20px' }}>
          <p><strong>Nama Pasien:</strong> {pasienData.namepasien}</p>
          <p><strong>Keluhan:</strong> {pasienData.title}</p>
          <p><strong>Nama Dokter:</strong> {pasienData.namedokter}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama_pasien" className="form-label">Nama Pasien</label>
          <input
            type="text"
            className="form-control"
            id="nama_pasien"
            name="nama_pasien"
            value={formData.nama_pasien}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="nama_dokter" className="form-label">Nama Dokter</label>
          <input
            type="text"
            className="form-control"
            id="nama_dokter"
            name="nama_dokter"
            value={formData.nama_dokter}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="keluhan_pasien" className="form-label">Keluhan</label>
          <input
            type="text"
            className="form-control"
            id="keluhan_pasien"
            name="keluhan_pasien"
            value={formData.keluhan_pasien}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="jenis_pemeriksaan" className="form-label">Jenis Pemeriksaan</label>
          <input
            type="text"
            className="form-control"
            id="jenis_pemeriksaan"
            name="jenis_pemeriksaan"
            value={formData.jenis_pemeriksaan}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hasil_pemeriksaan" className="form-label">Hasil Pemeriksaan</label>
          <textarea
            className="form-control"
            id="hasil_pemeriksaan"
            name="hasil_pemeriksaan"
            value={formData.hasil_pemeriksaan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="obat_pasien" className="form-label">Obat Pasien</label>
          <select
            className="form-control"
            id="obat_pasien"
            name="obat_pasien"
            value={formData.obat_pasien}
            onChange={handleChange}
            required
          >
            <option value="">Pilih Obat</option>
            {obatList.map((obat) => (
              <option key={obat.name_obat} value={obat.name_obat}>
                {obat.name_obat} - {obat.Jenis_obat} - Stok: {obat.stok}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="pesan" className="form-label">Pesan</label>
          <textarea
            className="form-control"
            id="pesan"
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="biayaPemeriksaan" className="form-label">Biaya Pemeriksaan</label>
          <input
            type="number"
            className="form-control"
            id="biayaPemeriksaan"
            name="biayaPemeriksaan"
            value={formData.biayaPemeriksaan}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Buat Rekap Medis</button>
      </form>
    </div>
  );
};

export default CreateRekapMedis;
