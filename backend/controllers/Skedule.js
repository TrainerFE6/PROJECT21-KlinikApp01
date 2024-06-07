import Dokter from "../models/DokterModels.js";
import Pasien from "../models/PasienModel.js";
import Skedule from "../models/SchduleModels.js";
import JadwalDokter from "../models/JadwalDokter.js";

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
