/* eslint-disable no-unused-vars */
import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);

  const formatGuess = () => {
    console.log("Formated the current guess: " + currentGuess);
    const solutionArray = [...solution];
    const formattedGuess = [...currentGuess].map((letter) => {
      return { key: letter, color: "gray" };
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        formattedGuess[index].color = "green";
        solutionArray[index] = null;
      }
    });

    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        formattedGuess[index].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = () => {};

  const handleKeyup = ({ key }) => {
    if (key === "Enter") {
      if (turn > 5) {
        console.log("You used all your guesses.");
        return;
      }
      if (history.includes(currentGuess)) {
        console.log("Duplicate guess detected.");
        return;
      }
      if (currentGuess.length !== 5) {
        console.log("Guess should be 5 characters long.");
        return;
      }
      const currentGuessResult = formatGuess();
      console.log(currentGuessResult);
    }

    if (key === "Backspace") {
      setCurrentGuess((prev) => {
        return prev.slice(0, -1);
      });
      return;
    }

    if (/^[a-zA-Z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => {
          return prev + key;
        });
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup };
};

export default useWordle;
