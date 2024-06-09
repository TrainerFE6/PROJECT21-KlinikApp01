import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dokter = () => {
  const [dokter, setDokter] = useState(null);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchDokterProfile = async()=>{
      try {
        const response = await axios.get('http://localhost:5000/dokterLogin', {
          withCredentials: true // memanggil credencial saat mengirimkan API
        });
        setDokter(response.data);
      } catch (error) {
        setError('Gagal memuat profile dokter');
        console.error('Error fetching dokter profile:', error.message);

        
      }
    };
    fetchDokterProfile();
  }, []);

  const handleUpdateProfile = () =>{
    // tambahkan logika untuk menangani pembaruan profile
    console.log('Mengapdate Profile')
  }

  if(error){
    return <p>{error}</p>
  }
  if(!dokter){
    return <p>Loading....</p>
  }
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      
          <div className="card text-center" style={{ width: '50%'}}>
            <div className="card-header">
              Profile Dokter
            </div>
            <div className="card-body">
              <img src={`http://localhost:5000/images/dokter/${dokter.foto}`} alt={dokter.foto} style={{ maxWidth: '150px', height: 'auto', borderRadius:'50%' }}/>
              <h5 className="card-title mt-3">{dokter.name}</h5>
              <div className="card-text">Email : {dokter.email}</div>
              <div className="card-text mb-3">Spessialis: {dokter.spesialis}</div>
              <Link to={`/update-dokter/${dokter.id}`} className='btn btn-primary'>Update Profile</Link>
            </div>
         
      </div>
    </div>
  );
}

export default Dokter;
