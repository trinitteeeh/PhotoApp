// OrderRoutes.js

import express from "express";
import { createOrder } from "../controllers/OrderCOntroller.js";

const router = express.Router();

// Endpoint untuk membuat order baru
router.post('/order', createOrder);

export default router;
