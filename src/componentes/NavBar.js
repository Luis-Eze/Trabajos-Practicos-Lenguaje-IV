import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="navbar">
      <nav className="nav">
        <div className="nav-brand">Orellana Luis</div>
        <ul className="nav-list">
          <li>
            <NavLink to="/" end className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/contacto" className={({isActive}) => isActive ? "nav-link active" : "nav-link"}>
              Contacto
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
