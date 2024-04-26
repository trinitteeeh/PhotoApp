import React, { useState, useEffect, useRef } from "react";
import css from "./PhotoSession.module.css"; // Ensure that this path matches your CSS module
import Timer from "../../components/Timer/Timer";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const PhotoSession = () => {
  const [countDown, setCountDown] = useState(5);
  const [pictureTaken, setPictureTaken] = useState(0);
  const videoRef = useRef(null);
  const { canvasRefs } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (countDown === 0 && pictureTaken < 5) {
      takePicture();
      setPictureTaken(pictureTaken + 1);
      //add flashing effect and wait for 2 seconds
      if (pictureTaken >= 4) {
        navigate("/select-filter");
      }
      setCountDown(5);
    } else if (pictureTaken > 5) {
      return;
    }
    const intervalId = setInterval(() => {
      setCountDown((prevCountDown) => prevCountDown - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countDown]);

  useEffect(() => {
    const getUserCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          try {
            await videoRef.current.play();
          } catch (e) {
            console.error("Error playing the video:", e);
          }
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    getUserCamera();

    // Cleanup function to stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  const takePicture = () => {
    const width = 500; // Define width, height of the photo
    const height = width / (16 / 9); // Aspect ratio of 16:9
    const newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;
    const ctx = newCanvas.getContext("2d");
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      canvasRefs.current.push(newCanvas); // Store the canvas in the refs array
    }
    // updateDisplay();
  };

  const updateDisplay = () => {
    const container = document.getElementById("canvasContainer");
    container.innerHTML = "";
    canvasRefs.current.forEach((canvas) => {
      container.appendChild(canvas);
    });
  };

  return (
    <div className={css.container}>
      <video ref={videoRef} autoPlay muted className={css.cameraContainer}></video>
      <Timer countDown={countDown} />
    </div>
  );
};

export default PhotoSession;
