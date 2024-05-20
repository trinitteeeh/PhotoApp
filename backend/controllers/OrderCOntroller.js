
import Order from '../models/OrderModel.js';

export const createOrder = async (req, res) => {
    try {
        // Mendapatkan ID terbesar yang ada di database saat ini
        const latestOrder = await Order.findOne({
            order: [['orderId', 'DESC']], // Ambil order terbaru berdasarkan orderId descending
            attributes: ['orderId'] // Hanya ambil orderId saja
        });

        let newOrderId = 1; // ID default untuk order pertama jika tidak ada order sebelumnya

        if (latestOrder) {
            // Jika ada order sebelumnya, tambahkan 1 ke ID terbesar untuk mendapatkan ID baru
            newOrderId = latestOrder.orderId + 1;
        }

        // Data order yang ingin dimasukkan
        const orderData = {
            orderId: newOrderId,
            productId: '1', // ID produk yang terkait dengan order
            dateOrder: new Date(), // Tanggal pemesanan
            orderStatus: 'Pending'
            // Anda dapat menambahkan bidang lain sesuai kebutuhan
        };

        // Membuat order baru dalam model Order
        const newOrder = await Order.create(orderData);

        // Mengirim respons sukses bersama dengan data order yang baru
        console.log(orderData)
        res.status(201).json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


export const updateStatusOrder = async (req, res) => {
    try {
        // Dapatkan orderId terbaru dari database
        const latestOrder = await Order.findOne({
            order: [['orderId', 'DESC']], // Ambil order terbaru berdasarkan tanggal pembuatan
            attributes: ['orderId'] // Hanya ambil orderId saja
        });

        if (!latestOrder) {
            return res.status(404).json({ message: 'No orders found' });
        }

        const orderId = latestOrder.orderId; // Gunakan orderId terbaru

        const { newStatus } = req.body;

        // Cari order berdasarkan orderId
        const order = await Order.findByPk(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Update status order
        order.orderStatus = newStatus;
        await order.save();

        // Kirim respons berhasil
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};