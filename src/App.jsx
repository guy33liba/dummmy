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
import Tasks from "./projects/tasks/Tasks";

const App = () => {
 const [count, setCount] = useState(0);
 debugger;
 return (
  <Router>
   <div>
    hellohello
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
     <Route path="/projects/inventory" element={<Inventory />} />
     <Route path="/projects/memorygame" element={<MemoryGame />} />
     <Route path="/projects/voting" element={<Voting />} />
     <Route path="/projects/tasks" element={<Tasks />} />
    </Routes>
   </div>
  </Router>
 );
};

export default App;
