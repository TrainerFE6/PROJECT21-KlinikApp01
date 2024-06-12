import { Sequelize } from "sequelize";
import db from "../config/database.js";



const {DataTypes} = Sequelize;

const Rekap = db.define('rekap_medis', {
  nama_pasien:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
   nama_dokter:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  keluhan_pasien:{
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      
    }
  },
  Obat_pasien: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  },
  jenis_pemeriksaan: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  hasil_pemeriksaan:{
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }

  },
  pesan : {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }

  }

},{
  freezeTableName: true
});



export default Rekap;