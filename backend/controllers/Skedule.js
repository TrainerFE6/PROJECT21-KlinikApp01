import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";
import JadwalDokter from "../models/JadwalDokter.js";
import Users from "../models/UsersModel.js";
import { updateDokter } from "./Dokter.js";

export const SkedulePasien = async(req, res) => {
  if(!req.session.dokterId) return res.status(404).json({msg: "Session dokter tidak valid"});

  const id = req.session.Id;

  try {
    const dokter = await Dokter.findOne({
      where: { id }
    });
    if (!dokter) return res.status(404).json({ msg: "Dokter tidak ditemukan" });

    const jadwal = await JadwalDokter.findOne({
      where: { nama_dokter: dokter.name }
    });
    if (!jadwal) return res.status(404).json({ msg: "Jadwal dokter tidak ditemukan" });

    const pasien = await Pasien.findOne({
      where: { id: req.params.id }
    });
    if (!pasien) return res.status(404).json({ msg: "Pasien tidak ditemukan" });

    const count = await Skedule.count();
    const noantrian = count +1;

    await Skedule.create({
      noantrian: noantrian,
      title: pasien.keluhan,
      sceduledate: jadwal.jadwal_pelayanan,
      sceduletime: jadwal.waktu_pelayanan,
      namedokter: jadwal.nama_dokter,
      dokterSpesialis: jadwal.spesialis,
      namePasien: pasien.name
    });

    res.status(200).json({ msg: "Skedule pasien dibuat" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}


export const getSkedule = async(req, res)=>{
  const pasien = await Pasien.findOne({
    where:{
      id: req.params.id
    }
  });

  if(!pasien){
    console.log("Data Pasien tidak ditemukan ");
    return res.status(404).json({msg: "Data Pasien Invalid"});
  }

  const namaPasien = pasien.name;
  if(!namaPasien){
    return res.status(402).json({msg: "Pasien Belum Memmiliki jadwal"})
  }

  try {
    const skedulePasien = await Skedule.findOne({
      where:{
        namePasien: namaPasien
      }
    });

    res.status(200).json(skedulePasien);
  } catch (error) {
    console.log(error)
    res.status(500).json({msg: "server error"});
  }
}



export const getSkedulePerawat = async(req, res) => {
  if (!req.session.userId) return res.status(404).json({ msg: "fitur ini membutuhkan sesi" });

  try {
    const skedule = await Skedule.findOne({
      where: {
        namePasien: req.params.namaPasien
      }
    });

    // Perbaikan logika pengecekan skedule
    if (!skedule) {
      return res.status(404).json({ msg: "skedule belum dibuat" });
    }

    res.status(200).json(skedule);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Terjadi kesalahan di server" });
  }
};


export const getSkeduleDokter = async(req, res)=>{
  if(!req.session.Id) return res.status(404).json({msg: "fitur ini membutuhkan sesi"});
  try {
    const id = req.session.Id;
    const dokter = await Dokter.findOne({
      where:{
        id: id
      }
    });
    console.log(dokter.name)
    if(!dokter){
      console.log("data dokter tidak ditemukan");
      return res.status(404).json({msg: "Data dokter tidak ditemukan"});

    }

    const skedule = await Skedule.findAll({
      where:{
        namedokter: dokter.name
      }
    });

    res.status(200).json(skedule);

  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}







export const deleteScedule = async(req, res)=>{
  const skedule = await Skedule.findOne({
    where:{
      id: req.params.id
    }
  });

  if(!skedule) return res.status(404).json({msg: "skedule untuk pasien belum tersedia"});

  try {
    await Skedule.destroy({
      where:{
        id: req.params.id
      }
    });
    res.status(200).json({msg: `skedule ${skedule.namePasien} telah dihapus`});
  } catch (error) {
    res.status(500).json({msg: "server error"});
  }

}


export const updateSkedule = async(req, res)=>{
  if(!req.session.Id) return res.status(404).json({msg: "fitur ini membutuhkan sesi"});

  try {
    const {sceduledate, sceduletime, namedokter, namepasien}= req.body;

    await Skedule.update({
      sceduletime: sceduletime,
      sceduledate: sceduledate,
      namedokter: namedokter,
      namepasien: namepasien
    },{
      where:{
        noantrian: req.params.noantrian
      }
    });

    res.status(200).json({msg: `skedule ${namepasien} sudah diproses`});
  } catch (error) {
    res.status(500).json(error.message);
  }
}


export const getSkeduleById = async(req, res)=>{
  if(!req.session.Id) return res.status(404).json({msg: "fitur ini membuntuh kan sesi"});
  try {
    const skedule = await Skedule.findOne({
      attributes:['noantrian','title', 'sceduledate', 'sceduletime', 'namedokter', 'namepasien', 'dokterSpesialis'],
      where:{
        noantrian:req.params.noantrian
      }
    });
    
    res.status(200).json(skedule);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}



// mendapatkan jumlah rekapPerawat
