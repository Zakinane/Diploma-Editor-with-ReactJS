import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import ImageEditor from "./components/ImageEditor";
import PreviewImage from "./components/PreviewImage";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [names, setNames] = useState([]);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const previewWidth = 600;

  const [textSettings, setTextSettings] = useState({
    posX: 100,
    posY: 200,
    fontSize: 30,
    color: "#000000",
    fontFamily: "Arial",
    bold: false,
    italic: false,
  });

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);

      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        setImageSize({ width: img.width, height: img.height });
      };
    };
    reader.readAsDataURL(file);
  };

  const handleNamesUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const list = e.target.result
        .split("\n")
        .map((name) => name.trim())
        .filter(Boolean);
      setNames(list);
    };
    reader.readAsText(file);
  };

  const generateNextDiploma = () => {
    if (progress.done + 1 >= names.length) {
      alert("Tous les diplômes ont été générés !");
      return;
    }

    const name = names[progress.done];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = image;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      ctx.textBaseline = "top";
      ctx.font = `${textSettings.italic ? "italic " : ""}${
        textSettings.bold ? "bold " : ""
      }${textSettings.fontSize}px ${textSettings.fontFamily}`;
      ctx.fillStyle = textSettings.color;
      ctx.fillText(name, textSettings.posX, textSettings.posY);

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `${progress.done + 1} - ${name}.png`;
      link.click();

      setProgress((prev) => ({ ...prev, done: prev.done + 1 }));
    };
  };

  return (
    <div className="App">
      <h1>
        Diploma Editor by{" "}
        <a
          href="https://github.com/Zakinane/Diploma-Editor-with-ReactJS"
          target="_blank"
          rel="noreferrer"
        >
          Zak
        </a>
      </h1>

      <ImageUploader
        onImageUpload={handleImageUpload}
        onNamesUpload={handleNamesUpload}
      />

      {image && (
        <>
          <PreviewImage
            previewWidth={previewWidth}
            image={image}
            imageSize={imageSize}
            textSettings={textSettings}
            names={names}
            progress={progress}
          />
          <ImageEditor
            settings={textSettings}
            setSettings={setTextSettings}
            maxX={imageSize.width}
            maxY={imageSize.height}
          />
          {progress.done < names.length && (
            <button onClick={generateNextDiploma} style={{ marginTop: "20px" }}>
              Générer le diplôme {progress.done + 1} / {names.length}
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
