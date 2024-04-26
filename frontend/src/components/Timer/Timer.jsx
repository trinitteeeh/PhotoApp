import React from "react";
import css from "./Timer.module.css"; // Ensure CSS module paths are correct

const Timer = ({ countDown }) => {
  return (
    <div className={css.container}>
      <div className={css.timerContainer}>
        <div className={css.countDown}>{countDown}</div>
        <svg className={css.progressCircle} viewBox="0 0 36 36">
          <path
            className={css.circleBg}
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={countDown > 0 ? css.circle : css.circleStopped}
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
      </div>
    </div>
  );
};

export default Timer;
