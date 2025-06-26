
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarAlt,
  faUsers,
  faHeart,
  faMapMarkerAlt,
  faClock
} from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import treeAnimation from '../assets/animations/animacion-arbol.json';
import '../styles/Home.css'


const collageData = [
  { image: '/assets/images/header/1.png', text: 'Transformando vidas a través de la educación' },
  { image: '/assets/images/header/2.png', text: 'Construyendo un futuro mejor' },
  { image: '/assets/images/header/3.png', text: 'Aprendizaje colaborativo' },
  { image: '/assets/images/header/4.png', text: 'Desarrollo integral' },
  { image: '/assets/images/header/5.png', text: 'Educación de calidad' },
  { image: '/assets/images/header/6.png', text: 'Formación continua' },
  { image: '/assets/images/header/7.png', text: 'Impacto social' },
  { image: '/assets/images/header/8.png', text: 'Comunidad educativa' },
  { image: '/assets/images/header/9.png', text: 'Innovación educativa' },
  { image: '/assets/images/header/10.png', text: 'Compromiso social' },
  { image: '/assets/images/header/11.png', text: 'Educación rural' },
  { image: '/assets/images/header/12.png', text: 'Apoyo estudiantil' },
  { image: '/assets/images/header/13.png', text: 'Desarrollo comunitario' },
  { image: '/assets/images/header/14.png', text: 'Voluntariado educativo' },
  { image: '/assets/images/header/15.png', text: 'Inclusión educativa' },
  { image: '/assets/images/header/16.png', text: 'Educación para todos' },
  { image: '/assets/images/header/17.png', text: 'Aprendizaje significativo' },
  { image: '/assets/images/header/18.png', text: 'Desarrollo sostenible' },
  { image: '/assets/images/header/19.png', text: 'Educación intercultural' },
  { image: '/assets/images/header/20.png', text: 'Tecnología educativa' },
  { image: '/assets/images/header/21.png', text: 'Mentoría estudiantil' },
  { image: '/assets/images/header/22.png', text: 'Desarrollo personal' },
  { image: '/assets/images/header/23.png', text: 'Educación transformadora' },
  { image: '/assets/images/header/24.png', text: 'Comunidades de aprendizaje' }
]

