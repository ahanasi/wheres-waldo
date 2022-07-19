import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, where } from "firebase/firestore";
import { firestore } from "../index";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

let moment = require("moment");
let momentDurationFormatSetup = require("moment-duration-format");

momentDurationFormatSetup(moment);

const HallOfFame = () => {
  const [easyList, setEasyList] = useState([]);
  const [medList, setMedList] = useState([]);
  const [hardList, setHardList] = useState([]);

  const db = firestore;
  const navigate = useNavigate();

  const openNewGame = (e) => {
    e.preventDefault();
    navigate("/");
  };

  useEffect(() => {
    const fetchHof = async () => {
      const hofCol = collection(db, "hof");
      const q_easy = query(hofCol, where("level", "==", "easy"), orderBy("score"), limit(10));
      const q_medium = query(hofCol, where("level", "==", "medium"), orderBy("score"), limit(10));
      const q_hard = query(hofCol, where("level", "==", "hard"), orderBy("score"), limit(10));
      const querySnapshot = await getDocs(q_easy);
      const medSnapShot = await getDocs(q_medium);
      const hardSnapShot = await getDocs(q_hard);

      const easyList = querySnapshot.docs.map((doc) => doc.data());
      const medList = medSnapShot.docs.map((doc) => doc.data());
      const hardList = hardSnapShot.docs.map((doc) => doc.data());
      return [easyList, medList, hardList];
    };

    fetchHof().then((res) => {
      setEasyList(res[0]);
      setMedList(res[1]);
      setHardList(res[2]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-screen bg-slate-300 flex flex-col items-center p-3">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-gray-700">Leaderboard</h1>
      <div className="flex mt-4">
        <div className="flex flex-col px-5">
          <h2 className="text-xl text-center">Easy</h2>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {easyList &&
                      easyList.map((obj, i) => (
                        <tr className="bg-white border-b" key={uuidv4()}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{obj.name}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{moment.duration(obj.score, "seconds").format("hh[h] mm[m] ss[s]")}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5">
          <h2 className="text-xl text-center">Medium</h2>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {medList &&
                      medList.map((obj, i) => (
                        <tr className="bg-white border-b" key={uuidv4()}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{obj.name}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{moment.duration(obj.score, "seconds").format("hh[h] mm[m] ss[s]")}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col px-5">
          <h2 className="text-xl text-center">Hard</h2>
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        #
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Name
                      </th>
                      <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {hardList &&
                      hardList.map((obj, i) => (
                        <tr className="bg-white border-b" key={uuidv4()}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{obj.name}</td>
                          <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{moment.duration(obj.score, "seconds").format("hh[h] mm[m] ss[s]")}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="bg-transparent hover:bg-gray-700 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded"
        onClick={openNewGame}
      >
        New Game
      </button>
    </div>
  );
};

export default HallOfFame;
