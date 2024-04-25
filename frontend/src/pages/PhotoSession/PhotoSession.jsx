import React, { useState, useEffect } from "react";
import css from "./PhotoSession.module.css"; // Ensure that this path matches your CSS module

const PhotoSession = () => {
  const [countDown, setCountDown] = useState(5);

  useEffect(() => {
    // Only set up the interval if the countdown is greater than 0
    if (countDown === 0) return;

    // Set up a timer to count down
    const intervalId = setInterval(() => {
      setCountDown(countDown - 1);
    }, 1000);

    // Clear the interval on component unmount or before re-creating a new interval
    return () => clearInterval(intervalId);
  }, [countDown]); // Depend on countDown to reset the interval whenever countDown changes

  return (
    <div className={css.container}>
      <div className={css.timer}>{countDown} seconds</div>
    </div>
  );
};

export default PhotoSession;
