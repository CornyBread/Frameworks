import React, { useState } from 'react';
import SkillsChart from './SkillsChart';

const CustomTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabsData = [
    {
      title: "Sobre Mí",
      content: (
        <div style={{ textAlign: 'center' }}>
        
          <h3>Desarrollador e Investigador</h3>
          <p>
            Hola! mi nombre es David Esber, soy un estudiante de Ingenieria de Computacion apasionado por el desarrollo de software y la investigación tecnológica. 
            Me dedico a crear aplicaciones eficientes y escalables, siempre buscando aprender e implementar las mejores prácticas de la industria.
          </p>
        </div>
      )
    },
    {
      title: "Tecnologías",
      content: (
        <div>
          <h3>Stack Principal</h3>
          <ul className="skills-list" style={{ justifyContent: 'center' }}>
            <li>React</li>
            <li>Rust</li>
            <li>Angular</li>
            <li>Python</li>
            <li>C#</li>
            <li>C++</li>
            <li>SQL</li>
            <li>NoSQL</li>
            <li>Docker</li>
            <li>JavaScript / TypeScript</li>
            <li>Linux</li>
            <li>Git</li>
            
          </ul>
        </div>
      )
    },
    {
      title: "Intereses",
      content: (
        <div>
          <h3>Áreas de Especialización</h3>
          <ul className="skills-list" style={{ justifyContent: 'center' }}>
            <li>Ciberseguridad</li>
            <li>Análisis de Redes</li>
            <li>Simulación de Hardware / IoT</li>
            <li>Arquitectura de Software</li>
          </ul>
        </div>
      )
    },

    {
      title: "Habilidades",
      content: (
        <div style={{ textAlign: 'center' }}>
          <h3>Dominio de Competencias</h3>
        
          <SkillsChart />
        </div>
      )
    }
  ];

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabsData.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabsData[activeTab].content}
      </div>
    </div>
  );
};

export default CustomTabs;