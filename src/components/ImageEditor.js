import "./ImageEditor.css";

function ImageEditor({ settings, setSettings, maxX, maxY }) {
  const handleChange = (field, value) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <div className="image-editor">
      <h3>Éditeur de texte</h3>
      <label>
        X:
        <input
          type="range"
          min="0"
          max={maxX}
          value={settings.posX}
          onChange={(e) => handleChange("posX", Number(e.target.value))}
        />
      </label>
      <label>
        Y:
        <input
          type="range"
          min="0"
          max={maxY}
          value={settings.posY}
          onChange={(e) => handleChange("posY", Number(e.target.value))}
        />
      </label>
      <label>
        Taille:{" "}
        <input
          type="number"
          value={settings.fontSize}
          onChange={(e) => handleChange("fontSize", parseInt(e.target.value))}
        />
      </label>
      <label>
        Couleur:{" "}
        <input
          type="color"
          value={settings.color}
          onChange={(e) => handleChange("color", e.target.value)}
        />
      </label>
      <label>
        Police:
        <select
          value={settings.fontFamily}
          onChange={(e) => handleChange("fontFamily", e.target.value)}
        >
          <option>Arial</option>
          <option>Times New Roman</option>
          <option>Verdana</option>
          <option>Georgia</option>
          {/* Ajouter avec file later*/}
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.bold}
          onChange={(e) => handleChange("bold", e.target.checked)}
        />{" "}
        Gras
      </label>
      <label>
        <input
          type="checkbox"
          checked={settings.italic}
          onChange={(e) => handleChange("italic", e.target.checked)}
        />{" "}
        Italique
      </label>
    </div>
  );
}

export default ImageEditor;
