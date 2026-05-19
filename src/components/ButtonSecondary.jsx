import { FaDownload } from "react-icons/fa";

export default function ButtonSecondary({ text }) {
  return (
    <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 rounded-xl shadow-sm text-xs font-bold border border-gray-100 hover:bg-gray-50 transition-all cursor-pointer">
      <FaDownload /> {text}
    </button>
  );
}