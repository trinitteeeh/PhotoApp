import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import css from "./StartPage.module.css";
import PaymentQR from "../../components/PaymentQR/PaymentQR";
import backgroundImage from "./background.svg";

const StartPage = () => {
  const navigate = useNavigate();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timer;
    if (timerActive) {
      timer = setTimeout(() => {
        navigate("/tutor");
      }, 5000000);
    }

    return () => clearTimeout(timer);
  }, [navigate, timerActive]);

  const handleTutorPage = () => {
    navigate("/tutor");
  };

  const handleShowPaymentDialog = () => {
    setTimerActive(false);
    setShowPaymentDialog(true);
  };

  const handleClosePaymentDialog = () => {
    setShowPaymentDialog(false);
  };

  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

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
