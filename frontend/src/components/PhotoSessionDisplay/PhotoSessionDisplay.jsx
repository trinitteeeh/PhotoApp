import React from "react";
import css from "./PhotoSessionDisplay.module.css";

const PhotoSessionDisplay = ({ canvasRefs }) => {
  // Function to create child divs based on canvasRefs
  const renderChildren = () => {
    const children = [];
    for (let i = 0; i < 3; i++) {
      children.push(
        <div className={css.child} key={i}>
          {canvasRefs[i] ? <canvas ref={(el) => el && el.replaceWith(canvasRefs[i])}></canvas> : null}
        </div>
      );
    }
    return children;
  };

  return (
    <div className={css.container}>
      <div className={css.display}></div>
      <div className={css.leftBrick}></div>
      <div className={css.childContainer}>{renderChildren()}</div>
      <div className={css.rightBrick}></div>
    </div>
  );
};

export default PhotoSessionDisplay;
