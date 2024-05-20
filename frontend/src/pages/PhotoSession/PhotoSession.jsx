import React, { useState, useEffect, useRef } from "react";
import css from "./PhotoSession.module.css"; // Ensure that this path matches your CSS module
import Timer from "../../components/Timer/Timer";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import LoadingPage from "../LoadingPage/LoadingPage";
import PhotoSessionDisplay from "../../components/PhotoSessionDisplay/PhotoSessionDisplay";
import Flash from "../../components/Flash/Flash";

const PhotoSession = () => {
  const [countDown, setCountDown] = useState(2);
  const [pictureTaken, setPictureTaken] = useState(0);
  const [flash, setFlash] = useState(false);
  const [timerReady, setTimerReady] = useState(false);
  const beepRef = useRef(null);
  const videoRef = useRef(null);
  const { canvasRefs, updateCanvasRefs } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    if (!videoRef) return;
    else if (!timerReady) {
      setTimeout(() => {
        setTimerReady(true);
      }, 1000);
      return;
    }

    const playBeep = () => {
      if (beepRef.current) {
        beepRef.current.currentTime = 0;
        beepRef.current.play();

        // Stop the beep after 0.5 seconds
        setTimeout(() => {
          beepRef.current.pause();
          beepRef.current.currentTime = 0;
        }, 500);
      }
    };

    // When countdown reaches 0
    if (countDown === 0 && pictureTaken < 3) {
      takePicture();
      setPictureTaken(pictureTaken + 1);
      // Add flashing effect and wait for 2 seconds
      setFlash(true); // Trigger flash
      setTimeout(() => {
        setFlash(false); // End flash

        // Check if 3 pictures have been taken, if so, navigate to next page
        if (pictureTaken >= 2) {
          navigate("/select-filter");
        } else {
          // Reset countdown only if less than 3 pictures have been taken
          setCountDown(2);
        }
      }, 1000);
    } else {
      const intervalId = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
        playBeep();
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [countDown, videoRef, timerReady]);

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
    const width = 500;
    const height = width / (16 / 9); // Aspect ratio of 16:9
    const newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;
    const ctx = newCanvas.getContext("2d");
    if (ctx && videoRef.current) {
      ctx.drawImage(videoRef.current, 0, 0, width, height);
      const updatedCanvasRefs = [...canvasRefs.current, newCanvas];
      updateCanvasRefs(updatedCanvasRefs);
    }
  };

  return (
    <div className={css.container}>
      {!videoRef && <LoadingPage />}
      <video ref={videoRef} autoPlay muted className={css.cameraContainer}></video>
      <audio ref={beepRef} src="/audio/countdown_beep.wav" preload="auto"></audio>
      {flash && <Flash />}
      {!flash && timerReady && <Timer countDown={countDown} />}
      <PhotoSessionDisplay canvasRefs={canvasRefs.current} />
    </div>
  );
};

export default PhotoSession;
