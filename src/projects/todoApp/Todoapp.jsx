import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./TodoApp.css";

const useLocalStorage = (key, initialValue) => {
 const [storedValue, setStoredValue] = useState(() => {
  try {
   if (typeof window === "undefined") {
    return initialValue;
   }
   const item = window.localStorage.getItem(key);
   return item ? JSON.parse(item) : initialValue;
  } catch (error) {
   console.error("Error reading from localStorage:", error);
   return initialValue;
  }
 });

 const setValue = (value) => {
  try {
   const valueToStore = value instanceof Function ? value(storedValue) : value;
   setStoredValue(valueToStore);
   if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
   }
  } catch (error) {
   console.error("Error writing to localStorage:", error);
  }
 };

 return [storedValue, setValue];
};
const TodoApp = () => {
 const [todos, setTodos] = useLocalStorage("todo", []);
 const [input, setInput] = useState("");
 const [editInput, setEditInput] = useState("");
 const [currentTime, setCurrentTime] = useState(new Date());
 const [filter, setFilter] = useState("all");
 const [priority, setPriority] = useState("medium");
 const [searchTerm, setSearchTerm] = useState("");

 // טעינת משימות מה-localStorage
 useEffect(() => {
  const savedTodos = localStorage.getItem("todos");
  if (savedTodos) setTodos(JSON.parse(savedTodos));
 }, []);

 // שמירת משימות ב-localStorage
 useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos]);

 // עדכון השעה כל שנייה
 useEffect(() => {
  const timer = setInterval(() => {
   setCurrentTime(new Date());
  }, 1000);
  return () => clearInterval(timer);
 }, []);

 // פילטור המשימות
 const filteredTodos = todos.filter((todo) => {
  // פילטר לפי סטטוס
  if (filter === "active" && todo.completed) return false;
  if (filter === "completed" && !todo.completed) return false;

  // פילטר לפי חיפוש
  return todo.task.toLowerCase().includes(searchTerm.toLowerCase());
 });

 const handleAddTodo = () => {
  if (input.trim() === "") return;
  const newTodo = {
   task: input,
   id: Date.now(),
   edit: false,
   completed: false,
   createdAt: new Date(),
   priority: priority,
  };
  setTodos((prev) => [...prev, newTodo]);
  setInput("");
 };

 const handleDeleteTodo = (id) => {
  setTodos((prev) => prev.filter((todo) => todo.id !== id));
 };

 const handleEditTodo = (id) => {
  setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, edit: true } : todo)));
  const todoToEdit = todos.find((todo) => todo.id === id);
  setEditInput(todoToEdit.task);
 };

 const handleSaveEditTodo = (id) => {
  if (editInput.trim() === "") return;
  setTodos((prev) =>
   prev.map((todo) => (todo.id === id ? { ...todo, task: editInput, edit: false } : todo))
  );
  setEditInput("");
 };

 const toggleComplete = (id) => {
  setTodos((prev) =>
   prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  );
 };

 const handleKeyPress = (e) => {
  if (e.key === "Enter") handleAddTodo();
 };

 const formatDate = (date) => {
  return date.toLocaleDateString("he-IL") + " " + date.toLocaleTimeString("he-IL");
 };

 const getPriorityColor = (priority) => {
  switch (priority) {
   case "high":
    return "#ff6b6b";
   case "medium":
    return "#4dabf7";
   case "low":
    return "#51cf66";
   default:
    return "#4a6baf";
  }
 };

 return (
  <div className="todo-app">
   <div className="todo-container">
    <div className="todo-header">
     <h1 className="todo-title">Todo List</h1>
     <div className="current-time">
      {currentTime.toLocaleDateString("he-IL")} <br />
      {currentTime.toLocaleTimeString("he-IL")}
     </div>
    </div>

    <div className="search-container">
     <input
      type="text"
      placeholder="חפש משימות..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="search-input"
     />
    </div>

    <div className="todo-input-group">
     <input
      type="text"
      className="todo-input"
      value={input}
      placeholder="הכנס משימה חדשה..."
      onChange={(e) => setInput(e.target.value)}
      onKeyPress={handleKeyPress}
     />
     <select
      value={priority}
      onChange={(e) => setPriority(e.target.value)}
      className="priority-select"
     >
      <option value="low">נמוכה</option>
      <option value="medium">בינונית</option>
      <option value="high">גבוהה</option>
     </select>
     <button className="todo-add-btn" onClick={handleAddTodo}>
      הוסף משימה
     </button>
    </div>

    <div className="todo-filters">
     <button
      className={`filter-btn ${filter === "all" ? "active" : ""}`}
      onClick={() => setFilter("all")}
     >
      הכל
     </button>
     <button
      className={`filter-btn ${filter === "active" ? "active" : ""}`}
      onClick={() => setFilter("active")}
     >
      פעיל
     </button>
     <button
      className={`filter-btn ${filter === "completed" ? "active" : ""}`}
      onClick={() => setFilter("completed")}
     >
      הושלם
     </button>
    </div>

    <div className="todo-stats">
     <span>סה"כ: {todos.length}</span>
     <span>פעיל: {todos.filter((t) => !t.completed).length}</span>
     <span>הושלם: {todos.filter((t) => t.completed).length}</span>
    </div>

    <div className="todo-list">
     <AnimatePresence>
      {filteredTodos.length === 0 ? (
       <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="empty-state">
        <p>אין משימות להצגה</p>
        <small>הוסף משימה חדשה למעלה</small>
       </motion.div>
      ) : (
       filteredTodos.map((todo) => (
        <motion.div
         key={todo.id}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, x: -100 }}
         transition={{ duration: 0.3 }}
         className={`todo-item ${todo.completed ? "completed" : ""}`}
         style={{
          borderLeft: `4px solid ${getPriorityColor(todo.priority)}`,
         }}
        >
         {todo.edit ? (
          <div className="edit-container">
           <input
            type="text"
            className="edit-input"
            value={editInput}
            placeholder="ערוך משימה..."
            onChange={(e) => setEditInput(e.target.value)}
            autoFocus
           />
           <div className="edit-actions">
            <button className="save-btn" onClick={() => handleSaveEditTodo(todo.id)}>
             שמור
            </button>
            <button
             className="cancel-btn"
             onClick={() =>
              setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, edit: false } : t)))
             }
            >
             ביטול
            </button>
           </div>
          </div>
         ) : (
          <>
           <div className="todo-content">
            <input
             type="checkbox"
             checked={todo.completed}
             onChange={() => toggleComplete(todo.id)}
             className="todo-checkbox"
            />
            <div className="todo-text-container">
             <h3 className="todo-text">{todo.task}</h3>
             <div className="todo-meta">
              <small className="todo-date">נוצר: {formatDate(new Date(todo.createdAt))}</small>
              <span
               className="priority-badge"
               style={{
                backgroundColor: getPriorityColor(todo.priority),
               }}
              >
               {todo.priority === "high" && "גבוהה"}
               {todo.priority === "medium" && "בינונית"}
               {todo.priority === "low" && "נמוכה"}
              </span>
             </div>
            </div>
           </div>
           <div className="todo-actions">
            <button className="edit-btn" onClick={() => handleEditTodo(todo.id)}>
             ערוך
            </button>
            <button className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
             מחק
            </button>
           </div>
          </>
         )}
        </motion.div>
       ))
      )}
     </AnimatePresence>
    </div>
   </div>
  </div>
 );
};

export default TodoApp;
