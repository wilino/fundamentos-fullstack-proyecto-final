import axios from "axios";

// Definir la URL base de la API usando una variable de entorno
const API_URL = process.env.REACT_APP_API_URL+'/api/tasks'  || "http://localhost:5001/api/tasks";

// Obtener el token almacenado
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Obtener todas las tareas
export const fetchTasks = async () => {
  try {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    return [];
  }
};

// Crear una nueva tarea
export const createTask = async (title, description) => {
  try {
    await axios.post(API_URL, { title, description }, getAuthHeaders());
    return true;
  } catch (error) {
    console.error("Error al crear tarea:", error);
    return false;
  }
};

// Actualizar una tarea existente
export const updateTask = async (id, title, description) => {
  try {
    await axios.put(`${API_URL}/${id}`, { title, description }, getAuthHeaders());
    return true;
  } catch (error) {
    console.error("Error al actualizar tarea:", error);
    return false;
  }
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return true;
  } catch (error) {
    console.error("Error al eliminar tarea:", error);
    return false;
  }
};