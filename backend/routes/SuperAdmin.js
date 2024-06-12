import express from "express";
import { createObat, getObat, deleteObat } from "../controllers/Obat.js";

const route = express.Router();

route.post('/obat', createObat);
route.get('/obat', getObat);
route.delete('/deleteObat/:id', deleteObat);

export default route;