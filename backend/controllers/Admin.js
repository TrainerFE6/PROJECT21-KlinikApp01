import Admin from "../models/AdminModels.js";

import  argon2  from "argon2";
import path, { sep } from 'path';
import fs from 'fs';
import { where } from "sequelize";

export const createAdmin = async(req, res)=>{
  if(req.files === null) return res.status(400).json({msg: "No file Uploaded"});
  const name = req.body.name;
  const file = req.files.foto;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/Admin/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];
  if(!allowedType.includes(ext.toLocaleLowerCase())) return res.status(422).json("Invalid Images");
  if(fileSize > 5000000) return res.status(422).json({msg: "file anda terlalu besar gunakan file ddibawah 5mb"});

  file.mv(`./public/images/Admin/${fileName}`, async(err)=> {
    if(err) return res.status(500).json({msg: err.message});
    const {email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan confirm password tidak sesuai"});
    const hashPassword = await argon2.hash(password);
    
    try {

     
      
      await Admin.create({
        name: name,
        email: email,
        foto: fileName,
        url: url,
        password: hashPassword,
        


      });
      
      res.status(201).json({msg: "Regis Berhasil"});
    } catch (error) {
      console.log(error.message);
      
    }


  });
}


// LOGIN ADMIN
export const LoginAdmin = async(req, res) =>{
  const admin = await Admin.findOne({
    where:{
      email: req.body.email
    }
  });
  if(!admin) return res.status(404).json({msg: "Akun tidak ditemukan"});
  const match = await argon2.verify(admin.password, req.body.password);
  if(!match) return res.status(400).json({msg: "Password tidak sesuai/ditemukan"});

  req.session.adminId = admin.uuid;
  req.session.Id = admin.id;
  const uuid = admin.uuid;
  const name = admin.name;
  const email = admin.email;
  const foto = admin.foto;
  const url = admin.url;


  res.status(200).json({uuid, name, email, foto, url});
}
