import Footer from '../components/Footer';
import NavbarTailwind from '../components/Navbar-tailwind';
import { Outlet } from 'react-router-dom'

// diseños generales 
export default function MainLayout() {
  return (
    <>
      <NavbarTailwind />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}