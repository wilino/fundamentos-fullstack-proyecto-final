# 📌 Fundamentos Full Stack - Proyecto Final

Este es el proyecto final del curso de fundamentos Full Stack, donde se desarrolla una **aplicación web de gestión de tareas** utilizando tecnologías modernas en frontend, backend y base de datos. El objetivo es implementar un sistema funcional que permita a los usuarios registrar, administrar y organizar sus tareas de manera eficiente.

## 🚀 Tecnologías Utilizadas

### **Frontend**
- ⚛️ **React.js** - Creación de la interfaz de usuario.
- 🌐 **React Router** - Manejo de rutas y navegación.
- 🎨 **TailwindCSS / Styled Components** - Estilos y diseño responsivo.
- 🔄 **Axios** - Consumo de la API.

### **Backend**
- 🟢 **Node.js** + **Express.js** - API REST para la gestión de usuarios y tareas.
- 🔐 **JWT y bcrypt.js** - Seguridad y autenticación.
- 🛠️ **Express Validator** - Validación de datos.
- 🔄 **CORS** - Permitir la comunicación con el frontend.

### **Base de Datos**
- 🐘 **PostgreSQL** + **Sequelize ORM** - Gestión de datos y relaciones.

### **Despliegue**
- 🌍 **Frontend** en **Vercel**.
- ☁️ **Backend** en **Render**.
- 🗄️ **Base de Datos** en **Render (PostgreSQL)**.

## 📋 Funcionalidades
- 🔑 **Autenticación y Registro** (JWT y bcrypt.js).
- 📝 **CRUD de Tareas** (Crear, Leer, Actualizar y Eliminar).
- 📌 **Filtrado y Búsqueda** por estado y fecha.
- 👤 **Protección de rutas privadas**.
- 🔗 **Conexión con PostgreSQL mediante Sequelize ORM**.
- 🎯 **Validaciones y seguridad**.

## 🔧 Instalación y Configuración
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/fundamentos-fullstack-proyecto-final.git
   cd fundamentos-fullstack-proyecto-final
   ```

2. **Backend**:
   - Ir a la carpeta `backend` y ejecutar:
     ```bash
     npm install
     npm run dev
     ```
   - Configurar las variables de entorno en un archivo `.env`:
     ```env
     DB_URL=tu_url_de_base_de_datos
     JWT_SECRET=tu_secreto
     ```

3. **Frontend**:
   - Ir a la carpeta `frontend` y ejecutar:
     ```bash
     npm install
     npm start
     ```
   - Configurar las variables de entorno en `.env`:
     ```env
     REACT_APP_API_URL=http://localhost:5000/api
     ```

## 🛠 Endpoints Principales
| Método | Endpoint                 | Descripción                          |
|--------|--------------------------|--------------------------------------|
| POST   | `/api/auth/register`      | Registro de usuario                 |
| POST   | `/api/auth/login`         | Inicio de sesión y obtención de JWT |
| GET    | `/api/tasks`              | Obtener todas las tareas del usuario |
| POST   | `/api/tasks`              | Crear una nueva tarea               |
| PUT    | `/api/tasks/:id`          | Editar una tarea                    |
| DELETE | `/api/tasks/:id`          | Eliminar una tarea                  |


