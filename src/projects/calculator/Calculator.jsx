import React, { useState } from "react";
import "./Calculator.css";
const Calculator = () => {
 const [current, setCurrent] = useState("");
 const [previous, setPrevious] = useState("");
 const [numbers, setNumbers] = useState([
  "AC", "DEL", "*",
  9, 8, 7, "-",
  6, 5, 4, "+",
  3, 2, 1, "/",
  "=", 0, "."
 ]);
 return (
  <div className="calculatorContainer">
   <h1>מחשבון </h1>
   <div className="numbersContainer">
    {numbers.map((num) => {
     return (
      <div>
       <div className="numbers">{num}</div>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default Calculator;
