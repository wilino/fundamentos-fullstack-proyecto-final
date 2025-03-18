const express = require("express");
const { Task } = require("../models");
const { authMiddleware } = require("../middlewares/auth");

const router = express.Router();

// Crear tarea
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      userId: req.user.id,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todas las tareas del usuario autenticado
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id } });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener una tarea específica
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar tarea
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar tarea
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!task) return res.status(404).json({ error: "Tarea no encontrada" });

    await task.destroy();
    res.json({ message: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;