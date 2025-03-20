import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth"; // 🔥 Importar la función de autenticación

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const result = await login(email, password);
    if (result.success) {
      navigate("/dashboard"); // 🔄 Redirigir al dashboard si el login es exitoso
    } else {
      setError(result.message); // ❌ Mostrar error si las credenciales son incorrectas
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Iniciar Sesión
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          label="Email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Box mt={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </Box>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            ¿No tienes cuenta?{" "}
            <Button color="secondary" onClick={() => navigate("/register")}>
              Regístrate aquí
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;