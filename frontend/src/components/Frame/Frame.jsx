import React from "react";
import css from "./Frame.module.css";

const Frame = ({ background, onSelectColor, selected }) => {
  return (
    <div className={css.container} style={{ backgroundImage: `url('${background}')` }} onClick={onSelectColor}>
      {selected && <div className={css.selected}>Selected</div>}
    </div>
  );
};

export default Frame;
