const HallOfFame = () => {
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
                      First
                    </th>
                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                      Last
                    </th>
                    <th scope="col" className="text-sm font-medium text-white px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Mark</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Otto</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@mdo</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">2</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Jacob</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">Thornton</td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@fat</td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">3</td>
                    <td colspan="2" className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                      Larry the Bird
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">@twitter</td>
                  </tr>
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
