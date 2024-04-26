// OrderModel.js

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Order = db.define('order', {
    orderId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    dateOrder: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW
    },
    orderStatus: {
        type: DataTypes.STRING, // Tipe data untuk order status, misalnya 'pending', 'processing', 'completed', dll.
        allowNull: false,
        defaultValue: 'pending' // Nilai default untuk orderStatus
    }
}, {
    freezeTableName: true,
    timestamps: false
});

export default Order;

(async () => {
    await db.sync();
})();
