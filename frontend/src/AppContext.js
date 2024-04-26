import React, { createContext, useRef, useContext } from "react";

const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const canvasRefs = useRef([]);
  const frameRef = useRef(null);

  return <AppContext.Provider value={{ canvasRefs, frameRef }}>{children}</AppContext.Provider>;
};
