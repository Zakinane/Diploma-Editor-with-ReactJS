import { useState } from "react";
import "./PreviewImage.css";

function PreviewImage({ previewWidth, image, imageSize, textSettings, names, progress }) {
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  const ratioX = displaySize.width / imageSize.width;
  const ratioY = displaySize.height / imageSize.height;

  const left = textSettings.posX * ratioX;
  const top = textSettings.posY * ratioY;

  return (
    <div className="PreviewImage" style={{ position: "relative" }}>
      <img
        src={image}
        alt="preview"
        style={{
          width: `${previewWidth}px`,
          height: "auto",
          display: "block"
        }}
        onLoad={(e) => {
          setDisplaySize({
            width: e.target.width,
            height: e.target.height
          });
        }}
      />
      <div
        style={{
          position: "absolute",
          top: top,
          left: left,
          fontSize: textSettings.fontSize * ratioX,
          color: textSettings.color,
          fontFamily: textSettings.fontFamily,
          fontWeight: textSettings.bold ? "bold" : "normal",
          fontStyle: textSettings.italic ? "italic" : "normal",
        }}
      >
        {names[progress.done] || "Aperçu du nom"}
      </div>
    </div>
  );
}

export default PreviewImage;