const Home = () => {
  const [shuffledData, setShuffledData] = useState([])
  const processRef = useRef(null)
  const achievementsRef = useRef(null)
  const testimonialsRef = useRef(null)
  const statsRef = useRef(null)
  const [counters, setCounters] = useState({
    seasons: 0,
    children: 0,
    volunteers: 0,
    regions: 0,
    hours: 0
  });

  useEffect(() => {
    // Función para mezclar el array usando el algoritmo Fisher-Yates
    const shuffleArray = (array) => {
      const newArray = [...array]
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
      }
      return newArray
    }

    // Mezclar las imágenes cada vez que el componente se monta
    setShuffledData(shuffleArray(collageData))
  }, [])

  useEffect(() => {
    // Configurar el Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Una vez que se ha animado, dejar de observar el elemento
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2, // Aumentamos el threshold para que la animación se active un poco más tarde
        rootMargin: '0px' // Asegura que la animación se active cuando el elemento es visible
      }
    );

    // Pequeño delay para asegurar que los elementos están en el DOM
    setTimeout(() => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []) // Este efecto se ejecuta una sola vez al montar el componente

  useEffect(() => {
    const handleScroll = () => {
      if (!processRef.current) return;

      const steps = processRef.current.querySelectorAll('.step');
      const containerRect = processRef.current.getBoundingClientRect();
      const containerCenter = window.innerHeight / 2;

      steps.forEach((step) => {
        const rect = step.getBoundingClientRect();
        const stepCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(containerCenter - stepCenter);

        if (distanceFromCenter < window.innerHeight / 3) {
          step.classList.add('active');
        } else {
          step.classList.remove('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-process');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    if (processRef.current) {
      observer.observe(processRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-achievements');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    if (achievementsRef.current) {
      observer.observe(achievementsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-testimonials');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    if (testimonialsRef.current) {
      observer.observe(testimonialsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Start counter animations
            const duration = 2000; // 2 seconds
            const steps = 60;
            const targetValues = {
              seasons: 7,
              children: 581,
              volunteers: 990,
              regions: 11,
              hours: 12695
            };

            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              setCounters(prev => ({
                seasons: Math.round((targetValues.seasons / steps) * currentStep),
                children: Math.round((targetValues.children / steps) * currentStep),
                volunteers: Math.round((targetValues.volunteers / steps) * currentStep),
                regions: Math.round((targetValues.regions / steps) * currentStep),
                hours: Math.round((targetValues.hours / steps) * currentStep)
              }));

              if (currentStep === steps) {
                clearInterval(interval);
                setCounters(targetValues);
              }
            }, duration / steps);

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2
      }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page home">
      <header className="header-collage">
        {shuffledData.map((item, index) => (
          <div key={item.image} className="collage-item">
            <div className="collage-inner">
              <div className="collage-front">
                <img src={item.image} alt={`Collage ${index + 1}`} />
              </div>
              <div className="collage-back">
                <p>{item.text}</p>
              </div>
            </div>
          </div>
        ))}
        <div className="logo-container">
          <img src="/assets/images/logo_color.png" alt="Yachay Wasi Logo" />
        </div>

      </header>

      <div className="collage-text-bottom">
        <div className="title-container">
          <h2 className="main-title">Transformando vidas a través de la educación</h2>
          <div className="title-decoration">
            <span className="line"></span>
            <span className="dot"></span>
            <span className="line"></span>
          </div>
          <p className="subtitle">Juntos construimos un futuro mejor para la niñez del Perú</p>
        </div>
      </div>

      <section className="stats-section" ref={statsRef}>
        <div className="wave-top">
          <img src="/assets/animations/wave-top.svg" alt="" />

        </div>
        <div className="stats-background">
          <img src="/assets/images/home/fondo-niños.png" alt="Fondo Niños" className="stats-bg-image" />
          <div className="stats-overlay"></div>
        </div>
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faCalendarAlt} />
            </div>
            <div className="stat-number">{counters.seasons}</div>
            <div className="stat-label">Temporadas<br />de clases</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>
            <div className="stat-number">{counters.children}</div>
            <div className="stat-label">Niñas, niños y<br />adolescentes</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <div className="stat-number">{counters.volunteers}</div>
            <div className="stat-label">Voluntarias y<br />voluntarios</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </div>
            <div className="stat-number">{counters.regions}</div>
            <div className="stat-label">Regiones del<br />Perú</div>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="stat-number">{counters.hours}</div>
            <div className="stat-label">Horas de<br />voluntariado</div>
          </div>
        </div>
        <div className="wave-bottom">
          <img src="/assets/animations/wave-bottom.svg" alt="" />
        </div>
      </section>

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



      <section className="achievements-section" ref={achievementsRef}>
        <h2 className="section-title">CONOCE SOBRE NUESTROS LOGROS COMO ORGANIZACIÓN</h2>
        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-image">
              <img src="/assets/images/home/upc.png" alt="Protagonistas del Cambio UPC 2024" />
            </div>
            <div className="achievement-content">
              <h3>Protagonistas del Cambio UPC 2024</h3>
              <p>Ganadores del reconocimiento que destaca a jóvenes líderes transformadores</p>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-image">
              <img src="/assets/images/home/bicentenario.jpg" alt="Bicentenario Haciendo Patria 2021" />
            </div>
            <div className="achievement-content">
              <h3>Bicentenario Haciendo Patria 2021</h3>
              <p>2do puesto en Iniciativas de Voluntariado en la categoría Igualdad de Oportunidades</p>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-image">
              <img src="/assets/images/home/universidad.png" alt="Colaboración Universitaria" />
            </div>
            <div className="achievement-content">
              <h3>Colaboración Universitaria</h3>
              <p>Alianzas estratégicas con diversas universidades para ampliar nuestro impacto</p>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-image">
              <img src="/assets/images/home/backus.png" alt="Fondo Concursable Backus" />
            </div>
            <div className="achievement-content">
              <h3>Fondo Concursable Backus 2021</h3>
              <p>Ganadores del Fondo Concursable de Backus-Perú voluntario</p>
            </div>
          </div>
        </div>
      </section>

      <section className="allies-section">
        <h2 className="section-title">Nuestros Aliados</h2>
        <div className="carousel-container">
          <div className="carousel-track">
            {/* First set of images */}
            <div className="carousel-item">
              <img src="/assets/images/home/ally-1.jfif" alt="Aliado 1" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-2.jfif" alt="Aliado 2" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-3.jfif" alt="Aliado 3" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-4.jfif" alt="Aliado 4" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-5.jfif" alt="Aliado 5" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-6.jfif" alt="Aliado 6" />
            </div>
            {/* Duplicate set for seamless loop */}
            <div className="carousel-item">
              <img src="/assets/images/home/ally-1.jfif" alt="Aliado 1" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-2.jfif" alt="Aliado 2" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-3.jfif" alt="Aliado 3" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-4.jfif" alt="Aliado 4" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-5.jfif" alt="Aliado 5" />
            </div>
            <div className="carousel-item">
              <img src="/assets/images/home/ally-6.jfif" alt="Aliado 6" />
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section" ref={testimonialsRef}>
        <h2 className="section-title">Nuestros Testimonios</h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/cZjcvYKFzBI"
                title="Testimonio 1"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="testimonial-content">
              <h3>Experiencias Transformadoras</h3>
              <p>Descubre el impacto de nuestro programa en la comunidad</p>
              <a
                href="https://www.youtube.com/watch?v=cZjcvYKFzBI"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-button"
              >
                <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="video-wrapper">
              <iframe
                src="https://www.youtube.com/embed/8SFsyt9sFRI?si=VX5yPfCBan8wuefv"
                title="Testimonio 2"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="testimonial-content">
              <h3>Historias de Éxito</h3>
              <p>Conoce cómo estamos cambiando vidas a través de la educación</p>
              <a
                href="https://www.youtube.com/watch?v=8SFsyt9sFRI"
                target="_blank"
                rel="noopener noreferrer"
                className="arrow-button"
              >
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home 