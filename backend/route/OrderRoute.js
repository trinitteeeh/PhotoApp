import express from "express";
import { createOrder, updateStatusOrder } from "../controllers/OrderCOntroller.js";

const router = express.Router();

// Endpoint untuk membuat order baru
router.post('/order', createOrder);

// Endpoint untuk mengupdate status order
router.put('/order/update-status', updateStatusOrder);

export default router;
