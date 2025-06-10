import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'

// diseños generales 
export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}