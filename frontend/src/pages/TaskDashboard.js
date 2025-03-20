import { useState, useEffect } from "react";
import { Container, Typography, Button, TextField, Paper, Box, Grid, Card, CardContent, CardActions, IconButton, CircularProgress } from "@mui/material";
import { Add, Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/taskService"; // 🔥 Importar las funciones del servicio

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    const tasksData = await fetchTasks();
    setTasks(tasksData);
    setLoading(false);
  };

  const handleAddOrUpdateTask = async () => {
    let success = false;

    if (editingTask) {
      success = await updateTask(editingTask.id, title, description);
    } else {
      success = await createTask(title, description);
    }

    if (success) {
      setTitle("");
      setDescription("");
      setEditingTask(null);
      loadTasks();
    }
  };

  const handleDeleteTask = async (id) => {
    const success = await deleteTask(id);
    if (success) {
      loadTasks();
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