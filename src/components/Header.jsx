import React from "react";
import "react-router-dom";
import { Link } from "react-router-dom";

const Header = () => {
 return (
  <header className="header">
   <h1>
    <Link to="/">גיא ליבה</Link>
   </h1>
   <p>מפתח Full-Stack HTML JavaScript CSS3 React.js Vite Node.js</p>
   <nav>
    <ul>
     <li>
      <Link to="/">דף הבית</Link>
     </li>
     <li>
      <Link to="/projects/todo">אפליקציית מטלות</Link>
     </li>
     <li>
      <Link to="/projects/memorygame">משחק הזיכרון</Link>
     </li>
     <li>
      <Link to="/projects/inventory">מערכת ניהול מלאי</Link>
     </li>
     <li>
      <Link to="/projects/blog">בלוג אישי</Link>
     </li>
     <li>
      <Link to="/projects/voting">מערכת הצבעות</Link>
     </li>
     <li>
      <Link to="/projects/calculator">מחשבון</Link>
     </li>
    </ul>
   </nav>
  </header>
 );
};

export default Header;
