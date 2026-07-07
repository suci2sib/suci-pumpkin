import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdReceipt,
  MdPeople,
  MdError,
  MdLock,
  MdBlock,
  MdAdd,
  MdShoppingBag,
  MdAnalytics,
  MdPerson, // Untuk menu Users
} from "react-icons/md";

export default function Sidebar() {
  // Style untuk menu yang sedang aktif
  const activeClass =
    "flex items-center px-6 py-3 text-pink-600 bg-pink-50 border-r-4 border-pink-500 font-bold transition-all";

  // Style untuk menu biasa (tidak aktif)
  const inactiveClass =
    "flex items-center px-6 py-3 text-gray-400 hover:text-pink-500 hover:bg-gray-50 transition-all font-medium";

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-100 flex flex-col z-50">
      {/* Brand Logo Uci Laundry */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center text-white shadow-lg shadow-pink-200">
          <MdDashboard size={20} />
        </div>
        <span className="text-xl font-black text-gray-800 tracking-tight">
          Uci Laundry
        </span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1">
        {/* Dashboard */}
        {/* Dashboard */}
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdDashboard className="mr-3" size={22} /> Dashboard
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdReceipt className="mr-3" size={22} /> Orders
        </NavLink>

        {/* Customers */}
        <NavLink
          to="/customers"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdPeople className="mr-3" size={22} /> Customers
        </NavLink>

        {/* Products */}
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdShoppingBag className="mr-3" size={22} /> Products
        </NavLink>

        {/* 2. Tambahan Menu Baru: Fitur CRM */}
        <NavLink
          to="/fitur-crm"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdAnalytics className="mr-3" size={22} /> Laundry Control
        </NavLink>

        {/* Users */}
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdPerson className="mr-3" size={22} /> Users
        </NavLink>

        {/* Section Error Tests */}
        <div className="pt-10 px-6 pb-2">
          <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
            Error Tests
          </span>
        </div>

        <NavLink
          to="/400"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdError className="mr-3" size={20} /> Error 400
        </NavLink>

        <NavLink
          to="/401"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdLock className="mr-3" size={20} /> Error 401
        </NavLink>

        <NavLink
          to="/403"
          className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
        >
          <MdBlock className="mr-3" size={20} /> Error 403
        </NavLink>
      </nav>

      {/* Footer / Upgrade Section */}
      <div className="p-6">
        <div className="bg-pink-50 p-4 rounded-2xl border border-pink-100 text-center">
          <p className="text-[10px] font-bold text-pink-400 uppercase mb-3">
            v4.0 Premium
          </p>
          <button className="w-full py-2.5 bg-pink-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-100 hover:bg-pink-600 transition-all flex items-center justify-center gap-2">
            <MdAdd size={16} /> Add Dashlet
          </button>
        </div>
      </div>
    </div>
  );
}
