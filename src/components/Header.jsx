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
    </ul>
   </nav>
  </header>
 );
};

export default Header;
