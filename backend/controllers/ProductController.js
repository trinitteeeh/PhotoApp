import Product from "../models/ProductModel.js";

export const getProduct = async(req, res) =>{
    try {
        const response = await Product.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}

export const getProductbyId = async(req, res) =>{
    try {
        const response = await Product.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message)
    }
}