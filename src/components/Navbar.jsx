import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <header className="bg-red-500 text-white">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <img src="/assets/logo.svg" alt="Yachay Wasi Logo" className="h-15 w-auto"/>
                    <span className="text-lg font-semibold">Yachay Wasi</span>
                </Link>

                {/* Menú */}
                <ul className="hidden md:flex items-center space-x-8 font-medium">
                    <li>
                        <Link to="/" className="hover:text-blue-600">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/nosotros" className="hover:text-blue-600">Nosotros</Link>
                    </li>
                    <li>
                        <Link to="/voluntariado" className="hover:text-blue-600">Voluntariado</Link>
                    </li>
                    <li>
                        <a
                            href="#donar"
                            className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-blue-600 font-semibold transition"
                        >
                            Donar
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
