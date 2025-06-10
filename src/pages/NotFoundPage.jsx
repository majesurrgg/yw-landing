import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-cyan-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
        <p className="text-gray-600 mb-6">
          Lo sentimos, la página que buscas no existe o fue movida
        </p>
        <Link
          to="/"
          className="inline-block bg-cyan-600 text-white px-6 py-3 rounded-md hover:bg-cyan-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}