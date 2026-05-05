import { FaSearch, FaBell, FaQuestionCircle, FaCog } from "react-icons/fa";

export default function Header() {
  return (
    <div className="h-20 bg-white/80 backdrop-blur-md sticky top-0 flex items-center justify-between px-10 z-40 border-b border-gray-50">
      {/* Search Section */}
      <div className="relative w-72 group">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-pink-400 transition-colors" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="w-full py-2 pl-12 pr-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-pink-100 transition-all outline-none"
        />
      </div>

      {/* Right Icons & Profile */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 text-gray-400 border-r pr-6 border-gray-100">
          <FaQuestionCircle className="cursor-pointer hover:text-pink-500 transition-colors" />
          <div className="relative cursor-pointer">
            <FaBell className="hover:text-pink-500 transition-colors" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
          </div>
          <FaCog className="cursor-pointer hover:text-pink-500 transition-colors" />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800">Suci Ramadani</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Admin</p>
          </div>
          <img 
            src="/img/fotoucii.jpeg" 
            className="w-10 h-10 rounded-full border-2 border-pink-100 object-cover shadow-sm"
            alt="profile"
            onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=Suci&background=ec4899&color=fff"}
          />
        </div>
      </div>
    </div>
  );
}