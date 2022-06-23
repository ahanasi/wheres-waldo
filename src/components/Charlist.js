import { v4 as uuidv4 } from "uuid";

const CharList = ({ x, y }) => {
  return (
    <div className="fixed inset-0">
      <ul className="flex flex-col items-center text-xs absolute translate -translate-y-1/2 -translate-x-1/2" style={{ left: x + 65, top: y + 60 }}>
        <li className="bg-white border border-gray-200 w-24 text-gray-900" key={uuidv4()}>
          <button
            type="button"
            class="
          w-full
          text-left
          px-2
          py-2
          border-b border-gray-200
          hover:bg-gray-200 hover:text-gray-500
          focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
          transition
          duration-500
          cursor-pointer
      "
          >
            Waldo
          </button>
        </li>
        <li className="bg-white border border-gray-200 w-24 text-gray-900" key={uuidv4()}>
          <button
            aria-current="true"
            type="button"
            class="
          text-left
          px-2
          py-2
          border-b border-gray-200
          w-full
          hover:bg-gray-200 hover:text-gray-500
          focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
          transition
          duration-500
          cursor-pointer
      "
          >
            Odlaw
          </button>
        </li>
        <li className="bg-white border border-gray-200 w-24 text-gray-900" key={uuidv4()}>
          <button
            aria-current="true"
            type="button"
            class="
          text-left
          px-2
          py-2
          border-b border-gray-200
          w-full
          hover:bg-gray-200 hover:text-gray-500
          focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
          transition
          duration-500
          cursor-pointer
      "
          >
            Wizard Whitebeard
          </button>
        </li>
        <li className="bg-white border border-gray-200 w-24 text-gray-900" key={uuidv4()}>
          <button
            aria-current="true"
            type="button"
            class="
          text-left
          px-2
          py-2
          border-b border-gray-200
          w-full
          hover:bg-gray-200 hover:text-gray-500
          focus:outline-none focus:ring-0 focus:bg-gray-200 focus:text-gray-600
          transition
          duration-500
          cursor-pointer
      "
          >
            Wilma
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CharList;
