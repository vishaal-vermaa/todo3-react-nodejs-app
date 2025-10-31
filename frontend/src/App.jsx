// src/App.jsx
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import useTodos from "./hooks/useTodos";

export default function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();

  return (
    <div className="App">
      <h2 className="App-title">Todo App</h2>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      <hr />
      <p className="footer">Made with ❤️ by Dev and DevOps.</p>
    </div>
  );
}
