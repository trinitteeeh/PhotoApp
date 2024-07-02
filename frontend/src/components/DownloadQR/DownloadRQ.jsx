import React from "react";
import css from "./DownloadQR.module.css";
import { QRCodeSVG } from "qrcode.react";

const DownloadRQ = ({ qr }) => {
  return <div className={css.qrContainer}>{qr === "" ? <img src="gif/Loading_gif.gif" alt="loading gif" /> : <QRCodeSVG value={qr} className={css.qr} />}</div>;
};

export default DownloadRQ;
