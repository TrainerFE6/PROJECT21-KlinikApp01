import Dokter from "../models/DokterModels.js";
import Spesialis from "../models/SpesialisModels.js";
import JadwalDokter from "../models/JadwalDokter.js";

import  argon2  from "argon2";
import path, { sep } from 'path';
import fs from 'fs';
import { where } from "sequelize";



// REGISTER DOKTER 

export const createDokter = (req, res)=>{
  if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
  const name = req.body.name;
  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/dokter/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];
  if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json("Invalid Images");
  if(fileSize > 5000000) return res.status(422).json({msg: "file anda terlalu besar gunakan file ddibawah 5mb"});

  file.mv(`./public/images/dokter/${fileName}`, async(err)=> {
    if(err) return res.status(500).json({msg: err.message});
    const {email, password, confPassword, spesialis} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confirm password tidak sesuai"});
    const hashPassword = await argon2.hash(password);
    
    try {

      const seps = await Spesialis.findOne({
        where:{
          name: spesialis
        }
      });

      const spesialisId = seps.id;
      
      await Dokter.create({
        name: name,
        email: email,
        foto: fileName,
        url: url,
        spesialis: spesialis,
        password: hashPassword,
        spesialisId: spesialisId,


      });
      
      res.status(201).json({msg: "Product telah ditambahkan"});
    } catch (error) {
      console.log(error.message);
      
    }


  });
}

// LOGIN DOKTER 
export const LoginDokter = async(req, res) =>{
  const dokter = await Dokter.findOne({
    where:{
      email: req.body.email
    }
  });
  if(!dokter) return res.status(404).json({msg: "Akun tidak ditemukan"});
  const match = await argon2.verify(dokter.password, req.body.password);
  if(!match) return res.status(400).json({msg: "Password tidak sesuai/ditemukan"});

  req.session.dokterId = dokter.uuid;
  req.session.Id = dokter.id;
  const uuid = dokter.uuid;
  const name = dokter.name;
  const email = dokter.email;
  const foto = dokter.foto;
  const url = dokter.url;
  const spesialis = dokter.spesialis;

  res.status(200).json({uuid, name, email, foto, url, spesialis});
}


// Dapatkan Data Dokter yang Login 

export const MeDokter = async(req, res)=>{
  if(!req.session.dokterId){
    return res.status(401).json({msg: "Mohon Login Terlebih dahulu"});

  }

  const dokter = await Dokter.findOne({
    attributes:['id','uuid', 'name', 'email', 'foto', 'spesialis'],
    where:{
      uuid: req.session.dokterId
    }
  });

  if(!dokter) return res.status(400).json({msg: "User tidak ditemukan"});
  res.status(200).json(dokter)
}



// MENDAPATKAN DOKTER SESUAI ID 
export const getDokterById = async(req, res)=>{
  const response = await Dokter.findOne({
    attributes:['id','name','email','foto','spesialis', 'password'],
    where:{
      id: req.params.id
    }
  });

  if(!response) res.status(404).json({msg: "Data tidak ditemukan"});

  res.status(200).json(response);
}




// MENGAPDATE PROFILE DOKTER

export const updateDokter = async(req, res)=>{

  try {
    const dokter = await Dokter.findOne({
      where:{
        id: req.params.id
      }
    });

    if(!dokter) res.status(404).json({msg: "Data tidak ditemukan"})

      let fileName;
      if(!req.files || !req.files.foto){
        fileName = dokter.foto;
      }else{
        const file = req.files.foto;
        const fileSize= file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = ['.png', '.jpg', '.jpeg'];

        if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json({msg: "Gambar tidak valid"});
        if(fileSize > 5000000) return res.status(422).json({msg: "Gambar harus kurang dari 5 MB"});

        const oldFilePath = `./public/images/dokter/${dokter.foto}`;
        const newFilePath = `./public/images/dokter/${fileName}`;

        // hapus file gambar lama 

        if(fs.existsSync(oldFilePath)){
          fs.unlink(oldFilePath, (err) =>{
            if(err) return res.status(500).json({msg: err.message});

          });
        }

        // simpan file gambar baru 
        file.mv(newFilePath, (err)=>{
          if(err) return res.status(500).json({msg : err.message});

        })

      }

      
      const {name ,email, spesialis, confPassword, password} = req.body;
      const url = `${req.protocol}://${req.get("host")}/images/dokter/${fileName}`;

      if(password !== confPassword){
        res.status(400).json({msg: "Password dan confpassword tidak sesuai"});
      }
      const hashPassword = await argon2.hash(password);


      const seps = await Spesialis.findOne({
        where:{
          name: spesialis
        }
      });

      if(!seps){
        res.status(402).json({msg: "spesialis tidak terdaftar"});
      }

      const spesialisId = seps.id;

      await Dokter.update({
        name: name,
        email: email,
        foto: fileName,
        url: url,
        spesialis: spesialis,
        password: hashPassword,
        spesialisId: spesialisId
      },{
        where:{
          id:req.params.id
        }
      });

      res.status(200).json({msg: "Data berhasil diperbarui"});
  } catch (error) {

    console.log(error.message);
    res.status(500).json({msg: "Kesalahan server"});
    
  }
}


