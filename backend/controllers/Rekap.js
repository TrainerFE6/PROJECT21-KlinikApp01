import Rekap from "../models/RekapMedisModels.js";
import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Obat from "../models/ObatModel.js";


export const createRekapMedis = async(req, res)=>{
  if(!req.session.dokterId) return res.status(404).json({msg: "harus ada sesi dokter"});

  try {
    const pasien = await Pasien.findOne({
      where:{
        id: req.params.id
      }
    });

    const dokter = await Dokter.findOne({
      where:{
        id: req.session.Id
      }
    });

    if(!dokter || !pasien) return res.status(404).json({msg:"Failed"});

    const {obat_pasien, hasil_pemeriksaan, pesan} = req.body;

    await Rekap.create({
      nama_pasien: pasien.name,
      nama_dokter: dokter.name,
      keluhan_pasien : pasien.keluhan,
      obat_pasien: obat_pasien,
      hasil_pemeriksaan: hasil_pemeriksaan,
      pesan: pesan
    });

    req.status(200).json({msg: `rekap medis ${pasien.nama_pasien} telah dibuat`});
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message)
  }
}