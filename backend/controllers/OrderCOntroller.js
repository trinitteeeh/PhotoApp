// OrderController.js
import Order from '../models/OrderModel.js';

export const createOrder = async (req, res) => {
    try {
        // Data order yang ingin dimasukkan
        const orderData = { // ID order yang Anda inginkan
            productId: '1', // ID produk yang terkait dengan order
            dateOrder: new Date(), // Tanggal pemesanan
            orderStatus: 'Failed'
            // Anda dapat menambahkan bidang lain sesuai kebutuhan
        };

        // Membuat order baru dalam model Order
        const newOrder = await Order.create(orderData);

        // Mengirim respons sukses bersama dengan data order yang baru
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

