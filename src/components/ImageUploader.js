import "./ImageUploader.css"

function ImageUploader({ onImageUpload, onNamesUpload }) {
  return (
    <div className="ImageUploader">
      <input type="file" accept="image/*" onChange={(e) => onImageUpload(e.target.files[0])} />
      <input type="file" accept=".txt" onChange={(e) => onNamesUpload(e.target.files[0])} />
    </div>
  );
}

export default ImageUploader;
