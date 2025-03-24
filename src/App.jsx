import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Projects from "./components/Projects";
import TodoApp from "./projects/todoApp/Todoapp";
import PortfolioProject from "./projects/portfolioProject/PortfolioProject";
import MemoryGame from "./projects/memoryGame/MemoryGame";
import Ecommerce from "./projects/ecommerce/Ecommerce";
import Inventory from "./projects/inventory/Inventory";
import Voting from "./projects/voting/Voting";
import Blog from "./projects/blog/Blog";

const App = () => {
 return (
  <Router>
   <div>
    <Header />
    <Routes>
     {/* דף הבית */}
     <Route
      path="/"
      element={
       <>
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
       </>
      }
     />

     {/* דפי הפרויקטים */}
     <Route path="/projects/portfolio" element={<PortfolioProject />} />
     <Route path="/projects/todo" element={<TodoApp />} />
     <Route path="/projects/ecommerce" element={<Ecommerce />} />
     <Route path="/projects/blog" element={<Blog />} />
     <Route path="/projects/inventory" element={<Inventory />} />
     <Route path="/projects/memorygame" element={<MemoryGame />} />
     <Route path="/projects/voting" element={<Voting />} />
    </Routes>
   </div>
  </Router>
 );
};

export default App;
