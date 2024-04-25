import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import StartPage from "./pages/StartPage/StartPage";
import TutorPage from "./pages/TutorPage/TotorPage.jsx";
import PaymentSuccess from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import PaymentFailed from "./pages/PaymentFailed/PaymentFailed.jsx";
import SelectFrame from "./pages/SelectFrame/SelectFrame.jsx";
import PhotoSession from "./pages/PhotoSession/PhotoSession.jsx";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
