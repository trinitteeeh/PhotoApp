import React from "react";
import css from "./PaymentQR.module.css";

const PaymentQR = ({ onClose, navigate }) => {
  const handleNavigate = () => {
    navigate("payment-success");
  };
  return (
    <div className={css.container} onClick={handleNavigate}>
      <div className={css.paymentContainer}>
        <img src="/images/payment_qr/payment_qr.svg" alt="" className={css.containerImg} />
      </div>
    </div>
  );
};

export default PaymentQR;
