import React, { useState } from "react";
import css from "./PhotoSession.module.css";

const PhotoSession = () => {
    const [countDown, setCountDown] = useState(5);

    if (countDown === 0) return;
    const intervalId = setInterval(() => {
        setCountDown(countDown - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [countDown]);

  return (
    <div className={styles.container}>
      <div className={styles.timer}>
        {timeLeft} seconds
      </div>
    </div>
  );
};

export default PhotoSession;
