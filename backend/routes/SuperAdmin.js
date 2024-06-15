import express from "express";
import { createAdmin, LoginAdmin } from "../controllers/Admin.js";
import { createObat, getObat, deleteObat } from "../controllers/Obat.js";

const route = express.Router();

route.post('/admin', createAdmin)
route.post('/LoginAdmin', LoginAdmin);
route.post('/obat', createObat);
route.get('/obat', getObat);
route.delete('/deleteObat/:id', deleteObat);

export default route;