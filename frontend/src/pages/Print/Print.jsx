import React, { useEffect, useRef, useState } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const Print = () => {
  const { canvasRefs, filterRef, frameRef } = useAppContext();
  const printRef = useRef(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    const applyFilterToCanvases = () => {
      // Get all divs with the class 'picture' within the frame
      const pictureDivs = printRef.current.querySelectorAll(`.${css.picture}`);
      pictureDivs.forEach((div) => {
        const canvas = div.querySelector("canvas");
        // Only apply filter if the child is a canvas
        if (canvas) {
          const ctx = canvas.getContext("2d");
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          applyFilter(imageData.data, filterRef.current); // Use your filter function here
          ctx.putImageData(imageData, 0, 0);
        }
      });
    };

    // Capture the frame as an image and set the URL
    const downloadFrameAsImage = () => {
      html2canvas(printRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "frame-image.png";
        link.href = canvas.toDataURL();
        link.click();

        const imageURL = canvas.toDataURL("image/png");
        setImageURL(imageURL);
      });
    };

    applyFilterToCanvases();
    downloadFrameAsImage();
  }, [filterRef.current]);

  // Function to apply specific filters
  const applyFilter = (data, filter) => {
    // Example grayscale filter
    if (filter === "grayscale(50%)") {
      for (let i = 0; i < data.length; i += 4) {
        const brightness = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = data[i + 1] = data[i + 2] = brightness;
      }
    }
    // Add other filters similarly
  };

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h2 className={css.title}>
          Printing&nbsp;&nbsp;&nbsp;Your &nbsp;&nbsp;&nbsp;<b style={{ color: "#fff" }}>Memories</b>
        </h2>
        <div className={css.frameContainer}>
          <div className={css.frame} ref={printRef} style={{ backgroundImage: `url('${frameRef.current}')` }}>
            {canvasRefs.current.map((canvas, index) => (
              <div key={index} className={css.picture} style={{ filter: filterRef.current }}>
                {canvas && <canvas ref={(el) => el && el.replaceWith(canvas)}></canvas>}
              </div>
            ))}
            <div className={css.logo}>
              <img src="/images/select_filter/logo.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className={css.rightSide}>
        {/* <div className={css.qrContainer}>{imageURL && <QRCodeCanvas value={imageURL} className={css.qr} />}</div> */}
        <div className={css.printContainer}>
          <img src="/images/print/print.svg" alt="" className={css.printImg} />
          <h4 className={css.bottomText}>
            Creating another&nbsp;<b>memories!</b> &nbsp;in 60s
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Print;
