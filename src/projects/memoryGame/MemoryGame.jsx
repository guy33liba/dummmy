import React, { useState, useEffect, useRef } from "react";
import "./MemoryGame.css";

// ייבוא תמונות
import ring from "/images/ring.png";
import helmet from "/images/helmet.png";
import potion from "/images/potion.png";
import scroll from "/images/scroll.png";
import shield from "/images/shield.png";
import sword from "/images/sword.png";
import cardBack from "/images/background.png";

import flipSound from "../../sounds/flip.mp3";
import matchSound from "../../sounds/match.mp3";
import winSound from "../../sounds/win.mp3";
import shuffleSound from "../../sounds/shuffle.mp3";

const cardImages = [
 { src: ring, name: "ring" },
 { src: helmet, name: "helmet" },
 { src: potion, name: "potion" },
 { src: scroll, name: "scroll" },
 { src: shield, name: "shield" },
 { src: sword, name: "sword" },
];

const MemoryGame = () => {
 const [cards, setCards] = useState([]);
 const [turns, setTurns] = useState(0);
 const [choiceOne, setChoiceOne] = useState(null);
 const [choiceTwo, setChoiceTwo] = useState(null);
 const [disabled, setDisabled] = useState(false);
 const [gameWon, setGameWon] = useState(false);
 const [timer, setTimer] = useState(0);
 const [isRunning, setIsRunning] = useState(false);
 const [isShuffling, setIsShuffling] = useState(false);

 const flipAudio = useRef(new Audio(flipSound));
 const matchAudio = useRef(new Audio(matchSound));
 const winAudio = useRef(new Audio(winSound));
 const shuffleAudio = useRef(new Audio(shuffleSound));

 const playAudio = (audioRef) => {
  try {
   audioRef.current.currentTime = 0;
   audioRef.current.play().catch((e) => {
    console.error("Audio blocked:", e);
    // Fallback: Force play by user interaction
    document.body.addEventListener("click", () => audioRef.current.play(), { once: true });
   });
  } catch (e) {
   console.error("Audio error:", e);
  }
 };
 const shuffleCards = () => {
  setIsShuffling(true);
  setCards([]);
  setGameWon(false);

  setTimeout(() => {
   const shuffledCards = [...cardImages, ...cardImages]
    .map((card, index) => ({ ...card, id: index, matched: false, flipped: false }))
    .sort(() => Math.random() - 0.5);
   playAudio(shuffleAudio);
   setCards(shuffledCards);
   setTurns(0);
   setTimer(0);
   setIsRunning(true);
   setChoiceOne(null);
   setChoiceTwo(null);

   // הצגת כל הקלפים למשך 2 שניות
   setTimeout(() => {
    setCards((prevCards) => prevCards.map((card) => ({ ...card, flipped: true })));
    playAudio(flipAudio);

    // הסתרת הקלפים אחרי 2 שניות
    setTimeout(() => {
     setCards((prevCards) => prevCards.map((card) => ({ ...card, flipped: false })));
     setIsShuffling(false);
    }, 2000);
   }, 300);
  }, 500);
 };

 const handleChoice = (card) => {
  if (disabled || card.matched || card.flipped || isShuffling) return;

  const newCards = cards.map((c) => (c.id === card.id ? { ...c, flipped: true } : c));
  setCards(newCards);

  if (!choiceOne) {
   setChoiceOne({ ...card, flipped: true });
  } else {
   setChoiceTwo({ ...card, flipped: true });
  }
 };

 useEffect(() => {
  if (choiceOne && choiceTwo) {
   setDisabled(true);
   const isMatch = choiceOne.name === choiceTwo.name;
   if (isMatch) {
    playAudio(matchAudio);
   }
   setTimeout(
    () => {
     setCards((prevCards) =>
      prevCards.map((card) => ({
       ...card,
       flipped:
        card.matched || card.id === choiceOne.id || card.id === choiceTwo.id
         ? isMatch
         : card.flipped,
       matched: card.name === choiceOne.name && isMatch ? true : card.matched,
      }))
     );
     setChoiceOne(null);
     setChoiceTwo(null);
     setTurns((prev) => prev + 1);
     setDisabled(false);
    },
    isMatch ? 600 : 1000
   );
  }
 }, [choiceOne, choiceTwo]);

 useEffect(() => {
  if (cards.length > 0 && cards.every((card) => card.matched)) {
   setIsRunning(false);
   setTimeout(() => {
    setGameWon(true);
    playAudio(winAudio);
   }, 500);
  }
 }, [cards]);

 useEffect(() => {
  let interval;
  if (isRunning) {
   interval = setInterval(() => {
    setTimer((prev) => prev + 1);
   }, 1000);
  }
  return () => clearInterval(interval);
 }, [isRunning]);

 useEffect(() => {
  shuffleCards();
 }, []);

 return (
  <div className="memory-game">
   <h1 className="game-title">משחק זיכרון</h1>

   <div className="game-info">
    <p>
     זמן: <span className="timer">{timer}</span> שניות
    </p>
    <p>
     ניסיונות: <span className="turns">{turns}</span>
    </p>
    <button className="new-game-btn" onClick={shuffleCards}>
     משחק חדש
    </button>
   </div>

   {gameWon && (
    <div className="win-message">
     <h2>ניצחת! 🎉</h2>
     <p>
      סיימת ב-{turns} ניסיונות ו-{timer} שניות!
     </p>
    </div>
   )}

   <div className={`card-grid ${isShuffling ? "shuffling" : ""}`}>
    {cards.map((card) => (
     <div
      key={card.id}
      className={`card ${card.matched ? "matched" : ""}`}
      onClick={() => handleChoice(card)}
     >
      <div className={`card-inner ${card.flipped ? "flipped" : ""}`}>
       <div className="card-front">
        <img src={card.src} alt={card.name} />
       </div>
       <div className="card-back">
        <img src={cardBack} alt="card back" />
       </div>
      </div>
     </div>
    ))}
   </div>
   <div>
    <button onClick={() => playAudio(flipAudio)}>Play Flip Sound</button>
    <button onClick={() => playAudio(winAudio)}>Play Win Sound</button>
    <button onClick={() => playAudio(shuffleAudio)}>Play shuffleAudio Sound</button>
    <button onClick={() => playAudio(matchAudio)}>Play matchAudio Sound</button>
   </div>
  </div>
 );
};

export default MemoryGame;
