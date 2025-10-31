// src/components/TodoList.jsx
import TodoItem from "./TodoItem";

export default function TodoList({ todos, toggleTodo, deleteTodo, editTodo }) {
  if (todos.length === 0) return <p>No todos yet!</p>;

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />
      ))}
    </ul>
  );
}
