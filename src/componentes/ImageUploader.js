import { useState } from "react";
import FileDropZone from "./FileDropZone";
import ImagePreview from "./ImagePreview";
import { formatBytes, isImageFile } from "../utilidades/file";

export default function ImageUploader() {
  const [msg, setMsg] = useState("");
  const [src, setSrc] = useState(null);
  const [meta, setMeta] = useState({ name: "", sizeText: "", width: 0, height: 0 });

  const resetPreview = () => {
    setSrc(null);
    setMeta({ name: "", sizeText: "", width: 0, height: 0 });
    setMsg("");
  };

  const handleFile = (file) => {
    resetPreview();

    if (!file) {
      setMsg("No seleccionaste ningún archivo.");
      return;
    }

    if (!isImageFile(file)) {
      setMsg("El archivo seleccionado no es una imagen válida.");
      return;
    }

    const reader = new FileReader();
    reader.onerror = () => setMsg("No se pudo leer el archivo.");
    reader.onload = () => {
      const dataUrl = reader.result;
      const imgEl = new Image();
      imgEl.onload = () => {
        setSrc(dataUrl);
        setMeta({
          name: file.name,
          sizeText: formatBytes(file.size),
          width: imgEl.naturalWidth,
          height: imgEl.naturalHeight,
        });
        setMsg("Imagen cargada correctamente.");
      };
      imgEl.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="uploader" aria-labelledby="uploaderTitle">
      <h2 id="uploaderTitle">Seleccioná un archivo de imagen</h2>

      <FileDropZone onFile={handleFile} setHint={setMsg} />

      <output id="msg" role="status" aria-live="polite" className="msg">
        {msg}
      </output>

      {src ? (
        <ImagePreview
          src={src}
          name={meta.name}
          sizeText={meta.sizeText}
          width={meta.width}
          height={meta.height}
        />
      ) : (
        <noscript className="noscript">
          Esta página necesita JavaScript para previsualizar imágenes.
        </noscript>
      )}
    </section>
  );
}
