import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage/StartPage";
import TutorPage from "./pages/TutorPage/TotorPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed/PaymentFailed.jsx";
import SelectFrame from "./pages/SelectFrame/SelectFrame.jsx";
import PhotoSession from "./pages/PhotoSession/PhotoSession.jsx";
import SelectFilter from "./pages/SelectFilter/SelectFilter.jsx";
import Print from "./pages/Print/Print.jsx";
import ProductSelection from "./pages/ProductSelection/ProductSelection.jsx"
import { useEffect, useRef, useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/tutor" element={<TutorPage />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
        <Route path="/select-frame" element={<SelectFrame />} />
        <Route path="/photo-session" element={<PhotoSession />} />
        <Route path="/select-filter" element={<SelectFilter />} />
        <Route path="/print" element={<Print />} />
        <Route path="/product-selection" element={<SelectFrame />} />
        <Route path="/print-preview" element={<PrintPreview />} />
      </Routes>
    </BrowserRouter>
  );
}

// Generate a function for print preview
function PrintPreview() {
  const dataURL = localStorage.getItem("dataURL");
  
  return (
    <img src={dataURL} alt="Print Preview" />
  );
}

export default App;
