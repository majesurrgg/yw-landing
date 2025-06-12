import { Link } from "react-router-dom";
export default function Footer() {
    return (
        <footer style={{backgroundColor: "#FF3828"}} className="text-white">
            <div className="max-w-7xl mx-auto py-8 px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center space-x-3 mb-4">
                                <img src="/assets/logo.svg" alt="Yachay Wasi Logo" className="h-15 w-auto" />
                                <span className="text-lg font-semibold">Yachay Wasi</span>
                            </div>
                            <p className="text-sm text-white/80">
                                Organización dedicada a promover el voluntariado y apoyar a comunidades necesitadas a través de diversos programas educativos y sociales.
                            </p>
                        </div>
                    </Link>
                    {/* Enlaces rápidos */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Enlaces rápidos</h4>
                        <ul className="space-y-2">
                            <li><a href="/" className="text-white/80 hover:text-white">Inicio</a></li>
                            <li><a href="/about" className="text-white/80 hover:text-white">Nosotros</a></li>
                            <li><a href="/volunteering" className="text-white/80 hover:text-white">Voluntariado</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white">Donar</a></li>
                        </ul>
                    </div>

                    {/* Programas */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Programas</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-white/80 hover:text-white">Arte & Cultura</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white">Asesoría a Colegios</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white">Bienestar Psicológico</a></li>
                            <li><a href="#" className="text-white/80 hover:text-white">Todos los programas</a></li>
                        </ul>
                    </div>

                    {/* Contacto */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contacto</h4>
                        <ul className="space-y-2">
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-white/80">Lima, Perú</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-white/80">contacto@yachaywasi.org</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span className="text-white/80">+51 123 456 789</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Redes sociales y copyright */}
                <div className="mt-8 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="#" className="text-white hover:text-yellow-200">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>)
}