import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./StartPage.module.css";

const StartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleTutorPage = () => {
    navigate("/tutor");
  };

  const handleStart = () => {
    localStorage.clear();
    navigate("/product-selection");
  };

  return (
    <div className={css.container}>
      <div className={css.startLogoContainer}>
        <img src="/images/start_page/start_btn.svg" alt="" className={css.startLogo} onClick={handleStart} />
      </div>
      <div className={css.howToContainer}>
        <img src="/images/start_page/how_to_btn.svg" alt="" onClick={handleTutorPage} />
      </div>
    </div>
  );
};

export default StartPage;
