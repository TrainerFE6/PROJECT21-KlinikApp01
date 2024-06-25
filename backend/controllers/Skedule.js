import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";
import JadwalDokter from "../models/JadwalDokter.js";
import Users from "../models/UsersModel.js";
import { updateDokter } from "./Dokter.js";

export const SkedulePasien = async (req, res) => {
  if (!req.session.dokterId) return res.status(404).json({ msg: "Session dokter tidak valid" });

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

    // Hitung jumlah antrian berdasarkan spesialis
    const count = await Skedule.count({
      where: { dokterSpesialis: jadwal.spesialis }
    });
    const antrian = count + 1;

    await Skedule.create({
      antrian: antrian,
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
};




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


export const getSkeduleDokter = async(req, res) => {
  if (!req.session.Id) return res.status(404).json({ msg: "fitur ini membutuhkan sesi" });

  try {
    const id = req.session.Id;
    const dokter = await Dokter.findOne({
      where: {
        id: id
      }
    });

    if (!dokter) {
      console.log("data dokter tidak ditemukan");
      return res.status(404).json({ msg: "Data dokter tidak ditemukan" });
    }

    const skedule = await Skedule.findAll({
      where: {
        namedokter: dokter.name
      }
    });

    // Tambahkan logging untuk data skedule
    console.log("Data skedule yang ditemukan:", skedule);

    // Cek apakah setiap skedule memiliki noantrian yang valid
    const validSkedule = skedule.map((item) => ({
      noantrian: item.noantrian,
      antrian: item.antrian,
      sceduledate: item.sceduledate,
      sceduletime: item.sceduletime,
      namePasien: item.namePasien,
      namedokter: item.namedokter,
      title: item.title
    }));

    console.log("Data skedule yang valid:", validSkedule);

    res.status(200).json(validSkedule);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};






export const updateSkedule = async(req, res)=>{
  if(!req.session.Id) return res.status(404).json({msg: "fitur ini membutuhkan sesi"});

  try {
    const {sceduledate, sceduletime, namedokter, namepasien, antrian}= req.body;

    await Skedule.update({
      antrian:antrian,
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
      attributes:['antrian','title', 'sceduledate', 'sceduletime', 'namedokter', 'namePasien', 'dokterSpesialis'],
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



//DELETE SKEDULE 



export const deleteSkedule = async(req, res)=>{
  try {
    const skedule = await Skedule.findOne({
      where: {
        namePasien: req.params.namePasien
      }
    });

    if(!skedule) return res.status(404).json({msg: "Obat Tidak ditemukan"});

    await skedule.destroy();
    res.status(200).json({msg: "SKedule telah dihapus"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}