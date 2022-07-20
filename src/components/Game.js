import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { storage } from "../index";
import Box from "./Box";
import CharList from "./Charlist";
import { v4 as uuidv4 } from "uuid";

let moment = require("moment");
let momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

const Game = ({ lvl }) => {
  const [gameImg, setGameImg] = useState("");
  const [percentCoords, setPercentCoords] = useState({ x: 0, y: 0 });
  const [imgSett, setImgSett] = useState({ width: 0, height: 0 });
  const [boxComponents, setBoxComponents] = useState([]);
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [currentScore, setCurrentScore] = useState("0");
  const [nameInput, setNameInput] = useState("");

  const scoreModal = document.querySelector(".leaderBoard-form");

  const navigate = useNavigate();

  const resetTimer = () => {
    setSeconds(0);
    setTimerActive(false);
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleListClick = (val) => {
    const data = { name: val, coords: percentCoords, lvl: lvl };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("https://us-central1-wheres-waldo-c76a2.cloudfunctions.net/getCoords", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          setBoxComponents((prevState) => [...prevState, <Box x={percentCoords.x} y={percentCoords.y} imgSett={imgSett} color={"Chartreuse"} key={uuidv4()} />]);
          setWinCount(winCount + 1);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name: nameInput, time: currentScore, lvl: lvl };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("https://us-central1-wheres-waldo-c76a2.cloudfunctions.net/addScore", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          navigate("/hof");
          console.log("Succeeded");
        } else {
          console.log("Failed");
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const imgRef = ref(storage, `${lvl}_waldo.jpg`);
      getDownloadURL(imgRef)
        .then((url) => {
          setGameImg(url);
          if (winCount < 4) {
            setTimerActive(true);
          }
        })
        .catch((error) => console.log(error));
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameImg, winCount]);

  useEffect(() => {
    if (winCount === 4) {
      setCurrentScore(seconds);
      resetTimer();
      scoreModal.classList.toggle("hidden");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winCount]);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    } else if (timerActive && seconds !== 0) {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive, seconds]);

  useEffect(() => {
    const handleMouseClick = (event) => {
      let offset = event.target.getBoundingClientRect();
      setImgSett({ width: offset.width, height: offset.height, top: offset.top, left: offset.left });
      console.log({ x: Math.floor(((event.pageX - offset.left) / offset.width) * 10000) / 100, y: Math.floor(((event.pageY - offset.top) / offset.height) * 10000) / 100 });
      setPercentCoords({
        x: Math.floor(((event.pageX - offset.left) / offset.width) * 10000) / 100,
        y: Math.floor(((event.pageY - offset.top) / offset.height) * 10000) / 100,
      });

      if (!event.target.dataset.id) {
        setBoxDisplay((prevState) => !prevState);
      }
    };

    window.addEventListener("click", handleMouseClick);

    if (winCount >= 4) {
      window.removeEventListener("click", handleMouseClick);
    }

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [winCount]);

  return (
    <div className="gameWindow h-screen flex flex-col justify-center items-center">
      <div className="h-1/2 flex justify-center items-center">
        <img src={gameImg} alt="Easy" className="object-center" width="1000px" />
      </div>
      {/* <h2 style={{ backgroundColor: "white" }}>
        Global coords: {globalCoords.x} {globalCoords.y}
        <br />
        Coords: {coords.x} {coords.y}
        <br />
        %Coords: {percentCoords.x} {percentCoords.y}
      </h2> */}
      <div className="canvas">{boxComponents}</div>
      {boxDisplay && (
        <div>
          <Box x={percentCoords.x} y={percentCoords.y} imgSett={imgSett} color={"black"} />
          <CharList x={percentCoords.x} y={percentCoords.y} imgSett={imgSett} handleListClick={handleListClick} />
        </div>
      )}
      <div className="leaderBoard-form fixed hidden inset-0 overflow-y-auto h-full w-full backdrop-blur-sm flex flex-col items-center justify-center">
        <form className="bg-red-100 shadow-md rounded px-8 pt-6 pb-8 m-auto max-w-md z-9999" method="post" onSubmit={handleSubmit}>
          <p className="font-normal leading-tight text-4xl mt-0 mb-2 text-red-600 text-center">
            You found everyone in <br />
            <strong>{moment.duration(currentScore, "seconds").format("hh[h] mm[m] ss[s]")}</strong>
          </p>
          <br />
          <p className="font-small leading-tight text-xl mt-0 mb-2 text-red-600">Enter your name for the leaderboards:</p>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="hofInput"
            value={nameInput}
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
};

export default Game;
