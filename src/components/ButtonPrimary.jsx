import { FaPlus } from "react-icons/fa";

export default function ButtonPrimary({ text }) {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-xl shadow-lg shadow-pink-100 text-xs font-bold hover:bg-pink-600 transition-all active:scale-95 cursor-pointer">
      <FaPlus /> {text}
    </button>
  );
}