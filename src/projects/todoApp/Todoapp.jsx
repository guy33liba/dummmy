import React, { useState } from "react";
import "./Todoapp.css"; // Import CSS file

const TodoApp = () => {
 const [todos, setTodos] = useState([]);
 const [input, setInput] = useState("");
 const [editInput, setEditInput] = useState("");

 const handleAddTodo = () => {
  if (input.trim() === "") return;
  setTodos((prev) => [...prev, { task: input, id: todos.length + 1, edit: false }]);
  setInput(""); // Clear input field after adding
 };

 const handleDeleteTodos = (id) => {
  const filteredTodos = todos.filter((todo) => todo.id !== id);
  setTodos(filteredTodos);
 };

 const handleEditTodos = (id) => {
  setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, edit: true } : todo)));
 };

 const handleSaveEditTodo = (input, id) => {
  if (input.trim() === "") return;
  setTodos((prev) =>
   prev.map((todo) => (todo.id === id ? { ...todo, task: input, edit: false } : todo))
  );
  setEditInput(""); // Clear edit input after saving
 };

 return (
  <div className="todo-app">
   <div className="todo-container">
    <h1 className="todo-title">Todo List</h1>
    <div className="todo-input-group">
     <input
      type="text"
      className="todo-input"
      value={input}
      placeholder="Enter a new task..."
      onChange={(e) => setInput(e.target.value)}
     />
     <button className="todo-add-btn" onClick={handleAddTodo}>
      Add Todo
     </button>
    </div>
    <h2 className="todo-subtitle">Todos</h2>
    <div className="todo-list">
     {todos.map((todo) => (
      <div key={todo.id} className="todo-item">
       {todo.edit ? (
        <div className="edit-container">
         <input
          type="text"
          className="edit-input"
          value={editInput}
          placeholder="Edit your task..."
          onChange={(e) => setEditInput(e.target.value)}
         />
         <button className="save-btn" onClick={() => handleSaveEditTodo(editInput, todo.id)}>
          Save
         </button>
        </div>
       ) : (
        <>
         <h3 className="todo-text">{todo.task}</h3>
         <div className="todo-actions">
          <button className="edit-btn" onClick={() => handleEditTodos(todo.id)}>
           Edit
          </button>
          <button className="delete-btn" onClick={() => handleDeleteTodos(todo.id)}>
           Delete
          </button>
         </div>
        </>
       )}
      </div>
     ))}
    </div>
   </div>
  </div>
 );
};

export default TodoApp;
