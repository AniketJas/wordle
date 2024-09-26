import { useEffect, useState } from "react";

const Keypad = () => {
  const [letters, setLetters] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/letters")
      .then((res) => res.json())
      .then((json) => setLetters(json));
  }, []);

  return (
    <div className="keypad">
      {letters &&
        letters.map((letter) => <div key={letter.key}>{letter.key}</div>)}
    </div>
  );
};

export default Keypad;
