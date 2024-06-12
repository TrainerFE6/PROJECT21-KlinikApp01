import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfileUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(()=>{
    const fetchUserProfile = async()=>{
      try {
        const response = await axios.get('http://localhost:5000/Me', {
          withCredentials: true // memanggil credencial saat mengirimkan API
        });
        setUser(response.data);
      } catch (error) {
        setError('Gagal memuat profile User');
        console.error('Error fetching Users profile:', error.message);

        
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = () =>{
    // tambahkan logika untuk menangani pembaruan profile
    console.log('Mengapdate Profile')
  }

  if(error){
    return <p>{error}</p>
  }
  if(!user){
    return <p>Loading....</p>
  }
  return (
    <div className="container py-5 d-flex justify-content-center align-items-center">
      
          <div className="card text-center" style={{ width: '50%'}}>
            <div className="card-header">
              Profile Perawat
            </div>
            <div className="card-body">
              <img src={`http://localhost:5000/images/${user.foto}`} alt={user.foto} style={{ maxWidth: '150px', height: 'auto', borderRadius:'50%' }}/>
              <h5 className="card-title mt-3">{user.name}</h5>
              <div className="card-text">Email : {user.email}</div>
              <div className="card-text mb-3">Jabatan: {user.role}</div>
              <Link to={`/update-dokter/${user.id}`} className='btn btn-primary'>Update Profile</Link>
            </div>
         
      </div>
    </div>
  );
}

export default ProfileUser;
