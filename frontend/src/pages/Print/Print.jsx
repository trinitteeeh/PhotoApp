import React from "react";
import css from "./Print.module.css";

const Print = ({ canvasRef, frameRef }) => {
  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.frameContainer}>
          <img src="/images/select_filter/leather_frame.svg" alt="" className={css.leatherFrame} />
          <div className={css.frame}>
            <div className={css.picture}>1</div>
            <div className={css.picture}>2</div>
            <div className={css.picture}>3</div>
            <div className={css.picture}>4</div>
            <div className={css.picture}>5</div>
            <div className={css.picture}>6</div>
          </div>
        </div>
      </div>
      <div className={css.rightSide}>
        <div className={css.printContainer}>
          <div className={css.title}>
            <h2>Printing Your Memories</h2>
          </div>
          <div className={css.printImg}>
            <img src="/images/print/print.svg" alt="" />
          </div>
          <div className={css.bottomText}>
            <h4>Creating another memories in (60s)</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Print;
