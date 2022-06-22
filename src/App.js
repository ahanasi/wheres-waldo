import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "./index";

const App = () => {
  const [gameImg, setGameImg] = useState("");

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

  return (
    <div
      className="w-full h-screen bg-center bg-cover"
      style={{
        backgroundImage: `url(${gameImg})`,
      }}
    ></div>
  );
};

export default App;
