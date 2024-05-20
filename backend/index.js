import express from "express";
import cors from "cors";
import ProductRoute from "./route/ProductRoute.js";
import OrderRoute from "./route/OrderRoute.js";
import PaymentRoute from "./route/PaymentRoute.js";
import PhotoRoute from "./route/PhotoRoute.js"


const app = express();

app.use(cors());
app.use(express.json());

app.use(ProductRoute);
app.use(OrderRoute);
app.use("/api/payment", PaymentRoute);
app.use(PhotoRoute);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server Up And Running on port ${PORT}...`));
