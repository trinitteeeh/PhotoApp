import express from "express";
import { 
    getProduct, 
    getProductbyId 
} from "../controllers/ProductController.js";

const router = express.Router();

router.get('/product',getProduct);
router.get('/product/:id',getProductbyId);

export default router;