import { ToastContainer } from 'react-toastify';
import AppRoutes from './router/index'
import { useState, useEffect } from 'react';

export default function App(){
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  if (loading) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        flexDirection: 'column',
      }}>
        <div className="preloader-logo-container">
          <img src="/assets/images/logo_color.png" alt="Logo Yachay Wasi" style={{ width: 120, height: 120, objectFit: 'contain', filter: 'drop-shadow(0 0 32px #fff8)'}} />
        </div>
        <div className="preloader-spinner"></div>
      </div>
    );
  }
  return(
    <>
    <AppRoutes/>
    <ToastContainer />
    </>
  )
}