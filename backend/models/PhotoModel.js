import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";
import Order from "./OrderModel.js"; // Pastikan untuk mengimpor model Order jika belum

const Photo = db.define('Photo', {
  photoId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order, // Menggunakan model Order
      key: 'orderId'
    }
  },
  Photo: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
});

export default Photo;
