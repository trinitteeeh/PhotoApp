import React, { useState } from "react";
import css from "./SelectFilter.module.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";
import Filter from "../../components/Filter/Filter";
import PhotoSessionDisplay from "../../components/PhotoSessionDisplay/PhotoSessionDisplay";

const SelectFilter = () => {
  const navigate = useNavigate();
  const { canvasRefs, frameRef, filterRef } = useAppContext();

  const [selectedFilter, setSelectedFilter] = useState(null);

  const applyFilter = (filterValue) => {
    setSelectedFilter(filterValue);
    filterRef.current = filterValue;
  };

  const filters = [
    { name: "Grayscale", value: "grayscale(50%)" },
    { name: "Sepia", value: "sepia(50%)" },
    { name: "Invert", value: "invert(100%)" },
    { name: "Saturate", value: "saturate(150%)" },
    { name: "Brightness", value: "brightness(150%)" },
    { name: "Blur", value: "blur(5px)" },
  ];

  return (
    <div className={css.container}>
      <div className={css.leftSide}>
        <div className={css.filterContainer}>
          <div className={css.title}>
            <img src="/images/select_filter/title.svg" alt="" />
          </div>
          <div className={css.filter}>
            <div className={css.scrollBar}>
              {filters.map((filter, index) => (
                <Filter key={index} name={filter.name} filter={filter.value} onClick={() => applyFilter(filter.value)} />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={css.rightSide}>
        <div className={css.frameContainer}>
          <div className={css.frame} style={{ backgroundImage: `url('${frameRef.current}')` }}>
            {canvasRefs.current.map((canvas, index) => (
              <div key={index} className={css.picture} style={{ filter: selectedFilter }}>
                {canvas && <canvas ref={(el) => el && el.replaceWith(canvas)}></canvas>}
              </div>
            ))}
            <div className={css.logo}>
              <img src="/images/select_filter/logo.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={css.printLogo}>
          <img src="/images/select_filter/print_logo.svg" alt="" onClick={() => navigate("/print")} />
        </div>
      </div>
    </div>
  );
};

export default SelectFilter;