// MENGHAPUS DATA DOKTER 

export const deleteDokter = async(req, res)=>{
  const dokter = await Dokter.findOne({
    where:{
      id: req.params.id
    }
  });

  if(!dokter) return res.status(404).json({msg: "Data dokter tidak ditemukan"});

  try {
    const filePath = `./public/images/dokter/${dokter.foto}`;
    fs.unlinkSync(filePath);

    await dokter.destroy({
      where:{
        id: req.params.id
      }
    });

    res.status(200).json({msg: "Data sukses dihapus"});
    
  } catch (error) {
    console.log(error);
  }
}


// MENAMPILKAN DATA DOKTER UNTUK SUPER ADMIN

export const getDokter = async(req, res)=>{
  try {
    const response = await Dokter.findAll({
      attributes:['id','name', 'email', 'foto', 'url', 'spesialis']
    })
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message);
  }
}


// BUAT JADWAL DOKTER 

export const createJadwal = async(req, res)=> {
  

  try {
    const IdDokter = req.params.id;

  const dokter = await Dokter.findOne({
    where:{
      id: IdDokter
    }

  });
  const {waktu_pelayanan, jadwal_pelayanan, waktu_selesai} = req.body;


  await JadwalDokter.create({
    nama_dokter: dokter.name,
    spesialis : dokter.spesialis,
    waktu_pelayanan: waktu_pelayanan,
    waktu_selesai: waktu_selesai,
    jadwal_pelayanan: jadwal_pelayanan
  });

  res.status(200).json({msg: "Jadwal telah dibuat"});

  } catch (error) {
    console.log(error.message);
    
  }
}


// MENDAPATKAN JADWAL DOKTER SESAI DOKTER YANG LOGIN
export const getJadwalDokter = async(req, res)=>{
  try {
    if(!req.session.dokterId) return res.status(404).json({msg: "Sesi tidak ditemukan"});

  const dokter = await Dokter.findOne({
    where:{
      id: req.session.Id
    }
  });

  const jadwal = await JadwalDokter.findOne({
    where:{
      nama_dokter: dokter.name
    }
  });

  if(!jadwal) return res.status(404).json({msg: "Jadwal tidak ditemukan"});

  res.status(200).json(jadwal);
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}


export const getJadwalById = async(req, res)=>{
  try {
    const jadwal = await JadwalDokter.findOne({
      attributes:['id','nama_dokter', 'spesialis', 'waktu_pelayanan', 'waktu_selesai', 'jadwal_pelayanan'],
      where:{
        id: req.params.id
      }
    })

    res.status(200).json(jadwal);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}


export const updateJadwal = async(req, res)=>{
  if(!req.session.Id) return res.status(404).json({msg: "fitur ini membutuhkan sesi"});
 try {
  const dokter = await Dokter.findOne({
    where:{
      id: req.session.Id
    }
  });

  if(!dokter){
    return res.status(400).json({msg: "data dokter tidak ditemukan"});
  }

  const {waktu_pelayanan, waktu_selesai, jadwal_pelayanan} = req.body;

  await JadwalDokter.update({
    nama_dokter: dokter.name,
    spesialis: dokter.spesialis,
    waktu_pelayanan: waktu_pelayanan,
    waktu_selesai: waktu_selesai,
    jadwal_pelayanan: jadwal_pelayanan

  },{
    where:{
      id:req.params.id
    }
  });

  res.status(200).json({msg:'jadwal telah di update'});
 } catch (error) {
  res.status(500).json(error.message);
  
 }

  
}



// MENAMPILKAN DATA SPESIALIS

export const getSpesialis = async(req, res)=>{

  try {
    const spesialis = await Spesialis.findAll();
    res.status(200).json(spesialis);
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "data tidak ditemukan"})
    
  }

}


// Create Spesialis 
export const createSpesialis = async(req, res)=>{
  const {name} = req.body; 
  try {
    await Spesialis.create({
      name: name
    })
    res.status(200).json({msg: "Data Spesialis berhasil dibuat"});
  } catch (error) {
    res.status(500).json({msg:`${error.message}`});
  }
}






  

