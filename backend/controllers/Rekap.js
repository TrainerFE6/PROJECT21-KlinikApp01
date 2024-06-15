import Rekap from "../models/RekapMedisModels.js";
import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";
import Obat from "../models/ObatModel.js";
import Users from "../models/UsersModel.js";

export const createRekapMedis = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Debug log

    const {
      nama_pasien,
      nama_dokter,
      keluhan_pasien,
      obat_pasien,
      jenis_pemeriksaan,
      hasil_pemeriksaan,
      pesan,
      biayaPemeriksaan,
    } = req.body;

    if (!nama_pasien || !nama_dokter || !keluhan_pasien || !obat_pasien || !jenis_pemeriksaan || !hasil_pemeriksaan || !pesan || !biayaPemeriksaan) {
      console.log("Validation error: Missing fields"); // Debug log
      return res.status(400).json({ msg: "Semua field harus diisi" });
    }

    const newRekapMedis = await Rekap.create({
      nama_pasien,
      nama_dokter,
      keluhan_pasien,
      Obat_pasien: obat_pasien,
      jenis_pemeriksaan,
      hasil_pemeriksaan,
      pesan,
      biayaPemeriksaan,
    });

    console.log("Rekap Medis created:", newRekapMedis); // Debug log
    res.status(201).json(newRekapMedis);
  } catch (error) {
    console.error("Error creating Rekap Medis:", error); // Debug log
    res.status(500).json({ msg: error.message });
  }
};


export const getRekap = async(req, res)=>{
  if(!req.session.IdUser) return res.status(404).json({msg: "fitur ini membutuhkan sesi"});

 try {
  console.log(req.params.name);
  const rekap = await Rekap.findOne({
    where:{
      nama_pasien: req.params.name
    }
  });

  if(!rekap) return res.status(404).json({msg: "rekap medis pasien tidak ditemukan"});

  res.status(200).json(rekap);

 } catch (error) {
  console.log(error.message);
  res.status(500).json(error.message);
 }

  
}



export const updateRekap = async(req, res)=>{
  if(!req.session.IdUser) return res.status(400).json({msg: "fitur ini membutuhkan sesi"});
  try {
    const {biaya_obat, biaya_pemeriksaan} = req.body;

     // Konversi string ke number
     const biayaObat = parseFloat(biaya_obat);
     const biayaPemeriksaan = parseFloat(biaya_pemeriksaan);

    const hasil = biayaObat + biayaPemeriksaan
  
    await Rekap.update({
      biayaPemeriksaan: hasil,
      isProcessed: true
  
    },{
      where:{
        id:req.params.id
      }
    });

    res.status(200).json({msg: "Rekap Media Berhasil diproses"});
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
 
  
}




export const getRekapById = async(req, res)=>{
  
  try {
    console.log(req.params.id)
    const rekap = await Rekap.findOne({
      attributes:['id','nama_pasien','biayaPemeriksaan'],
      where:{
        id: req.params.id
      }
    });

    if(!rekap){
      console.log('rekap tidak ditemukan');
      res.status(404).json({msg: "data rekap tidak ditemukan"});
    }
    res.status(200).json(rekap)
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}


// MENDAPATKAN JUMLAH REKAP PERAWAT 

export const getJumlahRekap = async (req, res) => {
  if (!req.session.userId) return res.status(404).json({ msg: 'Fitur ini membutuhkan sesi' });

  try {
    console.log('ini user Id:  ',req.session.IdUser); // Ubah menjadi req.session.userId

    const pasien = await Pasien.findAll({
      where: {
        userId: req.session.IdUser // Ubah menjadi req.session.userId
      },
      attributes: ['name']
    });

    if (pasien.length === 0) {
      return res.status(404).json({ msg: 'Tidak ada pasien yang ditemukan' });
    }

    const namaPasienArray = pasien.map(p => p.name); // Ambil array nama pasien dari hasil query

    const jumlahRekap = await Rekap.count({
      where: {
        nama_pasien: namaPasienArray // Gunakan array nama pasien untuk mencocokkan dengan nama_pasien
      }
    });

    res.status(200).json({ jumlahRekap });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Terjadi kesalahan di server' });
  }
};
