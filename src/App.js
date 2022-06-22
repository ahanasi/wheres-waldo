import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./index";

const App = () => {
  const [gameImg, setGameImg] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });

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
      setCoords({
        x: event.clientX - event.target.offsetLeft,
        y: event.clientY - event.target.offsetTop,
      });
    };

    window.addEventListener("click", handleMouseClick);

    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, []);

  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${gameImg})`,
      }}
    >
      <h2>
        Coords: {coords.x} {coords.y}
      </h2>
    </div>
  );
};

export default App;
