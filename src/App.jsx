import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

const App = () => {
 return (
  <div>
   {" "}
   <Header />
   <About />
   <Skills />
   <Experience />
   <Contact />
  </div>
 );
};

export default App;
