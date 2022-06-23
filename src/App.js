import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./index";
import Box from "./components/Box";
import CharList from "./components/Charlist";

const App = () => {
  const [gameImg, setGameImg] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState({ x: 0, y: 0 });

  const [boxDisplay, setBoxDisplay] = useState(false);

  const handleListClick = (val) => {
    const data = { name: val, coords: globalCoords };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch("http://localhost:5001/wheres-waldo-c76a2/us-central1/helloHttp", requestOptions)
      .then((response) => response.json())
      .then((res) => console.log(res));
  };

  useEffect(() => {
    const fetchData = async () => {
      const imgRef = ref(storage, "easy_waldo.jpg");
      getDownloadURL(imgRef)
        .then((url) => {
          setGameImg(url);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, [gameImg]);

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
      setBoxDisplay((prevState) => !prevState);
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <div
      className=""
      style={{
        backgroundImage: `url(${gameImg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h2 style={{ backgroundColor: "white" }}>
        Global coords: {globalCoords.x} {globalCoords.y}
      </h2>
      {boxDisplay && (
        <div>
          <Box x={coords.x} y={coords.y} />
          <CharList x={coords.x} y={coords.y} handleListClick={handleListClick} />
        </div>
      )}
    </div>
  );
};

export default App;
