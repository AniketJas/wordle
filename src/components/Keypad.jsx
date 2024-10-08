/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const Keypad = ({usedKeys}) => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/letters")
      .then((res) => res.json())
      .then((json) => setLetters(json));
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => {
        const color = usedKeys[letter.key];
        return <div key={letter.key} className={color}>{letter.key}</div>
      })}
    </div>
  );
};

export default Keypad;
