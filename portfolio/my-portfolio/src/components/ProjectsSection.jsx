import React, { useState } from 'react';
import ProjectCarousel from './ProjectCarousel';

const ProjectsSection = () => {
  // Estado para saber qué tarjeta está expandida (Accordion)
  const [expandedId, setExpandedId] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Gestor de Recetas Dinámico (React)",
      description: "Aplicación SPA que implementa un sistema CRUD completo para la gestión de recetas. El proyecto destaca por contar con 4 versiones diferentes de la interfaz, adaptando componentes UI interactivos y gestión de estado avanzada en React.",
      github: "https://github.com/tu-usuario/recetas-react",
      images: [
        "https://picsum.photos/seed/recetas1/800/400",
        "https://picsum.photos/seed/recetas2/800/400"
      ]
    },
    {
      id: 2,
      title: "Visualizador del Tiempo Multiformato (Angular)",
      description: "Plataforma desarrollada en Angular que ofrece más de 10 formas distintas de visualizar el tiempo de manera interactiva. Incluye una arquitectura robusta con un sistema de autenticación personalizado gestionado a través de auth.ts.",
      github: "https://github.com/tu-usuario/visualizador-tiempo",
      images: [
        "https://picsum.photos/seed/tiempo1/800/400",
        "https://picsum.photos/seed/tiempo2/800/400"
      ]
    },
    {
      id: 3,
      title: "Sniffer as a Service & Análisis de Seguridad",
      description: "Proyecto de investigación y desarrollo universitario orientado a redes y ciberseguridad. Implementa la arquitectura de un sniffer de red monitorizado y análisis de vulnerabilidades específicas como ataques de spear phishing.",
      github: "https://github.com/tu-usuario/sniffer-redes",
      images: [
        "https://picsum.photos/seed/ciber1/800/400",
        "https://picsum.photos/seed/ciber2/800/400"
      ]
    },
    {
      id: 4,
      title: "Simulación IoT ESP32 & Análisis de Circuitos",
      description: "Desarrollo y validación de hardware mediante simuladores como Wokwi y Proteus. El proyecto principal controla un servomotor con un potenciómetro, interactúa con un sensor de temperatura y una LCD. Incluye cálculo de polarización y validación de resistencias exactas (ej. r3 configurada a 100 ohmios).",
      github: "https://github.com/tu-usuario/iot-esp32-wokwi",
      images: [
        "https://picsum.photos/seed/iot1/800/400",
        "https://picsum.photos/seed/iot2/800/400"
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