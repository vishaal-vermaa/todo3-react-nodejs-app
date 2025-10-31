// src/hooks/useTodos.js
import { useEffect, useState } from "react";

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const dbTodos = await fetch("http://localhost:5000/api/todos/")
        .then(res => res.json());
      setTodos(dbTodos);
    };
    fetchTodos();
  }, [todos.length]);

  const addTodo = (text) => {
    if (!text.trim()) return;

    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(newTodo => {
        console.log("Added todo:", newTodo);
        setTodos([newTodo, ...todos]);
      });
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  return { todos, addTodo, toggleTodo, deleteTodo, editTodo };
}
