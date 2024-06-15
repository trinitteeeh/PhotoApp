// constant.js or constant.mjs
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const serverKey = process.env.SERVER_KEY;
const clientKey = process.env.CLIENT_KEY;

export {
    isProduction,
    serverKey,
    clientKey
};
