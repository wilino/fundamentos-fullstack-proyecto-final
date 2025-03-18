import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField, Paper, Box, Grid, Card, CardContent, CardActions, IconButton, CircularProgress } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5001/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const taskData = { title, description };

      if (editingTask) {
        await axios.put(`http://localhost:5001/api/tasks/${editingTask.id}`, taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5001/api/tasks", taskData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setTitle("");
      setDescription("");
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error al guardar tarea:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 4, marginTop: 5 }}>
          <Typography variant="h5" gutterBottom>
            📋 Gestor de Tareas
          </Typography>

          <Box mt={3}>
            <TextField
              fullWidth
              label="Título"
              margin="normal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              fullWidth
              label="Descripción"
              margin="normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              fullWidth
              onClick={handleAddOrUpdateTask}
              sx={{ mt: 2 }}
            >
              {editingTask ? "Actualizar Tarea" : "Agregar Tarea"}
            </Button>
          </Box>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" mt={3}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3} mt={3}>
            {tasks.map((task) => (
              <Grid item xs={12} sm={6} md={4} key={task.id}>
                <Card elevation={3} sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6">{task.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {task.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton color="primary" onClick={() => { setTitle(task.title); setDescription(task.description); setEditingTask(task); }}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDeleteTask(task.id)}>
                      <Delete />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default TaskDashboard;

