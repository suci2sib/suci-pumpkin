import { useState } from "react";
import { FaUserPlus, FaGem, FaEllipsisV, FaDollarSign, FaUserFriends, FaTimes } from "react-icons/fa";
import { customersData } from "../data/mockData";

export default function Customers() {
  const [customers] = useState(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const stats = [
    { label: "Total Members", value: "1,250", icon: <FaUserFriends />, color: "bg-pink-500" },
    { label: "Churn Rate", value: "0.8%", icon: <FaGem />, color: "bg-emerald-400" },
    { label: "Avg Spend", value: "$42", icon: <FaDollarSign />, color: "bg-pink-500" },
  ];

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Customer Database</h1>
            <p className="text-gray-400 text-sm font-medium">Manage your laundry members</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all active:scale-95">
            <FaUserPlus /> New Member
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
              <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md`}>{item.icon}</div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">{item.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="pl-6 pb-2">Profile</th>
                <th className="pb-2">Contact</th>
                <th className="pb-2 text-center">Loyalty</th>
                <th className="pb-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user.id} className="group transition-all">
                  <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black">{user.name.charAt(0)}</div>
                        <div>
                            <p className="font-bold text-gray-800 leading-tight">{user.name}</p>
                            <p className="text-[10px] text-gray-400 font-black">#{user.id}</p>
                        </div>
                    </div>
                  </td>
                  <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-500 text-sm">{user.phone}</td>
                  <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-center">
                    <span className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase bg-pink-100 text-pink-600">{user.loyalty}</span>
                  </td>
                  <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 text-center">
                    <button onClick={() => setSelectedCustomer(user)} className="text-pink-500 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-pink-100 hover:bg-pink-500 hover:text-white transition-all">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 relative text-center">
            <button onClick={() => setSelectedCustomer(null)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500"><FaTimes /></button>
            <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4">{selectedCustomer.name.charAt(0)}</div>
            <h2 className="text-2xl font-black text-gray-900">{selectedCustomer.name}</h2>
            <button onClick={() => setSelectedCustomer(null)} className="w-full mt-8 bg-gray-900 text-white font-black py-4 rounded-2xl">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}