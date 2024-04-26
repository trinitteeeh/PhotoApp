import express from "express";
import midtransClient from "midtrans-client";
import Product from "../models/ProductModel.js"; // Import model product dari database
import { MIDTRANS_SERVER_KEY } from "../constant.js";
import Order from "../models/OrderModel.js";
import axios from "axios"; 

const router = express.Router();

router.post('/process-transactions', async (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: "SB-Mid-server-FMWZbJPx84LKAKegdoD6ON_J",
            clientKey: "SB-Mid-client-YIjPgxrJlKzSyJg9",
        });

        // Mengambil harga produk dari server
        const priceResponse = await axios.get('http://localhost:5000/product/1/price');
        const productPrice = priceResponse.data.productPrice;

        // Membuat entri baru di database untuk pesanan
        const newOrder = await Order.create({
            productId: 1,
            dateOrder: new Date(),
            orderStatus: 'Pending'
        });

        // Menggunakan ID pesanan baru sebagai order_id
        const orderId = newOrder.orderId;

        const parameter = {
            payment_type: "qris",
            transaction_details: {
                order_id: orderId.toString(), // Menggunakan ID pesanan sebagai order_id
                gross_amount: productPrice // Menggunakan price dari product sebagai gross_amount
            }
        };

        snap.createTransaction(parameter)
            .then((transaction) => {
                // transaction token
                let transactionToken = transaction.token;
                console.log('transactionToken:', transactionToken);
                res.status(200).json({ transactionToken });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
