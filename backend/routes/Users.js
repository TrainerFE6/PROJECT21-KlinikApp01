import express from 'express';
import { createUser,Login, Me, logout, getAlluser, updateUser, getRole, getUserById, deleteUser} from '../controllers/Users.js';
import { verifyUser } from '../middleware/AuthUser.js';
import { getSkedulePerawat } from '../controllers/Skedule.js';
import { getRekap, updateRekap, getRekapById, getJumlahRekap } from '../controllers/Rekap.js';



const router = express.Router();

router.post('/users', createUser);
router.post('/userLogin',Login);
router.get('/Me', verifyUser,Me);
router.get('/users',getAlluser);
router.get('/user/:id', getUserById)
router.delete('/logout', logout);
router.put('/updateUser/:id',  updateUser);
router.get('/role', getRole);
router.get('/skedule/:namaPasien', getSkedulePerawat);
router.get('/rekap/:name',getRekap);
router.put('/updateRekap/:id', updateRekap);
router.get('/rekapById/:id', getRekapById);
router.get('/jumlahRekap', getJumlahRekap);
router.delete('/LogoutUser', logout);
router.delete('/deleteUser/:id', deleteUser);




export default router;