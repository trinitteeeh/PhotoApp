import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./ProductSelection.module.css";
import axios from "axios";
import PaymentQR from "../../components/PaymentQR/PaymentQR";

const ProductSelection = () => {
  const [qrUrl, setQRUrl] = useState("");
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState();
  const [currentProduct, setCurrentProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product");
        const productData = response.data.map((product) => ({
          id: product.id,
          qty: parseInt(product.productName.split(" ")[0]), // Assuming 'productName' is in the format '1 Strip'
          price: parseInt(product.productPrice.replace(/\D/g, "")), // Remove any non-numeric characters from 'productPrice'
          url: `/images/product_selection/${product.id}_strip.svg`, // Assuming images are named according to the product id
        }));
        setProducts(productData);
        setCurrentProduct(productData[0]); // Set the initial current product
      } catch (error) {
        console.error("Error fetching products:", error);
        console.log("Failed to fetch products. Please check ysour connection.");
        window.alert("Network Erorr . Please check your connection.");
        navigate("/");
      }
    };
    fetchProducts();
  }, []);

  const processQR = async (product) => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment/process-transactions", { productId: product.id });
      setShowPaymentDialog(true);
      setQRUrl(response.data.message);
      console.log(response.data.message);
      setSelectedProduct(product);
    } catch (error) {
      console.error("Error fetching QR URL:", error);
      console.log("Failed to fetch products. Please check ysour connection.");
      window.alert("Network Erorr . Please check your connection.");
      navigate("/");
    }
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
    setSelectedProduct(null);
  };

  const handleMoveLess = () => {
    if (showPaymentDialog === true || !currentProduct) return;
    const currentIndex = products.findIndex((p) => p.id === currentProduct.id);
    setCurrentProduct(products[(currentIndex - 1 + products.length) % products.length]);
  };

  const handleMoveMore = () => {
    if (showPaymentDialog === true || !currentProduct) return;
    const currentIndex = products.findIndex((p) => p.id === currentProduct.id);
    setCurrentProduct(products[(currentIndex + 1) % products.length]);
  };

  const handleShowPayment = () => {
    if (!currentProduct) return;
    setSelectedProduct(currentProduct);
    if (showPaymentDialog === false) {
      processQR(currentProduct);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.leftContainer}>
        {currentProduct && (
          <div className={css.frameContainer}>
            <img src={currentProduct.url} alt="" />
          </div>
        )}
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
              <h4>{currentProduct ? currentProduct.qty : 0}</h4>
              <h6>Strip</h6>
            </div>
            <div className={css.arr} onClick={handleMoveMore}>
              <img src="/images/product_selection/right_arr.svg" alt="Right Arrow" />
            </div>
          </div>
          <h4 className={css.price}>
            Rp <b>{currentProduct ? currentProduct.price : 0}</b>
          </h4>
          <div className={css.nextBtn} onClick={handleShowPayment}>
            <img src="/images/product_selection/next_btn.svg" alt="Next Button" />
          </div>
        </div>
      </div>
      {showPaymentDialog && <PaymentQR onClose={handleClosePaymentDialog} navigate={navigate} qrUrl={qrUrl} />}
      {showPaymentDialog && <div className={css.overlay}></div>}
    </div>
  );
};

export default ProductSelection;
