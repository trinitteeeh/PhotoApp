import express from "express";
import midtransClient from "midtrans-client";
import Order from "../models/OrderModel.js";
import axios from "axios"; 
import { where } from "sequelize";

const router = express.Router();

router.post('/process-transactions', async (req, res) => {
    try {
        const core = new midtransClient.CoreApi({
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
            },
            qris: {
                enable_callback: true,
                callback_url: "/payment-success"
            }
        };

        // Membuat charge dan menangani respons
        core.charge(parameter).then((transaction) => {
            // Mendapatkan URL dari properti actions
            let qrUrl = transaction.actions[0].url;

            console.log("trasaksi : ", transaction)
            console.log(qrUrl)
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
        // Mengambil order terbaru dengan sorting berdasarkan dateOrder descending
        const latestOrder = await Order.findAll({ 
            order: [['dateOrder', 'DESC']], // Sorting berdasarkan dateOrder descending
            limit: 1 // Hanya mengambil satu data terbaru
        });

        if (!latestOrder) {
            return res.status(404).json({ error: 'No orders found' });
        }

        // Menggunakan ID pesanan terbaru sebagai order_id
        const orderId = latestOrder[0].dataValues.orderId;;

        // Membuat objek API midtrans
        const core = new midtransClient.CoreApi({
            isProduction: false,
            serverKey: "SB-Mid-server-FMWZbJPx84LKAKegdoD6ON_J",
            clientKey: "SB-Mid-client-YIjPgxrJlKzSyJg9",
        });

        console.log("Order id:", orderId);

        // Mengambil status transaksi dari API Midtrans berdasarkan orderId
        const transactionStatus = await core.transaction.status(orderId); // Menggunakan orderId dalam permintaan

        const paymentStatus = transactionStatus.transaction_status;
        // Menyampaikan status transaksi ke klien
        res.status(200).json(paymentStatus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



export default router;
