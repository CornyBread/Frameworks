import React from 'react';

const SkillsChart = () => {
  // Datos basados en tus áreas de estudio y desarrollo
  const skills = [
    { name: 'Frontend (React/Angular)', value: 90 },
    { name: 'Backend (Python/C++)', value: 85 },
    { name: 'Ciberseguridad', value: 80 },
    { name: 'Redes e IoT', value: 75 },
    { name: 'Bases de Datos', value: 70 },
  ];

  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const totalPoints = skills.length;

  // Función para calcular las coordenadas (X, Y)
  const getCoordinates = (index, value) => {
    const angle = (Math.PI * 2 * index) / totalPoints - Math.PI / 2;
    const r = (radius * value) / 100;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Dibujamos el polígono de fondo (las guías)
  const backgroundCircles = [25, 50, 75, 100].map((level) => {
    return skills.map((_, i) => {
      const p = getCoordinates(i, level);
      return `${p.x},${p.y}`;
    }).join(' ');
  });

  // Generamos el polígono de tus habilidades reales
  const skillsPolygon = skills.map((s, i) => {
    const p = getCoordinates(i, s.value);
    return `${p.x},${p.y}`;
  }).join(' ');

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ overflow: 'visible' }}>
        {/* Dibujar hexágonos de fondo */}
        {backgroundCircles.map((points, i) => (
          <polygon key={i} points={points} fill="none" stroke="#334155" strokeWidth="1" />
        ))}
        
        {/* Dibujar ejes */}
        {skills.map((_, i) => {
          const p = getCoordinates(i, 100);
          return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#334155" />;
        })}

        {/* El polígono de datos (Habilidades) */}
        <polygon 
          points={skillsPolygon} 
          fill="rgba(14, 165, 233, 0.4)" 
          stroke="var(--accent-color)" 
          strokeWidth="2" 
        />

        {/* Etiquetas de las habilidades */}
        {skills.map((s, i) => {
          const p = getCoordinates(i, 115); // Un poco más afuera del radio
          return (
            <text 
              key={i} 
              x={p.x} 
              y={p.y} 
              fill="var(--text-secondary)" 
              fontSize="12" 
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {s.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default SkillsChart;