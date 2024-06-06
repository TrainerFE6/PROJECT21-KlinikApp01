import express from 'express';
import { createDokter, LoginDokter, MeDokter, updateDokter, deleteDokter, getDokter, createJadwal} from '../controllers/Dokter.js';
import { RegisterPasien } from '../controllers/Pasien.js';
import { verifyDokter } from '../middleware/AuthDokter.js';

const route = express.Router();

route.post('/dokter', createDokter);
route.post('/LoginDokter', LoginDokter);
route.get('/dokterLogin', MeDokter);
route.put('/dokterupdate/:id', verifyDokter, updateDokter);
route.delete('/dokterdelete/:id', deleteDokter);
route.get('/dokter', getDokter);
route.post('/jadwalDokter', createJadwal)



export default route;