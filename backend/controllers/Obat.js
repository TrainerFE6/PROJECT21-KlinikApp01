import Obat from "../models/ObatModel.js";


export const createObat = async(req, res)=>{

  try {
    const {name_obat, Jenis_obat, stok,harga } = req.body;

    await Obat.create({
      name_obat: name_obat,
      Jenis_obat: Jenis_obat,
      stok: stok,
      harga: harga

    });
    res.status(200).json("Data Obat Telah ditambahkan");
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}


export const getObat = async(req, res)=>{
  try {
    const obat = await Obat.findAll({
      attributes:['id','name_obat', 'Jenis_obat', 'stok', 'harga']
    })

    res.status(200).json(obat);
  } catch (error) {

    res.status(500).json({msg: "Data Obat Tidak ditemukan"})
    
  }
}

export const getObatSession = async(req, res)=>{

  try {
    const obatUser = await findAll({
      where : {
        id: req.params.id
      }
    })

    res.status(200).json(obatUser);
  } catch (error) {
    res.status(500).json(error.message);
    
  }
}

export const deleteObat = async(req, res)=>{
  try {
    const obat = await Obat.findOne({
      where: {
        id: req.params.id
      }
    });

    if(!obat) return res.status(404).json({msg: "Obat Tidak ditemukan"});

    await obat.destroy();
    res.status(200).json({msg: "Data Obat telah dihapus"})
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
    
  }
}