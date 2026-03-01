import React from 'react';
import './RecipeModal.css';

export default function RecipeModal({ recipe, onClose }) {
  // Si no hay receta seleccionada, no renderizamos nada
  if (!recipe) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Evitamos que al hacer clic dentro de la caja blanca se cierre el modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        
        <h2>{recipe.title}</h2>
        <img src={recipe.image} alt={recipe.title} className="modal-image" />
        
        <div className="modal-section">
          <h3>Ingredientes</h3>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>
                <strong>{ing.quantity}</strong> de {ing.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-section">
          <h3>Pasos a seguir</h3>
          <ol>
            {recipe.steps.map((step, index) => (
              <li key={index} style={{ marginBottom: '0.5rem' }}>{step}</li>
            ))}
          </ol>
        </div>

        {recipe.comments && (
          <div className="modal-section" style={{ padding: '1rem', backgroundColor: '#fff3cd', borderRadius: '8px' }}>
            <strong> Notas / Comentarios:</strong>
            <p style={{ margin: '0.5rem 0 0 0' }}>{recipe.comments}</p>
          </div>
        )}
      </div>
    </div>
  );
}