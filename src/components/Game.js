import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../index";
import Box from "./Box";
import CharList from "./Charlist";

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

const Game = () => {
  const [gameImg, setGameImg] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });
  const [boxComponents, setBoxComponents] = useState([]);
  const [boxDisplay, setBoxDisplay] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [winCount, setWinCount] = useState(0);
  const [currentScore, setCurrentScore] = useState("0");
  const [nameInput, setNameInput] = useState("");

  const scoreModal = document.querySelector(".leaderBoard-form");

  const resetTimer = () => {
    setSeconds(0);
    setTimerActive(false);
  };

  const handleAlert = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    document.getElementById(id).classList.toggle("hidden");
  };

  const handleInputChange = (e) => {
    setNameInput(e.target.value);
  };

  const handleListClick = (val) => {
    const data = { name: val, coords: globalCoords };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5001/wheres-waldo-c76a2/us-central1/helloHttp", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res) {
          document.getElementById("alert-success").classList.toggle("hidden");
          setBoxComponents((prevState) => [...prevState, <Box x={coords.x} y={coords.y} color={"Chartreuse"} />]);
          setWinCount(winCount + 1);
        } else {
          document.getElementById("alert-fail").classList.toggle("hidden");
        }
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const imgRef = ref(storage, "easy_waldo.jpg");
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
  }, [gameImg, winCount]);

  useEffect(() => {
    if (winCount === 4) {
      let score = moment.duration(seconds, "seconds").format("hh[h] mm[m] ss[s]");
      setCurrentScore(score);
      resetTimer();
      scoreModal.classList.toggle("hidden");
    }
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
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
      setCoords({
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop,
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
    <div
      className="gameWindow"
      style={{
        backgroundImage: `url(${gameImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      {/* <h2 style={{ backgroundColor: "white" }}>
        Global coords: {globalCoords.x} {globalCoords.y}
        <br />
        Timer: {seconds}s
        <br />
        Score: {currentScore}
      </h2> */}
      <div id="alert-fail" className="hidden flex p-4 bg-red-100 rounded-lg dark:bg-red-200" role="alert">
        <div className="ml-3 text-sm font-medium text-red-700 dark:text-red-800">Try again!</div>
        <button
          type="button"
          onClick={(e) => handleAlert(e)}
          data-id="alert-fail"
          className="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div id="alert-success" className="hidden flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200" role="alert">
        <div className="ml-3 text-sm font-medium text-green-700 dark:text-green-800">You found someone!</div>
        <button
          type="button"
          onClick={(e) => handleAlert(e)}
          data-id="alert-success"
          className="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg className="w-5 h-5 pointer-events-none" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="canvas">{boxComponents}</div>
      {boxDisplay && (
        <div>
          <Box x={coords.x} y={coords.y} color={"black"} />
          <CharList x={coords.x} y={coords.y} handleListClick={handleListClick} />
        </div>
      )}
      <div className="leaderBoard-form flex h-full backdrop-blur-sm hidden">
        <form className="bg-red-100 shadow-md rounded px-8 pt-6 pb-8 m-auto max-w-md z-9999" action="" method="post">
          <p className="font-normal leading-tight text-4xl mt-0 mb-2 text-red-600 text-center">
            You found everyone in <br />
            <strong>{currentScore}</strong>
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
