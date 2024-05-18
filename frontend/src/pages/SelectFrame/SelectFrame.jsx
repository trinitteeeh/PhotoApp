import React, { useState } from "react";
import css from "./SelectFrame.module.css";
import Frame from "../../components/Frame/Frame";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const SelectFrame = () => {
  const colorArray = ["pink", "blue", "green", "yellow", "red", "black"];

  const navigate = useNavigate();

  const [selectedColor, setSelectedColor] = useState("");

  const handleSelectColor = (color) => {
    setSelectedColor(color); // Update the selected color
  };

  return (
    <div className={css.container}>
      <div className={css.leftContainer}>
        <div className={css.top}>
          <img src="/images/select_frame/title.svg" alt="" />
        </div>
        <div className={css.bottom}>
          <div className={css.frameWrapper}>
            {colorArray.map((color, index) => (
              <Frame key={index} bgColor={color} onSelectColor={() => handleSelectColor(color)} selected={color === selectedColor} />
            ))}
          </div>
        </div>
      </div>
      <div className={css.frameContainer}>
        <img src="/images/select_frame/frame_bg.svg" alt="" />
        <div
          className={css.imgPlaceholder}
          style={{
            backgroundColor: selectedColor || "#f0f0f0", // Default to light grey when no color is selected
            backgroundImage: selectedColor ? "none" : `url('${process.env.PUBLIC_URL}/images/select_frame/empty_frame.svg')`,
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
