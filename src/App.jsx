import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
 About,
 Blog,
 Calculator,
 Contact,
 Ecommerce,
 Experience,
 Header,
 Inventory,
 MemoryGame,
 PortfolioProject,
 Projects,
 Skills,
 TodoApp,
 Voting,
} from "./utils";
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
     <Route path="/projects/calculator" element={<Calculator />} />
    </Routes>
   </div>
  </Router>
 );
};

export default App;
