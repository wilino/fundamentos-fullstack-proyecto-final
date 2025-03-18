require("dotenv").config(); // Cargar variables de entorno

const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models"); // Importar correctamente Sequelize desde models
const authRoutes = require("./routes/auth.routes");
const taskRoutes = require("./routes/task.routes");

const app = express();

// Verificar que las variables de entorno estén cargadas
console.log("🔍 JWT_SECRET:", process.env.JWT_SECRET ? "Cargado ✅" : "No encontrado ❌");
console.log("🔍 DB_URL:", process.env.DB_URL ? "Cargado ✅" : "No encontrado ❌");

// Probar conexión con la base de datos
sequelize
  .authenticate()
  .then(() => console.log("✅ Conexión exitosa a PostgreSQL"))
  .catch((err) => console.error("❌ Error de conexión a PostgreSQL:", err));

// Middleware
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

