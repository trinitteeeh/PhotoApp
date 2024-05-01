import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./StartPage.module.css";
import PaymentQR from "../../components/PaymentQR/PaymentQR";
import backgroundImage from "./background.svg";
import axios from "axios";

const StartPage = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [token, setToken] = useState("");

  const handleTutorPage = () => {
    navigate("/tutor");
  };

  const handleShowPaymentDialog = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/payment/process-transactions");
      setToken(response.data.transactionToken);
      console.log(response.data.transactionToken);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
  };

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
          navigate("/payment-success")
        },
        onPending: (result) => {
          localStorage.setItem("Pembayaran", JSON.stringify(result));
          setToken("");
        },
        onError: (result) => {
          console.log("ERROR");
          setToken("");
        },
        onClose: () => {
          localStorage.setItem("Anda Belum menyelesaikan pembayaran");
          setToken("");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransUrl = "https://app.sandbox.midtrans.com/snap/snap.js";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransUrl;

    const midtransClientKey = "SB-Mid-client-YIjPgxrJlKzSyJg9";
    scriptTag.setAttribute("data-client-key", midtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  });

  return (
    <div className={css.container}>
      {showPaymentDialog && <div className={css.overlay}></div>}
      {showPaymentDialog && <PaymentQR onClose={handleClosePaymentDialog} navigate={navigate} />}
      <div className={css.topPart}>
        <img src="/images/start_page/logo_with_name.svg" alt="" />
      </div>
      <div className={css.middlePart}>
        <p className={css.title}>Let's make memories.</p>
        <div className={css.startLogoContainer}>
          <img src="/images/start_page/start_logo.svg" alt="" className={css.startLogo} onClick={handleShowPaymentDialog} />
          <img src="/images/start_page/arrow.svg" alt="" className={css.arrow} />
        </div>
        <p className={css.paymentText}>We accept this payment</p>
        <img src="/images/start_page/payment_method.svg" alt="" className={css.paymentLogo} />
      </div>
      <div className={css.bottomPart}>
        <img src="/images/start_page/tutor_btn.svg" alt="" onClick={handleTutorPage} />
      </div>
    </div>
  );
};

export default StartPage;
