/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Row from "./Row";

const Grid = ({ currentGuess, guesses, turn }) => {
  return (
    <div>
      {guesses.map((guess, index) => {
        return <Row key={index} guess={guess} />;
      })}
    </div>
  );
};

export default Grid;
