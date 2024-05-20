import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Order from "./OrderModel.js"; // Pastikan untuk mengimpor model Order jika belum

const { DataTypes } = Sequelize;

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
  photo: {
    type: DataTypes.BLOB,
    allowNull: false
  }
});

export default Photo;
