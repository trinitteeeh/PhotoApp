import express from "express";
import midtransClient from "midtrans-client";
import Order from "../models/OrderModel.js";
import axios from "axios"; 

import { isProduction, serverKey, clientKey } from '../constant.js';
const router = express.Router();

router.post('/process-transactions', async (req, res) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
    }

    try {
        const core = new midtransClient.CoreApi({
            isProduction,
            serverKey,
            clientKey,
        });

        // Mengambil harga produk dari server
        const priceResponse = await axios.get(` http://localhost:5000/product/${productId}/price`);
        const productPrice = priceResponse.data.productPrice;
        console.log(priceResponse)

        // Membuat entri baru di database untuk pesanan
        const orderResponse = await axios.post('http://localhost:5000/order')


        // Menggunakan ID pesanan baru sebagai order_id
        const orderId = orderResponse.data.orderId

        const parameter = {
            payment_type: "qris",
            transaction_details: {
                order_id: orderId.toString(), // Menggunakan ID pesanan sebagai order_id
                gross_amount: productPrice // Menggunakan price dari product sebagai gross_amount
            },
            qris: {
                enable_callback: true,
                callback_url: "/payment-success"
            }
        };

        // Membuat charge dan menangani respons
        core.charge(parameter).then(async (transaction) => {
            // Mendapatkan URL dari properti actions
            let qrUrl = transaction.actions[0].url;

            console.log("Transaction: ", transaction);
            console.log(qrUrl);

            // Update order status to 'Paid'
            await Order.update({ orderStatus: 'Paid' }, { where: { orderId: orderId } });

            // Menyampaikan pesan ke klien bahwa transaksi telah diproses
            res.status(200).json({ message: qrUrl });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/get-transaction-status/:orderId', async (req, res) => {
    try {
        const latestOrder = await Order.findAll({ 
            order: [['dateOrder', 'DESC']],
            limit: 1
        });

        if (!latestOrder.length) {
            return res.status(404).json({ error: 'No orders found' });
        }

        const orderId = latestOrder[0].dataValues.orderId;

        const core = new midtransClient.CoreApi({
            isProduction,
            serverKey,
            clientKey,
        });

        console.log("Order ID:", orderId);

        const transactionStatus = await core.transaction.status(orderId);
        const paymentStatus = transactionStatus.transaction_status;

        res.status(200).json(paymentStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
