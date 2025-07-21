import Lottie from 'lottie-react'
import treeAnimation from '../assets/animations/animacion-arbol.json';
import '../styles/Home.css'
import { useRef } from 'react';

const About = () => {
  const processRef = useRef(null);

  return (
    <div className='about'>
      <section className="hero-section">
        <div className="content-grid">
          <div className="video-container fade-in">
            <iframe
              src="https://www.youtube.com/embed/r77ZI7nSo54"
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="content-container fade-in">
            <h1>¿Quiénes somos?</h1>
            <p>Somos una asociación civil sin fines de lucro conformada por jóvenes de todo el país, comprometida por la educación y por reducir las brechas de desigualdad en el Perú.</p>

          </div>
        </div>
      </section>

      <section className="process-section" ref={processRef}>
        <div className="process-container">
          <div className="process-content">
            <div className="process-steps">
              <div className="step" data-step="01">
                <h3 className="step-title">MISIÓN</h3>
                <p>Conectados por una educación holística y descentralizada en el Perú</p>
              </div>
              <div className="step" data-step="02">
                <h3 className="step-title">IDENTIDAD</h3>
                <p>Yachay Wasi está representado por el árbol de la sabiduría que irá creciendo conforme se le va dando vida.</p>
              </div>
              <div className="step" data-step="03">
                <h3 className="step-title">NUESTROS VALORES</h3>
                <ul className="values-list">
                  <li>Comprometidos con la sociedad.</li>
                  <li>Empáticos y solidarios.</li>
                  <li>Co-creamos.</li>
                  <li>Somos Diversos.</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="process-image">
            <Lottie
              animationData={treeAnimation}
              loop={true}
              autoplay={true}
              className="tree-animation"
            />
          </div>
        </div>
      </section>
    </div>


  )
}
export default About