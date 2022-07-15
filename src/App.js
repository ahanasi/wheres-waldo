import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import HallOfFame from "./components/HallOfFame";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/hof" element={<HallOfFame />} />
      </Routes>
    </div>
  );
};

export default App;
