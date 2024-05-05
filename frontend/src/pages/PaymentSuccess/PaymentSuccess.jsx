import React, { useEffect, useState } from "react";
import css from "./PaymentSuccess.module.css";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./background.svg";
import axios from "axios"; // Pastikan telah mengimpor axios

const PaymentSuccess = () => {
  const [count, setCount] = useState(3);
  const [dot, setDot] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const updateOrderStatus = async () => {
      try {
        await axios.put("http://localhost:5000/order/update-status", { newStatus: "success" }); // Pastikan URL dan data dikirim sesuai dengan permintaan yang berhasil
        console.log("Order status updated successfully");
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    };

    updateOrderStatus(); // Panggil fungsi untuk memperbarui status order saat komponen dimuat
  }, []); // Gunakan array kosong agar efek hanya dijalankan sekali saat komponen dimuat

  // Handle dot changes
  useEffect(() => {
    if (count <= 0) return;
    const timer = setTimeout(() => {
      setDot((prevDot) => (prevDot.length < 2 ? prevDot + "." : ""));
    }, 500);
    return () => clearTimeout(timer);
  }, [dot]);

  // Handle countdown
  useEffect(() => {
    if (count <= 0) {
      navigate("/select-frame");
    }
    const timer = setTimeout(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1500);
    return () => clearTimeout(timer);
  }, [count]);

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div className={css.container} style={containerStyle}>
      <div className={css.topPart}>
        <img src="/images/logo/logo.svg" alt="" />
      </div>
      <div className={css.middlePart}>
        <h2 className={css.thankyouTxt}>
          <b>THANK YOU!</b>
        </h2>
        <h2 className={css.paymentTxt}>
          Payment <b>Success!</b>
        </h2>
        <h3 className={css.countdownTxt}>
          Creating Memories in {count}
          {dot}
        </h3>
      </div>
    </div>
  );
};

export default PaymentSuccess;
