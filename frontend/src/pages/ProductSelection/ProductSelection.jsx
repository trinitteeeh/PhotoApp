import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ProductSelection.module.css";
import axios from "axios";
import PaymentQR from "../../components/PaymentQR/PaymentQR";

const productsData = [
  { id: 0, qty: 1, price: 100, url: "/images/product_selection/1_strip.svg" },
  { id: 1, qty: 2, price: 200, url: "/images/product_selection/2_strip.svg" },
  { id: 2, qty: 3, price: 300, url: "/images/product_selection/3_strip.svg" },
  { id: 3, qty: 4, price: 400, url: "/images/product_selection/4_strip.svg" },
  { id: 4, qty: 5, price: 500, url: "/images/product_selection/5_strip.svg" },
  { id: 5, qty: 6, price: 600, url: "/images/product_selection/6_strip.svg" },
  { id: 6, qty: 7, price: 700, url: "/images/product_selection/7_strip.svg" },
  { id: 7, qty: 8, price: 800, url: "/images/product_selection/8_strip.svg" },
  { id: 8, qty: 9, price: 900, url: "/images/product_selection/9_strip.svg" },
  { id: 9, qty: 10, price: 1000, url: "/images/product_selection/10_strip.svg" },
];

const ProductSelection = () => {
  const [qrUrl, setQRUrl] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [products, setProducts] = useState(productsData); //nanti kamu ambil data useEffect pas pertama kali masuk page setProducts pakai function ini
  const [selectedProduct, setSelectedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const navigate = useNavigate();

  const processQR = async (product) => {
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

  const handleMoveLess = () => {
    if (showPaymentDialog === true) return;
    if (currentProduct.id === 0) {
      setCurrentProduct(products[products.length - 1]);
    } else {
      setCurrentProduct(products[currentProduct.id - 1]);
    }
  };

  const handleMoveMore = () => {
    if (showPaymentDialog === true) return;
    if (currentProduct.id === products.length - 1) {
      setCurrentProduct(products[0]);
    } else {
      setCurrentProduct(products[currentProduct.id + 1]);
    }
  };

  const handleShowPayment = () => {
    setSelectedProduct(currentProduct);
    if (showPaymentDialog === false) {
      processQR(currentProduct);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.leftContainer}>
        <div className={css.frameContainer}>
          <img src={currentProduct.url} alt="" />
        </div>
      </div>
      <div className={css.rightContainer}>
        <div className={css.selectionCard}>
          <h4 className={css.title}>
            Select <b>Package</b>
          </h4>
          <div className={css.middlePart}>
            <div className={css.arr} onClick={handleMoveLess}>
              <img src="/images/product_selection/left_arr.svg" alt="Left Arrow" />
            </div>
            <div className={css.number}>
              <h4>{currentProduct.qty}</h4>
              <h6>Strip</h6>
            </div>
            <div className={css.arr} onClick={handleMoveMore}>
              <img src="/images/product_selection/right_arr.svg" alt="Right Arrow" />
            </div>
          </div>
          <h4 className={css.price}>
            Rp <b>{currentProduct.price}</b>
          </h4>
          <div className={css.nextBtn} onClick={handleShowPayment}>
            <img src="/images/product_selection/next_btn.svg" alt="Next Button" />
          </div>
        </div>
      </div>
      {showPaymentDialog && <PaymentQR onClose={handleClosePaymentDialog} navigate={navigate} qrUrl={qrUrl} />}
    </div>
  );
};

export default ProductSelection;
