// routes/todoRoutes.js
import express from "express";
import {
  getTodos,
  addTodo,
  toggleTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", addTodo);
router.patch("/toggle/:id", toggleTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;



// | Method | Endpoint                | Description     |
// | ------ | ----------------------- | --------------- |
// | GET    | `/api/todos`            | Get all todos   |
// | POST   | `/api/todos`            | Add new todo    |
// | PATCH  | `/api/todos/toggle/:id` | Toggle complete |
// | PUT    | `/api/todos/:id`        | Edit todo text  |
// | DELETE | `/api/todos/:id`        | Delete todo     |
