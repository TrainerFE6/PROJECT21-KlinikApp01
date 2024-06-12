import express from 'express';
import { createDokter, LoginDokter, MeDokter, getDokterById, updateDokter, deleteDokter, getDokter, createJadwal, getJadwalDokter,getSpesialis, createSpesialis} from '../controllers/Dokter.js';
import { SkedulePasien } from '../controllers/Skedule.js';

import { verifyDokter, } from '../middleware/AuthDokter.js';

const route = express.Router();

route.post('/dokter', createDokter);
route.post('/LoginDokter', LoginDokter);
route.get('/dokterLogin', MeDokter);
route.put('/dokterupdate/:id', verifyDokter, updateDokter);
route.delete('/dokterdelete/:id', deleteDokter);
route.get('/dokter', getDokter);
route.post('/jadwalDokter', createJadwal);
route.get('/jadwalDokter', getJadwalDokter);
route.post('/skedulePasien/:id', verifyDokter,SkedulePasien);
route.get('/spesialis', getSpesialis);
route.post('/spesialis', createSpesialis);
route.get('/getdokter/:id', getDokterById);




export default route;