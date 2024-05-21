import React, { useEffect, useRef, useState } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { applyFilter } from "./filter";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const Print = () => {
  const { canvasRefs, filterRef, frameRef } = useAppContext();
  const printRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [timer, setTimer] = useState(60);
  const [dot, setDot] = useState("");
  const navigate = useNavigate();

  // Timer and dot effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          localStorage.clear();
          navigate("/");
          return 0;
        }
        return prevTimer - 1;
      });

      setDot((prevDot) => (prevDot.length >= 3 ? "" : prevDot + "."));
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  // Delay for setting isLoaded to true
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // 3 second delay

    return () => clearTimeout(timer);
  }, []);

  // Main effect to apply filters and download image
  useEffect(() => {
    if (!isLoaded) return;

    const applyFilterToCanvases = () => {
      const pictureDivs = printRef.current.querySelectorAll(`.${css.picture}`);
      pictureDivs.forEach((div) => {
        const canvas = div.querySelector("canvas");
        if (canvas) {
          const ctx = canvas.getContext("2d");
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          console.log("ini filter ", filterRef.current);
          applyFilter(imageData.data, filterRef.current);
          ctx.putImageData(imageData, 0, 0);
          canvas.style.filter = filterRef.current; // Ensure the CSS filter is also applied if using CSS filters
        }
      });
    };

    const downloadFrameAsImage = () => {
      requestAnimationFrame(() => {
        html2canvas(printRef.current, { backgroundColor: null }).then((canvas) => {
          const dataURL = canvas.toDataURL("image/png"); // This creates a PNG data URL
          console.log("Canvas captured");

          // Convert dataURL to a Blob for upload
          const dataURLtoBlob = (dataURL) => {
            const arr = dataURL.split(",");
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
          };

          const blob = dataURLtoBlob(dataURL);

          // Create a form data object
          const formData = new FormData();
          formData.append("file", blob, uuidv4() + ".png"); // Optional: Use uuid to generate a unique filename
          formData.append("upload_preset", "pdrrobxc"); // Replace with your upload preset

          // Upload the image to Cloudinary
          axios
            .post(`https://api.cloudinary.com/v1_1/dmqhud5tb/image/upload`, formData)
            .then((response) => {
              console.log("Cloudinary response:", response);
              setImageURL(response.data.secure_url); // Use the Cloudinary URL of the uploaded image
            })
            .catch((error) => {
              console.error("Error uploading image to Cloudinary:", error);
            });

          // Optionally, trigger download on the client as well
          const link = document.createElement("a");
          link.download = "frame-image.png";
          link.href = dataURL;
          link.click();
          link.onload = () => {
            URL.revokeObjectURL(dataURL); // Cleanup
          };
        });
      });
    };

    applyFilterToCanvases();
    downloadFrameAsImage();
  }, [isLoaded, filterRef]);

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <h2 className={css.title}>
          Printing&nbsp;&nbsp;&nbsp;Your &nbsp;&nbsp;&nbsp;<b style={{ color: "#fff" }}>Memories</b>
          {dot}
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
        <div className={css.qrContainer}>{imageURL && <QRCodeSVG value={imageURL} className={css.qr} />}</div>
        <div className={css.printContainer}>
          <img src="/images/print/print.svg" alt="" className={css.printImg} />
          <h4 className={css.bottomText}>
            Creating another&nbsp;<b>memories!</b> &nbsp;in {timer}s
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Print;
