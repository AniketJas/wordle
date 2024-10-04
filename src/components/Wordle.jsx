/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useWordle from "../hooks/useWordle.js";
import Grid from "./Grid.jsx";
import Keypad from "./Keypad.jsx";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    if(isCorrect){
      console.log("Congrats!")
      window.removeEventListener("keyup", handleKeyup);
    }

    if(turn > 5){
      console.log("Unlucky!")
      window.removeEventListener("keyup", handleKeyup);
    }

    return () => window.removeEventListener("keyup", handleKeyup); //cleanup function
  }, [handleKeyup]);

  return (
    <>
      <div>Solution is: {solution}</div>
      <div>Current guess is: {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad usedKeys={usedKeys}/>
    </>
  );
};

export default Wordle;
