import React, { useEffect, useRef, useState } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { applyFilter } from "./filter";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Print = () => {
  const { canvasRefs, filterRef, frameRef } = useAppContext();
  const printRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");
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
          applyFilter(imageData.data, filterRef.current);
          ctx.putImageData(imageData, 0, 0);
        }
      });
    };

    const downloadFrameAsImage = async () => {
      // const canvas = await html2canvas(printRef.current, { backgroundColor: null });
      // const url = canvas.toDataURL("image/jpeg"); // Mengatur kualitas JPEG ke 0.5 untuk mengurangi ukuran data URL

      // // Kirim URL gambar ke server
      // try {
      //   const response = await axios.post("http://localhost:5000/upload", { imageUrl: url });
      //   console.log("INI URLNYA ::::;   ", url);
      //   setQRCodeValue(url);

      //   //setImageURL(url); // Atur URL gambar jika pengiriman berhasil
      // } catch (error) {
      //   console.error("Failed to upload photo:", error);
      // }

      html2canvas(printRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "frame-image.png";
        link.href = canvas.toDataURL();
        link.click();
        console.log("downloaded");

        const imageURL = "https://t4.ftcdn.net/jpg/01/25/86/35/360_F_125863509_jaISqQt7MOfhOT3UxRTHZoEbMmmFYIr8.jpg";
        setImageURL(imageURL);
      });
    };

    applyFilterToCanvases();
    downloadFrameAsImage();
  }, [isLoaded]);

  const getImageURL = async () => {
    try {
      // Mengambil URL gambar dari server
      const response = await axios.get("http://localhost:5000/get");
      const imageUrl = response.data.imageUrl;
      setImageURL(imageUrl);

      // Set nilai QR code
      // setQRCodeValue(imageUrl);
    } catch (error) {
      console.error("Error getting image URL:", error);
    }
  };

  useEffect(() => {
    getImageURL();
  }, [isLoaded, filterRef]);

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
          Printing&nbsp;&nbsp;&nbsp;Your &nbsp;&nbsp;&nbsp;<b style={{ color: "#fff" }}>Memories</b>&nbsp;&nbsp;&nbsp;
          <span className={css.dot}>{dot}</span>
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
        <div className={css.qrContainer}>{imageURL && <QRCodeSVG value={qrCodeValue} className={css.qr} />}</div>
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
