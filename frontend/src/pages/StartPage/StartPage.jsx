import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./StartPage.module.css";

const StartPage = () => {
  const navigate = useNavigate();

  const handleTutorPage = () => {
    navigate("/tutor");
  };

  const handleStart = () => {
    navigate("/product-selection");
  };

  return (
    <div className={css.container}>
      <div className={css.topPart}>
        <img src="/images/start_page/logo_with_name.svg" alt="" />
      </div>
      <div className={css.middlePart}>
        <p className={css.title}>Let's make memories.</p>
        <div className={css.startLogoContainer}>
          <img src="/images/start_page/start_logo.svg" alt="" className={css.startLogo} onClick={handleStart} />
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
