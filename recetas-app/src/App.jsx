import React, { useState } from 'react';
import Login from './Login';
import RecipeCard from './RecipeCard';
import RecipeModal from './RecipeModal';
import RecipeForm from './RecipeForm'; // <-- Importamos el formulario

// Receta inicial de prueba
const initialRecipes = [
  {
    id: 1,
    title: "Pizza Margarita Clásica Italiana con Albahaca",
    image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80",
    variant: '1', 
    ingredients: [
      { name: "Harina de trigo", quantity: "500g" },
      { name: "Agua tibia", quantity: "300ml" },
      { name: "Salsa de tomate casera", quantity: "200ml" },
      { name: "Queso Mozzarella", quantity: "250g" }
    ],
    steps: [
      "Mezclar la harina con el agua.",
      "Amasar por 10 minutos.",
      "Dejar reposar la masa.",
      "Agregar salsa y queso, y hornear a 250°C."
    ],
    comments: "Asegúrate de que el horno esté bien precalentado."
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Para el Modal (Ver)
  const [editingRecipe, setEditingRecipe] = useState(null);   // Para el Formulario (Editar)
  const [showForm, setShowForm] = useState(false);            // Mostrar/Ocultar Formulario

  // Funciones de Autenticación
  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);

  // --- FUNCIONES DEL CRUD ---

  // CREATE / UPDATE
  const handleSaveRecipe = (recipeData) => {
    if (editingRecipe) {
      // Si estábamos editando, actualizamos la receta existente
      setRecipes(recipes.map(r => r.id === recipeData.id ? recipeData : r));
    } else {
      // Si es nueva, la agregamos a la lista
      setRecipes([...recipes, recipeData]);
    }
    setShowForm(false);
    setEditingRecipe(null);
  };

  // DELETE
  const handleDeleteRecipe = (id) => {
    if (window.confirm('¿Estás seguro de que deseas borrar esta receta?')) {
      setRecipes(recipes.filter(r => r.id !== id));
    }
  };

  // Preparar edición
  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(true);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <Login onLoginSuccess={handleLogin} />
      ) : (
        <div>
          <header style={styles.header}>
            <h1 style={{ margin: 0 }}>Mis Recetas</h1>
            <div>
              {/* Botón para crear nueva receta */}
              {!showForm && (
                <button onClick={() => setShowForm(true)} style={styles.newButton}>+ Nueva Receta</button>
              )}
              <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
            </div>
          </header>
          
          <main style={styles.main}>
            {/* Si showForm es true, mostramos el formulario. Si no, mostramos la lista */}
            {showForm ? (
              <RecipeForm 
                initialData={editingRecipe} 
                onSave={handleSaveRecipe} 
                onCancel={() => { setShowForm(false); setEditingRecipe(null); }} 
              />
            ) : (
              <div style={styles.grid}>
                {recipes.length === 0 ? (
                  <p>No hay recetas. ¡Anímate a crear una!</p>
                ) : (
                  recipes.map(receta => (
                    <div key={receta.id} style={styles.cardWrapper}>
                      {/* Usamos la Variante 4 para mostrar en el panel principal */}
                      <RecipeCard recipe={receta} variant={receta.variant || "1"} onClick={() => setSelectedRecipe(receta)} />
                      
                      {/* Botones de Editar y Borrar debajo de cada tarjeta */}
                      <div style={styles.actionButtons}>
                        <button onClick={() => handleEditClick(receta)} style={styles.editBtn}>Editar</button>
                        <button onClick={() => handleDeleteRecipe(receta.id)} style={styles.deleteBtn}>Borrar</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </main>
          
          <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
        </div>
      )}
    </div>
  );
}

// Estilos
const styles = {
  header: { padding: '1rem 2rem', background: '#2c3e50', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  logoutButton: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '10px' },
  newButton: { padding: '0.5rem 1rem', cursor: 'pointer', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold' },
  main: { padding: '2rem', backgroundColor: '#ecf0f1', minHeight: '100vh' },
  grid: { display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' },
  cardWrapper: { display: 'flex', flexDirection: 'column', gap: '10px' },
  actionButtons: { display: 'flex', justifyContent: 'space-between' },
  editBtn: { padding: '8px', backgroundColor: '#f39c12', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1, marginRight: '5px' },
  deleteBtn: { padding: '8px', backgroundColor: '#c0392b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', flex: 1, marginLeft: '5px' }
};