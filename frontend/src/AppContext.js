import React, { createContext, useRef, useContext, useEffect } from "react";

// Create the context
const AppContext = createContext(null);

// Custom hook to use the context
export const useAppContext = () => useContext(AppContext);

// Provider component
export const AppProvider = ({ children }) => {
  const canvasRefs = useRef([]);
  const frameRef = useRef(null);
  const filterRef = useRef(null);

  // Load data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("appContext");
    if (savedData) {
      const { canvasRefs: savedCanvasRefs, frameRef: savedFrameRef, filterRef: savedFilterRef } = JSON.parse(savedData);
      if (savedCanvasRefs) {
        canvasRefs.current = savedCanvasRefs.map((dataUrl) => {
          const canvas = document.createElement("canvas");
          const img = new Image();
          img.src = dataUrl;
          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
          };
          return canvas;
        });
      }
      frameRef.current = savedFrameRef;
      filterRef.current = savedFilterRef;
    }
  }, []);

  // Save data to local storage before the window unloads
  useEffect(() => {
    const handleSaveToLocalStorage = () => {
      const dataToSave = {
        canvasRefs: canvasRefs.current.map((canvas) => canvas.toDataURL()),
        frameRef: frameRef.current,
        filterRef: filterRef.current,
      };
      localStorage.setItem("appContext", JSON.stringify(dataToSave));
    };

    window.addEventListener("beforeunload", handleSaveToLocalStorage);
    return () => {
      window.removeEventListener("beforeunload", handleSaveToLocalStorage);
    };
  }, [canvasRefs, frameRef, filterRef]);

  // Function to update context values
  const updateCanvasRefs = (newRefs) => {
    canvasRefs.current = newRefs;
    const dataToSave = {
      canvasRefs: newRefs.map((canvas) => canvas.toDataURL()),
      frameRef: frameRef.current,
      filterRef: filterRef.current,
    };
    localStorage.setItem("appContext", JSON.stringify(dataToSave));
  };

  const updateFrameRef = (newRef) => {
    frameRef.current = newRef;
    localStorage.setItem(
      "appContext",
      JSON.stringify({
        canvasRefs: canvasRefs.current.map((canvas) => canvas.toDataURL()),
        frameRef: newRef,
        filterRef: filterRef.current,
      })
    );
  };

  const updateFilterRef = (newRef) => {
    filterRef.current = newRef;
    localStorage.setItem(
      "appContext",
      JSON.stringify({
        canvasRefs: canvasRefs.current.map((canvas) => canvas.toDataURL()),
        frameRef: frameRef.current,
        filterRef: newRef,
      })
    );
  };

  return <AppContext.Provider value={{ canvasRefs, frameRef, filterRef, updateCanvasRefs, updateFrameRef, updateFilterRef }}>{children}</AppContext.Provider>;
};
