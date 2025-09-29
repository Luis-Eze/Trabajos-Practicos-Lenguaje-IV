import "./style.css"
import ImageUploader from "./componentes/ImageUploader";

export default function App() {
  return (
    <main className="container">
      <h1>Subir imagen</h1>
      <p>Subir una imagen y se va a mostrar aquí.</p>

      <ImageUploader />
    </main>
  );
}
