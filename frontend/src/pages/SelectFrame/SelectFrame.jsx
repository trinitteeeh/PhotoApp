import React, { useState } from "react";
import css from "./SelectFrame.module.css";
import Frame from "../../components/Frame/Frame";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const SelectFrame = () => {
  const colorArray = ["/images/select_frame/placeholder_1.svg", "/images/select_frame/placeholder_1.svg", "/images/select_frame/placeholder_1.svg", "/images/select_frame/placeholder_1.svg", "/images/select_frame/placeholder_1.svg"];

  const navigate = useNavigate();
  const [selectedFrame, setSelectedFrame] = useState("");
  const [frames, setFrames] = useState(colorArray);
  const { frameRef } = useAppContext();

  const handleSelect = (frame) => {
    setSelectedFrame(frame); // Update the selected frame
    frameRef.current = frame;
  };

  return (
    <div className={css.container}>
      <div className={css.leftContainer}>
        <div className={css.top}>
          <img src="/images/select_frame/title.svg" alt="" />
        </div>
        <div className={css.bottom}>
          <div className={css.frameWrapper}>
            {frames.map((background, index) => (
              <Frame key={index} background={background} onSelectColor={() => handleSelect(background)} selected={background === selectedFrame} />
            ))}
          </div>
        </div>
      </div>
      <div className={css.frameContainer}>
        <img src="/images/select_frame/frame_bg.svg" alt="" />
        <div
          className={css.imgPlaceholder}
          style={{
            backgroundImage: selectedFrame ? `url('${selectedFrame}')` : `url('${process.env.PUBLIC_URL}/images/select_frame/empty_frame.svg')`,
          }}
        ></div>
        <div className={css.frameLogo} onClick={() => navigate("/photo-session")}>
          <img src="/images/select_frame/select_btn.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SelectFrame;
