import Pasien from "../models/PasienModel.js";
import Users from "../models/UsersModel.js";
import Dokter from "../models/DokterModels.js";
import { Op } from "sequelize";

// REGISTRASI PASIEN 

export const RegisterPasien = async(req, res)=>{
  if(!req.session.userId) return res.status(404).json({msg: "Anda belum Login"});


  const {name, alamat, ttl, nohandphone, keluhan, dokterSpesialis} = req.body;
  const IdUser = req.session.IdUser
  try {
      await Pasien.create({
        name: name,
        alamat: alamat,
        ttl: ttl,
        nohandphone: nohandphone,
        keluhan: keluhan,
        dokterSPesialis: dokterSpesialis,
        userId: IdUser
      });
      res.status(201).json({msg: "Pasien created Successfuly"});
    
    
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}


// MENAMPILKAN DATA PASIEN 
export const getPasienBydokter = async(req, res)=>{
  
  try {
    if(!req.session.dokterId){
    console.log('session dokter tidak ditemukan');
    return res.status(404).json({msg: "Mohon Login terlebih dahulu"})
    }

    const dokter = await Dokter.findOne({
      where:{
        id:req.session.Id
      }
    });

    if(!dokter){
      console.log('data dokter tidak ditemukan');
      res.status(404).json({msg: "data dokter invalid"});
    }


    const spesialis = dokter.spesialis;

    let response;
    response = await Pasien.findAll({
      attributes:['id', 'name', 'alamat', 'ttl', 'nohandphone', 'keluhan',],
      where:{
        dokterSPesialis: spesialis
      },
      include:[{
        model: Users, 
        attributes:['name', 'email', 'role']

      }]

    });
    
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}




// MENDAPAT KAN DATA PASIEN SESUAI ID REGISTER

export const getPasienByPerawat = async(req, res)=>{
  try {
    
    if(!req.session.userId) return res.status(404).json({msg: "Anda belum login"});
    // res.status(402).json({msg: req.userId});
    const response = await Pasien.findAll({
    attributes:['uuid', 'name', 'alamat', 'ttl', 'nohandphone','keluhan', 'dokterSPesialis'],
    where:{
      userId: req.userId
    },
    include:[{
      model: Users, attributes:['name', 'email']
    }]
  })
  res.status(200).json(response);
  } catch (error) {
    
  }
}



// MENDAPATKAN AKTIFITAS BARU PASIEN 
export const getPasienBaru = async (req, res) => {
  try {
    if (!req.session.userId) return res.status(404).json({ msg: "Anda belum login" });
    const pasienBaru = await Pasien.findAll({
      attributes: ['uuid', 'name', 'alamat', 'ttl', 'nohandphone', 'keluhan', 'dokterSPesialis'],
      where: {
        userId: req.session.IdUser
      },
      include: [{
        model: Users, attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']], // Order by latest
      limit: 5 // Limit to the latest 5 activities
    });
    console.log('pasien baru', pasienBaru);
    res.status(200).json(pasienBaru);
  } catch (error) {
    res.status(500).json({ msg: 'Terjadi kesalahan', error });
  }
};

// MENDAPATKAN DATA PASIEN BERDASARKAN ID 
export const getPasienById = async(req, res)=>{
  try {
    const response = await Pasien.findOne({
      where:{
        id: req.params.id
      }
    });
    res.json(response)
  } catch (error) {
    console.log(error.message);
    
  }
}


// mengapdate data pasien

export const updatePasien = async(req, res)=> {
  try {
    const pasien = await Pasien.findOne({
      where:{
        id: req.params.id
      }
    });

    if(!pasien) res.status(404).json({msg: "Data Pasien Tidak ditemukan"});

    await pa

  } catch (error) {
    
  }
}


// mendapatkan semua data pasien

export const getAllPasien = async(req, res)=>{
  try {
    const pasien = await Pasien.findAll({
      attributes:['id', 'name', 'alamat', 'ttl', 'nohandphone', 'keluhan', 'dokterSPesialis']
    });

    if(!pasien) return res.status(404).json({msg: 'data pasien tidak ditemukan'});

    res.status(200).json(pasien)
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}

export const getPasienBaruDokter = async (req, res) => {
  try {
    if (!req.session.dokterId) return res.status(404).json({ msg: "Anda belum login" });

    const dokter = await Dokter.findOne({
      where:{
        uuid : req.session.dokterId
      }
    })
    const pasienBaru = await Pasien.findAll({
      attributes: ['uuid', 'name', 'alamat', 'ttl', 'nohandphone', 'keluhan', 'dokterSPesialis'],
      where: {
        dokterSPesialis: dokter.spesialis
      },
      order: [['createdAt', 'DESC']], // Order by latest
      limit: 5 // Limit to the latest 5 activities
    });
    console.log('pasien baru', pasienBaru);
    res.status(200).json(pasienBaru);
  } catch (error) {
    res.status(500).json({ msg: 'Terjadi kesalahan', error });
  }
};
