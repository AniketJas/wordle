import { useEffect } from "react";
import { useState } from "react";
import Wordle from "./components/Wordle";

const App = () => {
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/solutions")
      .then((res) => res.json())
      .then(async (json) => {
        const randomId = Math.floor(Math.random() * json.length);
        const randomSolution = json[randomId];
        setSolution(randomSolution.word);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <h1>Wordle</h1>
      {<Wordle solution={solution} />}
    </div>
  );
};

export default App;
