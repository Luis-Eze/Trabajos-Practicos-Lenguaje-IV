import { useEffect, useState, useMemo } from "react";

const ALLOWED = ["oficial", "blue", "cripto", "tarjeta"];
const ORDER   = ["oficial", "blue", "cripto", "tarjeta"];
const keyOf = (x) => (x.nombre || x.casa || "").toLowerCase();

const iconFor = (item) => {
  const k = keyOf(item);
  const base = (process.env.PUBLIC_URL || "").replace(/\/$/, "");
  if (k.includes("oficial")) return `${base}/dolares/oficial.jpg`;
  if (k.includes("blue"))    return `${base}/dolares/blue.jpg`;
  if (k.includes("cripto"))  return `${base}/dolares/cripto.jpg`;
  if (k.includes("tarjeta")) return `${base}/dolares/tarjeta.jpg`;
  return `${base}/icons/default.png`;
};

export default function Api() {
  const [data, setData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: "" });

  const fetchData = async () => {
    try {
      setStatus({ loading: true, error: "" });
      const res = await fetch("https://dolarapi.com/v1/dolares", { cache: "no-store" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
      setStatus({ loading: false, error: "" });
    } catch (e) {
      setStatus({ loading: false, error: "No se pudieron cargar las cotizaciones." });
      console.error(e);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredSorted = useMemo(() => {
    const filtered = data.filter((it) => ALLOWED.some(k => keyOf(it).includes(k)));
    return filtered.sort((a, b) => {
      const ai = ORDER.findIndex(k => keyOf(a).includes(k));
      const bi = ORDER.findIndex(k => keyOf(b).includes(k));
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [data]);

  if (status.loading) return <p>Cargando cotizaciones…</p>;
  if (status.error)   return <p className="field-error">{status.error}</p>;


  return (
    <>
      <h1>Cotizaciones</h1>
      <p>Cotizaciones del dólar en Argentina (Fuente: DolarApi.com)</p>
        <div className="api-actions">
            <button className="btn" onClick={fetchData}>Actualizar</button>
        </div>
      <section className="services-grid">
        {filteredSorted.map((item) => {
          const titulo = item.nombre || item.casa || "Cotización";
          const fecha  = item.fechaActualizacion || item.fecha || "";
          return (
            <article key={titulo} className="service-card">
              <img src={iconFor(item)} alt={titulo} className="service-img" />
              <div className="service-body">
                <h3 className="service-title">{titulo}</h3>
                <ul className="service-meta">
                  <li><strong>Compra:</strong> {item.compra?.toLocaleString("es-AR")}</li>
                  <li><strong>Venta:</strong> {item.venta?.toLocaleString("es-AR")}</li>
                  <li><strong>Moneda:</strong> {item.moneda || "USD"}</li>
                  <li><strong>Actualizado:</strong> {fecha ? new Date(fecha).toLocaleString("es-AR") : "—"}</li>
                </ul>
              </div>
            </article>
          );
        })}
      </section>
    </>
  );
}
