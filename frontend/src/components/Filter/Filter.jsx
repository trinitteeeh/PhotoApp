import React from "react";
import css from "./Filter.module.css";

const Filter = ({ name, filter, onClick }) => {
  return (
    <div className={css.container}>
      <div className={css.nameContainer}>
        <h5>{name}</h5>
      </div>
      <div className={css.imageContainer} style={{ filter: filter }} onClick={onClick}>
        <img src={"/images/select_filter/placeholder.jpg"} alt="" />
      </div>
    </div>
  );
};

export default Filter;
