import React from "react";
import "react-router-dom";

const Header = () => {
 return (
  <header className="header">
   <h1>גיא ליבה</h1>
   <p>מפתח Full-Stack HTML JavaScript CSS3 React.js Vite Node.js</p>
   <nav>
    <ul>
     <li>דף הבית</li>
     <li>אתר פורטפוליו</li>
     <li>אפליקציית מטלות</li>
     <li>משחק זיכרון</li>
     <li>מערכת ניהול מלאי</li>
     <li>בלוג אישי</li>
     <li>מערכת הזמנות אונליין</li>
     <li>ניהול משימות</li>
     <li>מערכת הצבעות</li>
    </ul>
   </nav>
  </header>
 );
};

export default Header;
