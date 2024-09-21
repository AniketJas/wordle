import { useEffect } from "react";
import useWordle from "../hooks/useWordle.js";

const Wordle = ({ solution }) => {
  const { currentGuess, handleKeyup } = useWordle(solution);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyup);

    return () => window.removeEventListener("keyup", handleKeyup); //cleanup function
  }, [handleKeyup]);

  return (
    <>
      <div>Solution is: {solution}</div>
      <div>Current guess is: {currentGuess}</div>
    </>
  );
};

export default Wordle;
