import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Spesialis = () => {
    const [spesialis, setSpesialis] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSpesialis = async () => {
            try {
                const response = await axios.get('http://localhost:5000/spesialis', { withCredentials: true });
                setSpesialis(response.data);
            } catch (error) {
                setMessage(error.response?.data?.msg || 'Terjadi kesalahan');
            }
        };

        fetchSpesialis();
    }, []);

    const handleSPesialis = () => {
        navigate('/createSPesialis');
    }

    return (
        <div className="container mt-5">
            <Button className='btn btn-primary mb-4' onClick={handleSPesialis}>Spesialis Baru</Button>
            <h2 className='text-center'>Daftar Spesialis Dokter</h2>
            {message && <p>{message}</p>}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Spesialis</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {spesialis.length > 0 ? (
                        spesialis.map((s, index) => (
                            <tr key={s.id}>
                                <td>{index + 1}</td>
                                <td>{s.name || 'N/A'}</td>
                                
                                <td>
                                <Link to={`/hapus-spesialis/${s.id}`} className='btn btn-primary ml-2'> Hapus</Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="text-center">Tidak ada Data Spesialis</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default Spesialis;
