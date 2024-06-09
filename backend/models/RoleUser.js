import { Sequelize } from "sequelize";
import db from "../config/database.js";





const {DataTypes} = Sequelize;

const Role = db.define('role', {

  namarole: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty: true,
      len: [3, 100]
    }
  }
}, {
  freezeTableName: true
});



export default Role;