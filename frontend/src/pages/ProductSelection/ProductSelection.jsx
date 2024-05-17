import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ProductSelection.module.css";
import axios from "axios";
import PaymentQR from "../../components/PaymentQR/PaymentQR";

const products = [
  { id: 1, name: "Product 1", description: "This is Product 1", price: 100 },
  { id: 2, name: "Product 2", description: "This is Product 2", price: 150 },
  { id: 3, name: "Product 3", description: "This is Product 3", price: 200 },
  { id: 4, name: "Product 4", description: "This is Product 4", price: 250 },
  { id: 5, name: "Product 5", description: "This is Product 5", price: 300 },
  { id: 6, name: "Product 6", description: "This is Product 6", price: 350 },
  { id: 7, name: "Product 7", description: "This is Product 7", price: 400 },
  { id: 8, name: "Product 8", description: "This is Product 8", price: 450 },
  { id: 9, name: "Product 9", description: "This is Product 9", price: 500 },
  { id: 10, name: "Product 10", description: "This is Product 10", price: 550 },
];

const ProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qrUrl, setQRUrl] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = async (product) => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment/process-transactions", { productId: product.id });
      setShowPaymentDialog(true);
      setQRUrl(response.data.message); // Set QR URL yang diterima dari respons
      console.log(response.data.message);
      setSelectedProduct(product);
    } catch (error) {
      console.error("Error fetching QR URL:", error);
    }
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
    setSelectedProduct(null);
  };

  useEffect(() => {
    if (selectedProduct) {
      setShowPaymentDialog(true);
    }
  }, [selectedProduct]);

  return (
    <div className={css.container}>
      <h1>Product Selection</h1>
      <div className={css.productList}>
        {products.map((product) => (
          <div key={product.id} className={css.productItem}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleProductClick(product)}>Select</button>
          </div>
        ))}
      </div>
      {showPaymentDialog && (
        <PaymentQR onClose={handleClosePaymentDialog} navigate={navigate} qrUrl={qrUrl} />
      )}
    </div>
  );
};

export default ProductSelection;
