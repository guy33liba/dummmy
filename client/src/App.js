import { useEffect, useState } from "react";
import "./App.css";

function App() {
 const [username, setUsername] = useState("");
 const [startButton, setStartButton] = useState(false);
 const [show1, setShow1] = useState(false);
 const [show2, setShow2] = useState(false);
 const [messageforOne, setMessageforOne] = useState("");
 const [messageforTwo, setMessageforTwo] = useState("");
 const [clicked, setClicked] = useState(false);
 const startGame = () => {
  setTimeout(() => {
   setStartButton(true);
  }, Math.floor(Math.random() * (5 - 2 + 1) + 2) * 1000);
 };

 useEffect(() => {
  if (startButton) {
   const randomInterval1 = Math.floor(Math.random() * (5 - 2 + 1) + 2) * 1000;
   const randomInterval2 = Math.floor(Math.random() * (5 - 2 + 1) + 2) * 1000;
   console.log(randomInterval1);
   console.log(randomInterval2);
   const show1Interval = setInterval(() => {
    setShow1((prev) => !prev);
   }, randomInterval1);

   const show2Interval = setInterval(() => {
    setShow2((prev) => !prev);
   }, randomInterval2);

   return () => {
    clearInterval(show1Interval);
    clearInterval(show2Interval);
    setClicked(false);
   };
  }
 }, [startButton]); // Added `startButton` as a dependency
 const handlemessage1 = () => {
  show1 ? setMessageforOne("good") : setMessageforOne("too soon");
  setTimeout(() => {
   setMessageforOne("");
   setClicked(false);
  }, 1000);
 };
 const handleMessage2 = () => {
  show2 ? setMessageforTwo("good") : setMessageforTwo("too soon");

  setTimeout(() => {
   setMessageforTwo("");
   setClicked(false);
  }, 2000);
 };
 return (
  <div>
   <button onClick={startGame}>Start</button>
   <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
   <div className="App">
    {
     <div
      style={{
       background: show1 ? "red" : "green",
       width: "100px",
       height: "500px",
       position: "fixed",
       right: "20%",
       border: "1px solid black",
      }}
      onClick={() => handlemessage1()}
     ></div>
    }
    <div
     style={{
      background: show2 ? "red" : "green",
      width: "100px",
      height: "500px",
      position: "fixed",
      left: "20%",
      border: "1px solid black",
     }}
     onClick={() => handleMessage2()}
    ></div>
   </div>
   <h2 style={{ position: "absolute", right: "30%" }}>{messageforOne}</h2>
   <h2 style={{ position: "absolute", left: "30%" }}>{messageforTwo}</h2>
  </div>
 );
}

export default App;
