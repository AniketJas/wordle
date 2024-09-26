/* eslint-disable react/prop-types */
import { useEffect } from "react";
import useWordle from "../hooks/useWordle.js";
import Grid from "./Grid.jsx";
import Keypad from "./Keypad.jsx";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect } =
    useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //cleanup function
  }, [handleKeyup]);

  useEffect(() => {
    console.log(guesses, turn, isCorrect);
  }, [guesses, turn, isCorrect]);

  return (
    <>
      <div>Solution is: {solution}</div>
      <div>Current guess is: {currentGuess}</div>
      <Grid currentGuess={currentGuess} guesses={guesses} turn={turn} />
      <Keypad />
    </>
  );
};

export default Wordle;
