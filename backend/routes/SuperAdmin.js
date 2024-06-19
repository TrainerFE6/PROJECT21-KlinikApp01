import express from "express";
import { createAdmin, LoginAdmin } from "../controllers/Admin.js";
import { createObat, getObat, deleteObat } from "../controllers/Obat.js";
import { getRekapAdmin, deleteRekap, deletePasien } from "../controllers/Rekap.js";

const route = express.Router();

route.post('/admin', createAdmin)
route.post('/LoginAdmin', LoginAdmin);
route.post('/obat', createObat);
route.get('/obat', getObat);
route.delete('/deleteObat/:id', deleteObat);
route.get('/rekapAdmin/:name', getRekapAdmin);
route.delete('/deleteRekap/:id', deleteRekap);
route.delete('/deletePasien/:id', deletePasien);


export default route;