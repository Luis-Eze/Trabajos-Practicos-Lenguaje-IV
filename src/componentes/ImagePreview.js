export default function ImagePreview({ src, name, sizeText, width, height }) {
  if (!src) return null;

  return (
    <figure className="preview">
      <img src={src} alt="Vista previa de la imagen seleccionada" />
      <figcaption className="meta">
        {name} — {sizeText} — {width}×{height}px
      </figcaption>
    </figure>
  );
}
