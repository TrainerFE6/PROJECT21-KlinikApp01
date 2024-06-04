import { Sequelize } from "sequelize";
import db from "../config/database.js";


const {DataTypes} = Sequelize;

const Obat = db.define('obat', {
  name_obat:{
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  },
  Jenis_obat: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate:{
      notEmpty: true,
    }
  },
  stok:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  harga: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true
    }
  }

},{
  freezeTableName: true
});

// untuk melakukan relasi antar tabel 

export default Obat;