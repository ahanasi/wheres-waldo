import { Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import HallOfFame from "./components/HallOfFame";
import LvlPicker from "./components/LvlPicker";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LvlPicker />} />
        <Route path="/easy" element={<Game lvl="easy" />} />
        <Route path="/medium" element={<Game lvl="medium" />} />
        <Route path="/hard" element={<Game lvl="hard" />} />
        <Route path="/hof" element={<HallOfFame />} />
      </Routes>
    </div>
  );
};

export default App;
