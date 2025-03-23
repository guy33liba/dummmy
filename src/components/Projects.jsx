import React from "react";
import projects from "./projectsData";

const Projects = () => {
 return (
  <section id="projects" className="projectsSection">
   <h2>פרויקטים שלי</h2>
   <div className="projects-grid">
    {projects.map((project) => (
     <div key={project.id} className="projectCard">
      <img src={project.image} alt={project.name} className="projectImage" />
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <a href={project.link} className="projectLink">
       צפה בפרויקט
      </a>
     </div>
    ))}
   </div>
  </section>
 );
};

export default Projects;
