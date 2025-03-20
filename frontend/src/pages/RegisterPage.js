import { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth"; // 🔥 Importar la función de autenticación

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const result = await register(name, email, password);
    if (result.success) {
      navigate("/"); // ✅ Redirigir al login tras el registro exitoso
    } else {
      setError(result.message); // ❌ Mostrar error si ocurre un problema
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
        <Typography variant="h5" gutterBottom>
          Registrarse
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          fullWidth
          label="Nombre"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
            Registrarse
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegisterPage;