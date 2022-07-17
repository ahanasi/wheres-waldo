import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { firestore } from "../index";
import { v4 as uuidv4 } from "uuid";

const HallOfFame = () => {
  const [scoreList, setScoreList] = useState([]);
  const db = firestore;

  useEffect(() => {
    const fetchHof = async () => {
      const hofCol = collection(db, "hof");
      const q = query(hofCol, orderBy("score"), limit(3));
      const querySnapshot = await getDocs(q);
      const hofList = querySnapshot.docs.map((doc) => doc.data());
      return hofList;
    };

    fetchHof().then((res) => setScoreList(res));
  }, []);

  return (
    <div className="h-screen bg-slate-400 flex flex-col items-center p-3">
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2 text-gray-700">Leaderboard</h1>
      <div className="flex flex-col">
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
                  {scoreList &&
                    scoreList.map((obj, i) => (
                      <tr className="bg-white border-b" key={uuidv4()}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{obj.name}</td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{obj.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallOfFame;
