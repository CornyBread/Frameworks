import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomTabs from './CustomTabs';
import ContactModal from './ContactModal';
import ProjectsSection from './ProjectsSection'; // Importamos la nueva sección
import '../portfolio.css';

const Portfolio = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div className="portfolio-container">
      <Navbar onOpenContact={() => setIsContactModalOpen(true)} />
      
      <main className="main-content">
        <section style={{ marginBottom: '4rem', marginTop: '2rem' }}>
          <CustomTabs />
        </section>

        {/* --- Renderizamos el Accordion de Proyectos --- */}
        <section style={{ padding: '2rem 0' }}>
          <ProjectsSection />
        </section>
      </main>

      <Footer />

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
};

export default Portfolio;