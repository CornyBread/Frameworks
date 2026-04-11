import React, { useState } from 'react';
import ProjectCarousel from './ProjectCarousel';

import momodora1 from '../assets/momodora1.jpg';
import momodora2 from '../assets/momodora2.jpg';
import judicial1 from '../assets/jjk1.jpg';
import judicial2 from '../assets/jjk2.png';
import time1 from '../assets/time1.png';
import time2 from '../assets/time2.png';  
import time3 from '../assets/time3.png';
import n from '../assets/n.png';

const ProjectsSection = () => {
  // Estado para saber qué tarjeta está expandida (Accordion)
  const [expandedId, setExpandedId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "aCHADemia: Desarrollo de un Sistema Educativo",
      description: "Aplicación SPA que implementa un sistema CRUD completo para la gestión de recetas. El proyecto destaca por contar con 4 versiones diferentes de la interfaz, adaptando componentes UI interactivos y gestión de estado avanzada en React.",
      github: "https://github.com/Kaucrow/aCHADemia",
      images: [
        n,
        n
      ]
    },
    {
      id: 2,
      title: "MomodoraPlatTest: Desarrollo de Juego utilizando canvas",
      description: "Plataforma desarrollada en Angular que ofrece más de 10 formas distintas de visualizar el tiempo de manera interactiva. Incluye una arquitectura robusta con un sistema de autenticación personalizado gestionado a través de auth.ts.",
      github: "https://github.com/CornyBread/MomodoraPlatTest",
      images: [
        momodora1,
        momodora2
      ]
    },
    {
      id: 3,
      title: "Judicial-Jury-Keys: Simulacion de protocolo HTTPS para envio de información",
      description: "Proyecto de investigación y desarrollo universitario orientado a redes y ciberseguridad. Implementa la arquitectura de un sniffer de red monitorizado y análisis de vulnerabilidades específicas como ataques de spear phishing.",
      github: "https://github.com/Kaucrow/judicial-jury-keys",
      images: [
        judicial1,
        judicial2
      ]
    },
    {
      id: 4,
      title: "time-visualizer: Desarrollo de multiples visualizadores de Tiempo",
      description: "Desarrollo y validación de hardware mediante simuladores como Wokwi y Proteus. El proyecto principal controla un servomotor con un potenciómetro, interactúa con un sensor de temperatura y una LCD. Incluye cálculo de polarización y validación de resistencias exactas (ej. r3 configurada a 100 ohmios).",
      github: "https://github.com/CornyBread/Frameworks/tree/main/time-visualizer",
      images: [
        time1,
        time2,
        time3
      ]
    }
  ];

  const toggleAccordion = (id) => {
    // Si haces clic en el que ya está abierto, se cierra. Si no, abre el nuevo.
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="projects-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        Proyectos Destacados
      </h2>
      
      {projects.map((project) => (
        <div key={project.id} className={`project-card ${expandedId === project.id ? 'expanded' : ''}`}>
          
          {/* Cabecera de la tarjeta (Siempre visible) */}
          <div className="project-header" onClick={() => toggleAccordion(project.id)}>
            <h3 className="project-title">{project.title}</h3>
            <span className="expand-icon">+</span>
          </div>

          {/* Cuerpo de la tarjeta (Se expande como Accordion) */}
          {expandedId === project.id && (
            <div className="project-body">
              <ProjectCarousel images={project.images} />
              <p className="project-desc">{project.description}</p>
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className="github-btn"
              >
                Ver Código en GitHub
              </a>
            </div>
          )}
          
        </div>
      ))}
    </div>
  );
};

export default ProjectsSection;