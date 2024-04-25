import React from "react";
import css from "./TutorPage.module.css";
import { useNavigate } from "react-router-dom";

const TotorPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={css.container} onClick={handleClick}>
      <img src="/images/tutor_page/TutorPage.svg" alt="" />
    </div>
  );
};

export default TotorPage;
