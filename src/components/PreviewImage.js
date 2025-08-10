import { useState, useEffect, useRef } from "react";
import "./PreviewImage.css";

function PreviewImage({ previewWidth, image, imageSize, textSettings, names, progress }) {
  const imgRef = useRef(null);
  const [displaySize, setDisplaySize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (imgRef.current) {
      // Dimensions affichées réelles (plus précises que getBoundingClientRect)
      setDisplaySize({
        width: imgRef.current.width,
        height: imgRef.current.height
      });
    }
  }, [image]);

  const ratioX = displaySize.width / imageSize.width;
  const ratioY = displaySize.height / imageSize.height;

  const left = textSettings.posX * ratioX;
  const top = textSettings.posY * ratioY;

  return (
    <div className="PreviewImage" style={{ position: "relative" }}>
      <img
        ref={imgRef}
        src={image}
        alt="preview"
        style={{
          width: `${previewWidth}px`,
          height: "auto",
          display: "block"
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
