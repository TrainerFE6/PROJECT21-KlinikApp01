import { where } from "sequelize";
import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";


export const sessionPasien = async(req, res)=>{
  // if(!req.session.dokterId) res.status(404).json({msg: "Session dokter tidak terdeteksi"});
  // const IdDokter = req.session.id;
  // const dokter = await Dokter.findOne({
  //   where:{
  //     id: IdDokter
  //   }
  // });

  // const pasien = await Pasien.findOne({
  //   where:{
  //     id: req.params.id
  //   }
  // });


}

const skedulePasien = async(req, res)=>{
  
}