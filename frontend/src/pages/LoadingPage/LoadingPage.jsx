import React from "react";
import css from "./Loading.module.css";

const LoadingPage = () => {
  return (
    <div className={css.container}>
      <img src="/images/payment_success/background.svg" alt="" />
      <h1>Loading</h1>
    </div>
  );
};

export default LoadingPage;
