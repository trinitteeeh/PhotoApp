import React, { useEffect } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import screenshot from "image-screenshot";

const Print = () => {
  const { canvasRefs, filterRef } = useAppContext();

  useEffect(() => {
    const frameElement = document.getElementById("frame");

    // Use html2canvas to create a canvas from the frame element
    html2canvas(frameElement).then((canvas) => {
      // Apply the filter to the canvas
      const ctx = canvas.getContext("2d");
      ctx.filter = filterRef.current;

      // Use image-screenshot to download the canvas as an image
      screenshot(canvas).download()
    });
  }, []);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.frameContainer}>
          <img src="/images/select_filter/leather_frame.svg" alt="" className={css.leatherFrame} />
          <div className={css.frame} id="frame">
            {canvasRefs.current.map((canvas, index) =>
              index === 2 ? (
                <>
                  <div className={css.picture}>
                    <img src="/images/select_filter/piper_logo.svg" alt="Static Image" />
                  </div>
                  <div className={css.picture} style={{ filter: filterRef.current }}>
                    {canvas && <canvas ref={(el) => el && el.replaceWith(canvas)}></canvas>}
                  </div>
                </>
              ) : (
                <div key={index} className={css.picture} style={{ filter: filterRef.current }}>
                  {canvas && <canvas ref={(el) => el && el.replaceWith(canvas)}></canvas>}
                </div>
              )
            )}
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
