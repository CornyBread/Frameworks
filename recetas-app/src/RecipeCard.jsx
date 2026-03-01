import React from 'react';
import './RecipeCard.css';

export default function RecipeCard({ recipe, variant = '1', onClick }) {
  // Construimos el nombre de la clase dinámicamente según la variante elegida
  const cardClass = `recipe-card variant-${variant}`;

  return (
    <div className={cardClass} onClick={() => onClick(recipe)}>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      
      <div className="content">
        <h3 className="text-ellipsis" style={{ margin: '0 0 0.5rem 0' }}>
          {recipe.title}
        </h3>
        
        <div className="details">
          <p className="text-clamp" style={{ fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
            <strong>Ingredientes:</strong> {recipe.ingredients.map(ing => `${ing.quantity} ${ing.name}`).join(', ')}
          </p>
          <p style={{ fontSize: '0.85rem', color: '#555', margin: 0 }}>
            Pasos a seguir: {recipe.steps.length} | 💬 {recipe.comments ? 'Con notas' : 'Sin notas'}
          </p>
        </div>
      </div>
    </div>
  );
}