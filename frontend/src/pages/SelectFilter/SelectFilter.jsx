import React from "react";
import css from "./SelectFilter.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const SelectFilter = () => {
  const navigate = useNavigate();
  const { canvasRefs, frameRef } = useAppContext();

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.frameContainer}>
          <img src="/images/select_filter/leather_frame.svg" alt="" className={css.leatherFrame} />

          <div className={css.frame}>
            {canvasRefs.current.map((canvas, index) => (
              <div key={index} className={css.picture}>
                {canvas && <canvas ref={(el) => el && el.replaceWith(canvas)}></canvas>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={css.rightSide}>
        <div className={css.filterContainer}>
          <div className={css.title}>
            <h2>Filters</h2>
          </div>
          <div className={css.filter}>
            <div className={css.scrollBar}>
              <div className={css.filterItem}>filter 1</div>
              <div className={css.filterItem}>filter 2</div>
              <div className={css.filterItem}>filter 3</div>
              <div className={css.filterItem}>filter 4</div>
              <div className={css.filterItem}>filter 5</div>
              <div className={css.filterItem}>filter 6</div>
              <div className={css.filterItem}>filter 7</div>
            </div>
          </div>
        </div>
        <div className={css.printLogo}>
          <img src="/images/select_filter/print_logo.svg" alt="" onClick={() => navigate("/print")} />
        </div>
      </div>
    </div>
  );
};

export default SelectFilter;
