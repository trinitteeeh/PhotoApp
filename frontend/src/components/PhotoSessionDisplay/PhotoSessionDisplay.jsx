import React from "react";
import css from "./PhotoSessionDisplay.module.css";

const PhotoSessionDisplay = ({ canvasRef }) => {
  // Function to create 5 child divs
  const renderChildren = () => {
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <div className={css.child} key={i}>
          {canvasRef.current && canvasRef.current[i] ? <canvas ref={(el) => el && el.replaceWith(canvasRef.current[i])}></canvas> : null}
        </div>
      );
    }
    return children;
  };

  return (
    <div className={css.container}>
      <div className={css.fillerChild}></div>
      <div className={css.childContainer}>{renderChildren()}</div>
      <div className={css.fillerChild}></div>
    </div>
  );
};

export default PhotoSessionDisplay;
