import express from 'express';
import { createDokter, LoginDokter, MeDokter} from '../controllers/Dokter.js';
import { RegisterPasien } from '../controllers/Pasien.js';
import { verifyDokter } from '../middleware/AuthDokter.js';

const route = express.Router();

route.post('/dokter', createDokter);
route.post('/LoginDokter', LoginDokter);
route.get('/dokterLogin', MeDokter);


export default route;