import { useRef, useState } from "react";

export default function FileDropZone({ onFile, setHint }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const openPicker = () => inputRef.current?.click();

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openPicker();
    }
  };

  const onInputChange = (e) => {
    const file = e.target.files && e.target.files[0];
    onFile?.(file);
  };

  const onDragEnter = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragOver(true);
    setHint?.("Soltá la imagen…");
  };

  const onDragOver = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (!dragOver) setDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragOver(false);
  };

  const onDrop = (e) => {
    e.preventDefault(); e.stopPropagation();
    setDragOver(false);
    const files = e.dataTransfer?.files;
    if (!files || files.length === 0) {
      setHint?.("No se soltó ningún archivo.");
      return;
    }
    if (files.length > 1) setHint?.("Se usará solo el primer archivo.");
    onFile?.(files[0]);
  };

  return (
    <div
      id="dropZone"
      className={`dropzone ${dragOver ? "dragover" : ""}`}
      tabIndex={0}
      role="button"
      aria-label="Soltar o seleccionar una imagen"
      onClick={openPicker}
      onKeyDown={onKeyDown}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        id="fileInput"
        ref={inputRef}
        type="file"
        accept="image/*"
        aria-hidden="true"
        onChange={onInputChange}
      />
      <p>
        Arrastrá y soltá una imagen aquí
        <br /><span>o hacé clic para elegir</span>
      </p>
    </div>
  );
}
