import axios from "axios";

// Definir la URL base de la API usando una variable de entorno
const API_URL = process.env.REACT_APP_API_URL ? `${process.env.REACT_APP_API_URL}/api/auth` : "http://localhost:5001/api/auth";

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      return { success: true, token: response.data.token };
    } else {
      return { success: false, message: "Error: Respuesta sin token." };
    }
  } catch (error) {
    console.error("Error en login:", error.response ? error.response.data : error.message);
    return { success: false, message: error.response?.data?.error || "Credenciales incorrectas. Intenta nuevamente." };
  }
};

// Función para registrarse
export const register = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });

    if (response.status === 201 || response.status === 200) {
      return { success: true, message: "Registro exitoso. Ahora inicia sesión." };
    } else {
      return { success: false, message: "Error desconocido en el registro." };
    }
  } catch (error) {
    console.error("Error en register:", error.response ? error.response.data : error.message);
    return { success: false, message: error.response?.data?.error || "Error al registrarse." };
  }
};

// Función para cerrar sesión
export const logout = () => {
  localStorage.removeItem("token");
};