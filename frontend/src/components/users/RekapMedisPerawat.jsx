import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RekapMedisPerawat = () => {
    const [pasiens, setPasiens] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPasiens = async () => {
            try {
                const response = await axios.get('http://localhost:5000/pasienPerawat', { withCredentials: true });
                setPasiens(response.data);
            } catch (error) {
                setMessage(error.response?.data?.msg || 'Terjadi kesalahan');
            }
        };

        fetchPasiens();
    }, []);

    const handleCreatePasient = () => {
        navigate('/createPasien');
    }

    return (
        <div className="container mt-5">
            
            <h2 className='text-center'>Rekap Medis Pasien</h2>
            {message && <p>{message}</p>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama</th>
                        <th>Alamat</th>
                        <th>Tanggal Lahir</th>
                        <th>No Handphone</th>
                        <th>Keluhan</th>
                        <th>Dokter Spesialis</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pasiens.length > 0 ? (
                        pasiens.map((pasien, index) => (
                            <tr key={pasien.uuid}>
                                <td>{index + 1}</td>
                                <td>{pasien.name || 'N/A'}</td>
                                <td>{pasien.alamat || 'N/A'}</td>
                                <td>{new Date(pasien.ttl).toLocaleDateString() || 'N/A'}</td>
                                <td>{pasien.nohandphone || 'N/A'}</td>
                                <td>{pasien.keluhan || 'N/A'}</td>
                                <td>{pasien.dokterSPesialis || 'N/A'}</td>
                                <td>
                                <Link to={`/view-rekap-medis/${pasien.name}`} className='btn btn-primary ml-2'> Rekap Medis</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Tidak ada data pasien</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default RekapMedisPerawat;
