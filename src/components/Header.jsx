import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
 return (
  <header className="header">
   <h1>גיא ליבה</h1>
   <p>מפתח Full-Stack וטכנאי IT</p>
   <nav>
    <ul>
     <li>
      <Link to="/">דף הבית</Link>
     </li>
     <li>
      <Link to="/projects/portfolio">אתר פורטפוליו</Link>
     </li>
     <li>
      <Link to="/projects/todo">אפליקציית מטלות</Link>
     </li>
     <li>
      <Link to="/projects/memory">משחק זיכרון</Link>
     </li>
     <li>
      <Link to="/projects/memory">מערכת ניהול מלאי</Link>
     </li>
     <li>
      <Link to="/projects/memory">בלוג אישי</Link>
     </li>
     <li>
      <Link to="/projects/memory">מערכת הזמנות אונליין</Link>
     </li>
     <li>
      <Link to="/projects/memory">ניהול משימות</Link>
     </li>
     <li>
      <Link to="/projects/memory">מערכת הצבעות</Link>
     </li>
    </ul>
   </nav>
  </header>
 );
};

export default Header;
