import { Sequelize } from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

const JadwalDokter = db.define('jadwal', {
  nama_dokter: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  },
  spesialis:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      
    }
  },
  waktu_pelayanan:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
     
    }

  },
  waktu_selesai:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
     
    }

  },
  jadwal_pelayanan:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      notEmpty: true

    }
  }
}, {
  freezeTableName: true
});



export default JadwalDokter;