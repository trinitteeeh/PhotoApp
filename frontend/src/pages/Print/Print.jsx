import React, { useEffect, useRef, useState } from "react";
import css from "./Print.module.css";
import { useAppContext } from "../../AppContext";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";
import { applyFilter } from "./filter";

const Print = () => {
  const { canvasRefs, filterRef, frameRef } = useAppContext();
  const printRef = useRef(null);
  const [imageURL, setImageURL] = useState("");
  const [qrCodeValue, setQRCodeValue] = useState("");

  useEffect(() => {
    const applyFilterToCanvases = () => {
      // Get all divs with the class 'picture' within the frame
      const pictureDivs = printRef.current.querySelectorAll(`.${css.picture}`);
      pictureDivs.forEach((div) => {
        const canvas = div.querySelector("canvas");
        // Only apply filter if the child is a canvas
        if (canvas) {
          const ctx = canvas.getContext("2d");
          console.log("ini filter", filterRef.current);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          applyFilter(imageData.data, filterRef.current); // Use your filter function here
          ctx.putImageData(imageData, 0, 0);
        }
      });
    };
    // Capture the frame as an image and set the URL
<<<<<<< Updated upstream
    const downloadFrameAsImage = () => {
      html2canvas(printRef.current, { backgroundColor: null }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "frame-image.png";
        link.href = canvas.toDataURL();
        link.click();

        const fileName = "foto.png";
        const url = canvas.toDataURL("image/png");

        //disini upload canvas ke server!
        // fetch("/upload", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ imageBase64: url, fileName }),
        // })
        //   .then((response) => response.json())
        //   .then((data) => {
        //     console.log("Image uploaded:", data.imageUrl);
        //     // Optionally, do something with the uploaded image URL
        //     setImageURL(data.imageUrl);
        //   })
        //   .catch((error) => {
        //     console.error("Error uploading image:", error);
        //   });

        //const imageURL = canvas.toDataURL(); //nanti returnnya boleh link dari foto itu
        //dibawah ini cuma dummy data
        const imageURL = "https://t4.ftcdn.net/jpg/01/25/86/35/360_F_125863509_jaISqQt7MOfhOT3UxRTHZoEbMmmFYIr8.jpg";
        setImageURL(imageURL); //masukin
      });
=======
    const downloadFrameAsImage = async () => {
      const canvas = await html2canvas(printRef.current, { backgroundColor: null });
      const url = canvas.toDataURL('image/jpeg'); // Mengatur kualitas JPEG ke 0.5 untuk mengurangi ukuran data URL
    
      // Kirim URL gambar ke server
      try {
        const response = await axios.post('http://localhost:5000/upload', { imageUrl: url });
        console.log("INI URLNYA ::::;   " , url);
        setQRCodeValue(url);
    
        //setImageURL(url); // Atur URL gambar jika pengiriman berhasil
      } catch (error) {
        console.error('Failed to upload photo:', error);
      }
>>>>>>> Stashed changes
    };
    

    applyFilterToCanvases();
    downloadFrameAsImage();
<<<<<<< Updated upstream
  }, []);
=======
  }, [filterRef.current]);

  const getImageURL = async () => {
    try {
      // Mengambil URL gambar dari server
      const response = await axios.get('http://localhost:5000/get');
      const imageUrl = response.data.imageUrl;
      setImageURL(imageUrl);

      // Set nilai QR code
      // setQRCodeValue(imageUrl);
    } catch (error) {
      console.error('Error getting image URL:', error);
    }
  };

  useEffect(() => {
    getImageURL();
  }, []);

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
>>>>>>> Stashed changes

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
        <div className={css.qrContainer}>{imageURL && <QRCodeSVG value={qrCodeValue} className={css.qr} />}</div>
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
