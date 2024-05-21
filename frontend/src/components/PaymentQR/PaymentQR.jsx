import React, { useEffect, useState } from "react";
import css from "./PaymentQR.module.css";
import { QRCodeSVG } from "qrcode.react";
import axios from "axios";

const PaymentQR = ({ navigate, qrUrl }) => {
  const [paymentStatus, setPaymentStatus] = useState("pending");

  useEffect(() => {
    // Set up polling to check the payment status every 5 seconds
    const interval = setInterval(async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/payment/get-transaction-status/:orderId");
        console.log("Checking payment status..."); // Debugging log
        if (response.data !== paymentStatus) {
          setPaymentStatus(response.data);
        }
      } catch (error) {
        console.error("Error while checking payment status:", error);
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, [paymentStatus]); // Includes paymentStatus to potentially handle changes

  useEffect(() => {
    // React to paymentStatus changes
    if (paymentStatus === "settlement") {
      navigate("/payment-success");
    } else if (paymentStatus === "pending") {
      console.log("Pending Payment Wait TO Pay");
    } else {
      navigate("/payment-failed");
      console.error("Payment failed, please try again");
    }
  }, [paymentStatus]); // This effect depends on paymentStatus

  return (
    <div className={css.container}>
      <div className={css.qrCodeWrapper}>
        <QRCodeSVG value={qrUrl} className={css.qr} />
      </div>
    </div>
  );
};

export default PaymentQR;
