import React, { useState } from 'react';

export default function RecipeForm({ initialData, onSave, onCancel }) {
  // Si nos pasan initialData, estamos editando. Si no, estamos creando desde cero.
  const [formData, setFormData] = useState(initialData || {
    title: '',
    image: '',
    comments: '',
    ingredients: [{ name: '', quantity: '' }],
    steps: [''],
    variant: '1' // <-- ¡Agregamos esto por defecto!
  });

  // Manejo de campos simples de texto
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- MANEJO DINÁMICO DE INGREDIENTES ---
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };
  const addIngredient = () => setFormData({ ...formData, ingredients: [...formData.ingredients, { name: '', quantity: '' }] });
  const removeIngredient = (index) => setFormData({ ...formData, ingredients: formData.ingredients.filter((_, i) => i !== index) });

  // --- MANEJO DINÁMICO DE PASOS ---
  const handleStepChange = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };
  const addStep = () => setFormData({ ...formData, steps: [...formData.steps, ''] });
  const removeStep = (index) => setFormData({ ...formData, steps: formData.steps.filter((_, i) => i !== index) });

  // Enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Le asignamos un ID temporal si es una receta nueva
    onSave({ ...formData, id: formData.id || Date.now() });
  };

  return (
    <div style={styles.container}>
      <h2>{initialData ? 'Editar Receta' : 'Crear Nueva Receta'}</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        
        {/* Campos Básicos */}
        <label>Título:</label>
        <input name="title" value={formData.title} onChange={handleChange} required style={styles.input} />

        <label>URL de la Imagen:</label>
        <input name="image" value={formData.image} onChange={handleChange} required style={styles.input} />

        {/* --- NUEVO CAMPO DE ESTILO --- */}
        <label>Estilo de Tarjeta visual:</label>
        <select name="variant" value={formData.variant} onChange={handleChange} style={styles.input}>
          <option value="1">Variante 1: Clásica Vertical</option>
          <option value="2">Variante 2: Lista Horizontal</option>
          <option value="3">Variante 3: Cuadrícula Minimalista</option>
          <option value="4">Variante 4: Tarjeta Detallada</option>
        </select>
        {/* ----------------------------- */}   

        {/* Sección de Ingredientes */}
        <div style={styles.section}>
          <h3>Ingredientes</h3>
          {formData.ingredients.map((ing, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <input placeholder="Cant. (ej. 200g)" value={ing.quantity} onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)} required style={styles.input} />
              <input placeholder="Nombre (ej. Harina)" value={ing.name} onChange={(e) => handleIngredientChange(index, 'name', e.target.value)} required style={{ ...styles.input, flex: 1 }} />
              {formData.ingredients.length > 1 && (
                <button type="button" onClick={() => removeIngredient(index)} style={styles.btnDanger}>X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient} style={styles.btnAdd}>+ Agregar Ingrediente</button>
        </div>

        {/* Sección de Pasos */}
        <div style={styles.section}>
          <h3>Pasos a seguir</h3>
          {formData.steps.map((step, index) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontWeight: 'bold', alignSelf: 'center' }}>{index + 1}.</span>
              <input placeholder="Describe este paso..." value={step} onChange={(e) => handleStepChange(index, e.target.value)} required style={{ ...styles.input, flex: 1 }} />
              {formData.steps.length > 1 && (
                <button type="button" onClick={() => removeStep(index)} style={styles.btnDanger}>X</button>
              )}
            </div>
          ))}
          <button type="button" onClick={addStep} style={styles.btnAdd}>+ Agregar Paso</button>
        </div>

        {/* Comentarios */}
        <label>Comentarios extra:</label>
        <textarea name="comments" value={formData.comments} onChange={handleChange} style={styles.input} rows="3" />

        {/* Botones de Acción */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={styles.btnSubmit}>Guardar Receta</button>
          <button type="button" onClick={onCancel} style={styles.btnCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

// Estilos en línea del formulario
const styles = {
  container: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', maxWidth: '600px', margin: '0 auto' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  section: { padding: '15px', border: '1px solid #eee', borderRadius: '8px', backgroundColor: '#fafafa' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
  btnAdd: { backgroundColor: '#2ecc71', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' },
  btnDanger: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' },
  btnSubmit: { backgroundColor: '#3498db', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', flex: 1, fontWeight: 'bold' },
  btnCancel: { backgroundColor: '#95a5a6', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }
};