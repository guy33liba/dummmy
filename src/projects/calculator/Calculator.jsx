import React, { useState } from "react";
import "./Calculator.css";
const Calculator = () => {
 const [current, setCurrent] = useState("");
 const [previous, setPrevious] = useState("");
 const [operator, setOperator] = useState("");
 const [numbers, setNumbers] = useState([
  "*",
  9,
  8,
  7,
  "-",
  6,
  5,
  4,
  "+",
  3,
  2,
  1,
  "/",
  ".",
  0,
  "=",
  "AC",
  "DEL",
 ]);
 const handleNumbersAndOperators = (btn) => {
  if (btn === "AC") {
   setCurrent("");
   setPrevious("");
  } else if (btn === "DEL") {
   const slicedcurrent = current.slice(0, -1);
   setCurrent(slicedcurrent);
  } else if (btn === "+" || btn === "-" || btn === "*" || btn === "/") {
   setOperator(btn);
   setPrevious(btn + current);
   setCurrent("");
  } else if (btn === "=") {
   calculate(operator);
  } else {
   setCurrent((prev) => prev + btn);
  }
 };
 const calculate = (operator) => {
  let numCurrent = parseFloat(current);
  let numPrevious = parseFloat(previous);
  let result = 0;

  switch (operator) {
   case "+":
    result = numCurrent + numPrevious;
    break;
   case "-":
    result = numCurrent - numPrevious;
    break;
   case "/":
    if (numCurrent !== 0) {
     result = numCurrent / numPrevious;
    }
    break;
   case "*":
    result = numCurrent * numPrevious;
    break;
  }
  setCurrent(result.toString());
  setPrevious("");
  setOperator("");
 };
 return (
  <div className="calculatorContainer">
   <h1>מחשבון </h1>
   <div className="screen">
    <div>{previous}</div>
    <div>{current}</div>
   </div>
   <div className="numbersContainer">
    {numbers.map((num, index) => {
     return (
      <div key={index}>
       <button
        className="numbers"
        onClick={() => {
         handleNumbersAndOperators(num);
        }}
       >
        {num}
       </button>
      </div>
     );
    })}
   </div>
  </div>
 );
};

export default Calculator;
