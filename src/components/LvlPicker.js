import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../index";
import easy from "../assets/easy_waldo.jpg";
import medium from "../assets/medium_waldo.jpg";
import hard from "../assets/hard_waldo.jpg";
import { useNavigate } from "react-router-dom";

const LvlPicker = () => {
  const navigate = useNavigate();

  const enterGame = (e) => {
    e.preventDefault();
    const lvl = e.target.dataset.id;
    navigate("/" + lvl);
  };

  const [logo, setLogo] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const imgRef = ref(storage, `logo.svg`);
      getDownloadURL(imgRef)
        .then((url) => {
          setLogo(url);
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen bg-slate-200">
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <img src={logo} width="250" alt="Where's Waldo" />
          <div className="flex justify-stretch items-center mt-10">
            <div className="flex flex-col items-center px-10">
              <img
                className="p-1 bg-white border rounded max-w-sm scale-100 hover:scale-105 ease-in duration-500 mb-3 cursor-pointer"
                src={easy}
                alt="Easy"
                data-id="easy"
                onClick={enterGame}
              />
              <h1 className=" text-2xl text-gray-600 ">Easy</h1>
            </div>
            <div className="flex flex-col items-center px-10">
              <img
                className="p-1 bg-white border rounded max-w-sm scale-100 hover:scale-105 ease-in duration-500 mb-3 cursor-pointer"
                src={medium}
                alt="Medium"
                data-id="medium"
                onClick={enterGame}
              />
              <h1 className=" text-2xl text-gray-600 ">Medium</h1>
            </div>
            <div className="flex flex-col items-center px-10">
              <img
                className="p-1 bg-white border rounded max-w-sm scale-100 hover:scale-105 ease-in duration-500 mb-3 cursor-pointer"
                src={hard}
                alt="Hard"
                data-id="hard"
                onClick={enterGame}
              />
              <h1 className=" text-2xl text-gray-600 ">Hard</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LvlPicker;
