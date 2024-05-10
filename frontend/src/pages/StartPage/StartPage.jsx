// StartPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./StartPage.module.css";
import PaymentQR from "../../components/PaymentQR/PaymentQR";
import axios from "axios";

const StartPage = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [qrUrl, setQRUrl] = useState("");

  const [generateQr , setGenerateQr]= useState(false)

  const handleTutorPage = () => {
    navigate("/tutor");
  };

  useEffect(() =>{
    const makeqr = async ()=>{
      if(generateQr===true){
        try {
          const response = await axios.post("http://localhost:5000/api/payment/process-transactions");
          setShowPaymentDialog(true);
          console.log(response.data.message)
          setQRUrl(response.data.message); // Set QR URL yang diterima dari respons
        } catch (error) {
          console.error("Error fetching QR URL:", error);
        }
      }
   
    }
    makeqr()

  },[generateQr])



  const handleShowPaymentDialog = async () => {
    setGenerateQr(true);
   
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
  };


  return (
    <div className={css.container}>
      {showPaymentDialog && <div className={css.overlay}></div>}
      {showPaymentDialog && <PaymentQR onClose={handleClosePaymentDialog} navigate={navigate} qrUrl={qrUrl} />}
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
