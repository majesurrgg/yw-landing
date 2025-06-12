import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="/assets/images/logo_navbar.png" alt="Yachay Wasi Logo" className="navbar-logo" />
        <Link to="/" className="logo">Yachay Wasi</Link>
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-link">Inicio</Link>
        {/* <Link to="/asesorias-colegios" className="nav-link">Asesorías a Colegios Nacionales</Link>
        <Link to="/arte-cultura" className="nav-link">Arte y Cultura</Link>
        <Link to="/bienestar" className="nav-link">Bienestar Psicológico</Link> */}
        <Link to="/volunteering" className="nav-link">Voluntariado</Link>

        <a
          href="/donaciones"
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-blue-600 font-semibold transition"
        >
          Donar
        </a>

      </div>
    </nav>
  )
}

export default Navbar 