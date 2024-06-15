import express from 'express';
import { createDokter, LoginDokter, MeDokter, getDokterById, updateDokter, deleteDokter, getDokter, createJadwal, updateJadwal,getJadwalDokter,getSpesialis, createSpesialis, getJadwalById} from '../controllers/Dokter.js';
import { SkedulePasien, getSkeduleDokter, updateSkedule, getSkeduleById } from '../controllers/Skedule.js';
import { createRekapMedis } from '../controllers/Rekap.js';

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
route.get('/jadwalDokter/:id', getJadwalById);
route.put('/jadwal/:id', updateJadwal);
route.post('/skedulePasien/:id', verifyDokter,SkedulePasien);
route.get('/spesialis', getSpesialis);
route.post('/spesialis', createSpesialis);
route.get('/getdokter/:id', getDokterById);
route.get('/skeduleDokter', getSkeduleDokter);
route.put('/updateSkedule/:noantrian', updateSkedule);
route.get('/skeduleId/:noantrian', getSkeduleById);
route.post('/rekapmedis', createRekapMedis);





export default route;