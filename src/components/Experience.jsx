import React from "react";

const Experience = () => {
 return (
  <div className="experience-container">
   <h2 className="experience-heading">ניסיון תעסוקתי</h2>
   <section className="experience-section">
    <ul className="experience-list">
     <li className="experience-item">
      <strong className="job-title">מתן שירותי הדמיה אורתודונטית וניהול IT | טלטון</strong>
      <br />
      📅 <span className="job-duration">*01/2022 - כיום*</span>
      <ul className="job-details">
       <li>מתן שירותי הדמיה אורתודונטית ללקוחות</li>
       <li>ניהול רשתות מחשבים פנימיות ותחזוקה שוטפת</li>
       <li>מתן תמיכה ושירותים למרפאות שיניים</li>
       <li>סיוע בהבטחת חוויית לקוח מצוינת</li>
       <li>תמיכת IT פנים-ארגונית</li>
      </ul>
     </li>
     <li className="experience-item">
      <strong className="job-title">מפעיל מחסן | מאפיית פארין</strong>
      <br />
      📅 <span className="job-duration">*06/2021 - 01/2022*</span>
      <ul className="job-details">
       <li>ניהול מלאי בצורה יעילה, כולל ספירות מלאי ושמירה על רמות אופטימליות</li>
       <li>הפעלת מלגזה להעברת וארגון מלאי תוך שמירה על פרוטוקולי בטיחות</li>
       <li>אחריות על קבלת ושיגור סחורות תוך הבטחת תיעוד מדויק</li>
      </ul>
     </li>
     <li className="experience-item">
      <strong className="job-title">משגיח כשרות מאפייה</strong>
      <br />
      📅 <span className="job-duration">*01/2020 - 01/2021*</span>
      <ul className="job-details">
       <li>הקפדה על הנחיות כשרות ופיקוח על יישום פרוטוקולי כשרות</li>
       <li>תיאום עם צוותי בקרת איכות לשמירה על עקביות המוצר ותקני היגיינה</li>
      </ul>
     </li>
    </ul>
   </section>

   <h2 className="education-heading">השכלה</h2>
   <section className="education-section">
    <ul className="education-list">
     <li className="education-item">
      <strong className="course-title">קורסים והכשרות טכנולוגיות | נס טכנולוגיות</strong>
      <ul className="course-details">
       <li>הכשרה טכנולוגית בתחומי IT ופיתוח</li>
       <li>למידה מעשית עם דגש על פתרון בעיות</li>
      </ul>
     </li>
    </ul>
   </section>
  </div>
 );
};

export default Experience;
