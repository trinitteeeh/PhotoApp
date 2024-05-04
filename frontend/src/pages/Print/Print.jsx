import React, { useEffect } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import screenshot from "image-screenshot";

const Print = () => {
  const { canvasRefs, filterRef } = useAppContext();

  useEffect(() => {
    const frameElement = document.getElementById("frame");
    if (!frameElement) return; // Early return if the frame element does not exist

    const pictures = frameElement.querySelectorAll(`.${css.picture}`);
    pictures.forEach((picture) => {
      const canvas = picture.querySelector("canvas");
      if (!canvas) return;

      html2canvas(canvas).then((canvasElement) => {
        applyFilterToCanvas(canvasElement); // Apply filter and draw it directly
        picture.replaceChildren(canvasElement); // Replace the picture's children with the new canvas
      });
    });

    html2canvas(frameElement).then((frameCanvas) => {
      screenshot(frameCanvas).download(); // Download the image of the frame
    });
  }, [filterRef.current]); // Depend on filterRef.current to re-run when it changes

  // Function to apply filter to canvas
  function applyFilterToCanvas(canvas) {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    applyFilter(imageData.data, filterRef.current);
    ctx.putImageData(imageData, 0, 0);
  }

  // Function to apply filter to pixel data
  function applyFilter(data, filter) {
    switch (filter) {
      case "grayscale(50%)":
        applyGrayscale(data);
        break;
      case "sepia(50%)":
        applySepia(data);
        break;
      case "invert(100%)":
        applyInvert(data);
        break;
      // Add more cases as needed for additional filters
      default:
        break;
    }
  }

  function applyGrayscale(data) {
    for (let i = 0; i < data.length; i += 4) {
      const brightness = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      data[i] = brightness; // Red
      data[i + 1] = brightness; // Green
      data[i + 2] = brightness; // Blue
    }
  }

  function applySepia(data) {
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
      data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
      data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
    }
  }

  function applyInvert(data) {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // Red
      data[i + 1] = 255 - data[i + 1]; // Green
      data[i + 2] = 255 - data[i + 2]; // Blue
    }
  }

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
