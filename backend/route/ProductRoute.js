// routes.js

import express from "express";
import { getProduct, getProductbyId, getProductbyIdPrice } from "../controllers/ProductController.js";


const router = express.Router();

router.get('/product', getProduct);
router.get('/product/:id', getProductbyId);
router.get('/product/:id/price', getProductbyIdPrice);


export default router;