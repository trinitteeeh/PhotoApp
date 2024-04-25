import React from "react";
import css from "./SelectFrame.module.css";

const SelectFrame = () => {
  return (
    <div className={css.container}>
      <div className={css.frameContainer}>
        <img src="/images/select_frame/frame_bg.svg" alt="" />
        <div className={css.imgPlaceholder}></div>
        <div className={css.frameLogo}>
          <img src="/images/select_frame/select_frame.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SelectFrame;
