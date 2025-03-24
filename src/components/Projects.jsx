import React from "react";
import projects from "./projectsData";
import { Link } from "react-router-dom";

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
      <Link to={project.link} className="projectLink">
       צפה בפרויקט
      </Link>
     </div>
    ))}
   </div>
  </section>
 );
};

export default Projects;
