import express from 'express';
import { RegisterPasien, getPasienByPerawat, getPasienBydokter, getPasienById, getPasienBaru, getAllPasien , getPasienBaruDokter} from '../controllers/Pasien.js';
import { verifyUser, RegisterOnly } from '../middleware/AuthUser.js';
import { verifyDokter } from '../middleware/AuthDokter.js';
import { getSkedule } from '../controllers/Skedule.js';



const router = express.Router();

router.post('/pasien', RegisterPasien);
router.get('/pasienPerawat',  verifyUser,getPasienByPerawat);
router.get('/pasienDokter', getPasienBydokter)
router.get('/pasien/:id',  getPasienById);
router.get('/skedulePasien/:id', verifyUser, getSkedule);
router.get('/aktivitasTerbaru', getPasienBaru);
router.get('/getPasien', getAllPasien);
router.get('/aktivitasDokter', getPasienBaruDokter);

export default router;
