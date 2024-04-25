// ProductModel.js

import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Product = db.define('product', {
    productName: DataTypes.STRING,
    productPrice: DataTypes.INTEGER,
}, {
    freezeTableName: true
});

// Ekspor model Product
export default Product;

(async () => {
    await db.sync();
})();
