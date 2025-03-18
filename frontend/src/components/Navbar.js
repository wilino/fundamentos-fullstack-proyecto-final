import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = ({ onLogout }) => {

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Gestor de Tareas</Typography>
        <Button color="inherit" onClick={onLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;