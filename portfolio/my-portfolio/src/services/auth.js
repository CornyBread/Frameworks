// src/services/auth.js

// Simulamos una petición a un servidor con un pequeño retraso
export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Buscamos usuarios guardados previamente en el registro
      const users = JSON.parse(localStorage.getItem('portfolio_users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        // Generamos un token falso y lo guardamos
        const token = "mock-jwt-token-" + Date.now();
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email }));
        
        resolve({ success: true, user });
      } else {
        reject(new Error('Correo o contraseña incorrectos'));
      }
    }, 800); // 800ms de retraso para simular la red
  });
};

export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

// Añadir al final de src/services/auth.js

export const registerUser = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('portfolio_users')) || [];
      
      // Verificar si el correo ya existe
      if (users.find(u => u.email === email)) {
        reject(new Error('Este correo ya está registrado'));
        return;
      }

      // Guardar nuevo usuario
      const newUser = { name, email, password };
      users.push(newUser);
      localStorage.setItem('portfolio_users', JSON.stringify(users));
      
      resolve({ success: true });
    }, 800);
  });
};