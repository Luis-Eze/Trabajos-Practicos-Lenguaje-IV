import servicios from "../data/servicios";

export default function Servicios() {
  const base = process.env.PUBLIC_URL; 

    return (
    <>
        <h1>Servicios</h1>
        <p>Elegí la opción que mejor se adapte a tu estadía.</p>

        <section className="services-grid">
            {servicios.map((s) => (
            <article key={s.id} className="service-card">
                <img
                    src={`${base}/servicios/${s.imagen}`}
                    alt={s.titulo}
                    className="service-img"
                />
                <div className="service-body">
                <h3 className="service-title">{s.titulo}</h3>
                <ul className="service-meta">
                    <li><strong>Camas:</strong> {s.camas}</li>
                    <li><strong>Capacidad:</strong> {s.capacidad} huésped(es)</li>
                    <li><strong>Precio:</strong> ${s.precio.toLocaleString("es-AR")}</li>
                </ul>
                {s.amenities?.length > 0 && (
                    <div className="service-amenities">
                    {s.amenities.map((a, i) => <span key={i} className="chip">{a}</span>)}
                    </div>
                )}
                </div>
            </article>
            ))}
        </section>
        </>
    );
}
