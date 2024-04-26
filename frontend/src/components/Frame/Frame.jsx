import React, { useState } from "react";
import css from "./Frame.module.css";

const Frame = ({ bgColor, onSelectColor, selected }) => {
  return (
    <div
      className={css.container}
      style={{ backgroundColor: bgColor }}
      onClick={onSelectColor} 
    >
      {selected && <div className={css.selected}>Selected</div>}
    </div>
  );
};

export default Frame;
