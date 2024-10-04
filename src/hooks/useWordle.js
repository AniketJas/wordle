/* eslint-disable no-unused-vars */
import { useState } from "react";

const useWordle = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [usedKeys, setUsedKeys] = useState({});

  const formatGuess = () => {
    console.log("Formated the current guess: " + currentGuess);
    const solutionArray = [...solution];
    const currentGuessResult = [...currentGuess].map((letter) => {
      return { key: letter, color: "gray" };
    });

    currentGuessResult.forEach((letter, index) => {
      if (solutionArray[index] === letter.key) {
        currentGuessResult[index].color = "green";
        solutionArray[index] = null;
      }
    });

    currentGuessResult.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== "green") {
        currentGuessResult[index].color = "yellow";
        solutionArray[solutionArray.indexOf(letter.key)] = null;
      }
    });

    return currentGuessResult;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });

    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });

    setTurn((prevTurn) => {
      return prevTurn + 1;
    });

    setUsedKeys((prevKeys) => {
      let newKeys = {...prevKeys};
      
      formattedGuess.forEach((letter) => {
        let currentColor = newKeys[letter.key];

        if(letter.color === 'green'){
          newKeys[letter.key] = 'green';
          return;
        }
        
        if(letter.color === 'yellow' && currentColor!=='green'){
          newKeys[letter.key] = 'yellow';
          return;
        }

        if(letter.color === 'gray' && currentColor!=='green' && currentColor!=='yellow'){
          newKeys[letter.key] = 'gray';
          return;
        }
      })
      return newKeys;
    })

    setCurrentGuess("");
  };

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
      addNewGuess(currentGuessResult);
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

  return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};

export default useWordle;
