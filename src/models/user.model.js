import { DataTypes } from "sequelize";
import { sequelize } from '../db/index.js'; 


//define User model
const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    role: {
      type: DataTypes.STRING,
    },
  },{
    timestamps: true
  });

  export { User };