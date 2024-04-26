import { Sequelize } from "sequelize";


const db = new Sequelize('jans9573_Photobooth','jans9573_janssen','Jan230103',{
    host: '151.106.119.226',
    dialect: 'mysql'

});

export default db;