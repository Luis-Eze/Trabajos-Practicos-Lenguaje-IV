// App.js
import { HashRouter, Routes, Route } from "react-router-dom"; // 👈 HashRouter
import "./style.css";
import NavBar from "./componentes/NavBar";
import Home from "./Paginas/Home";
import Contact from "./Paginas/Contacto";
import Servicios from "./Paginas/Servicios";

export default function App() {
  return (
    <HashRouter>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/servicios" element={<Servicios />} /> 
        </Routes>
      </main>
    </HashRouter>
  );
}
