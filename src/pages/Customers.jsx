import { useState } from "react";
import { FaUserPlus, FaGem, FaPhoneAlt, FaEye, FaTimes, FaUserCircle, FaEllipsisV, FaDollarSign, FaShoppingCart, FaUserFriends } from "react-icons/fa";
import { customersData } from "../data/mockData";

export default function Customers() {
  const [customers, setCustomers] = useState(customersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomer, setNewCustomer] = useState({ name: "", phone: "", preferredService: "Wash & Fold", loyalty: "Bronze" });

  const stats = [
    { id: "new", label: "New Members", value: "24", icon: <FaUserPlus />, color: "bg-pink-500" },
    { id: "active", label: "Total Members", value: "1,250", icon: <FaUserFriends />, color: "bg-pink-500" },
    { id: "churn", label: "Churn Rate", value: "0.8%", icon: <FaGem />, color: "bg-emerald-400" },
    { id: "avg", label: "Avg Spend", value: "$42", icon: <FaDollarSign />, color: "bg-pink-500" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const dataBaru = { ...newCustomer, id: (customers.length + 1).toString() };
    setCustomers([dataBaru, ...customers]);
    setShowModal(false);
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-10 ml-64 font-sans relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Customer Database</h1>
          <p className="text-gray-400 text-sm font-medium">Manage your loyalty program and member data</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-100 text-sm font-bold hover:bg-pink-600 transition-all active:scale-95"
        >
          <FaUserPlus /> New Member
        </button>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {stats.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
            <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg shadow-md`}>{item.icon}</div>
            <div>
              <p className="text-2xl font-black text-gray-800 leading-none">{item.value}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOMER TABLE */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
        <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="font-black text-gray-800">Member List</h3>
            <FaEllipsisV className="text-gray-300" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="pl-6 pb-2">Profile</th>
                <th className="pb-2">Contact</th>
                <th className="pb-2">Service Pref</th>
                <th className="pb-2 text-center">Loyalty</th>
                <th className="pb-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((user) => (
                <tr key={user.id} className="group transition-all">
                  <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black text-xs uppercase">{user.name.charAt(0)}</div>
                        <div>
                            <p className="font-bold text-gray-800 leading-tight">{user.name}</p>
                            <p className="text-[10px] text-gray-400 font-black">#{user.id}</p>
                        </div>
                    </div>
                  </td>
                  <td className="py-4 bg-gray-50 group-hover:bg-pink-50 transition-colors text-gray-500 text-sm font-medium">
                    {user.phone}
                  </td>
                  <td className="py-4 bg-gray-50 group-hover:bg-pink-50 transition-colors text-gray-700 font-bold text-sm">
                    {user.preferredService}
                  </td>
                  <td className="py-4 bg-gray-50 group-hover:bg-pink-50 transition-colors text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                      user.loyalty === 'Gold' ? 'bg-orange-100 text-orange-600' : 
                      user.loyalty === 'Silver' ? 'bg-blue-50 text-blue-500' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {user.loyalty}
                    </span>
                  </td>
                  <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 transition-colors text-center relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedCustomer(user); }}
                      className="relative z-20 text-pink-500 font-black text-[10px] uppercase hover:bg-pink-500 hover:text-white px-3 py-1.5 rounded-lg border border-pink-100 transition-all active:scale-90"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: DETAIL CUSTOMER */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl relative text-center">
            <button onClick={() => setSelectedCustomer(null)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500"><FaTimes /></button>
            <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4 border-4 border-white shadow-lg">
              {selectedCustomer.name.charAt(0)}
            </div>
            <h2 className="text-2xl font-black text-gray-900 leading-tight">{selectedCustomer.name}</h2>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 mb-8">Premium Member</p>
            <div className="bg-gray-50 rounded-3xl p-6 text-left space-y-4 border border-gray-100">
                <div className="flex justify-between border-b pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Phone</span><span className="font-bold text-gray-700">{selectedCustomer.phone}</span></div>
                <div className="flex justify-between border-b pb-3"><span className="text-[10px] font-black text-gray-400 uppercase">Service</span><span className="font-bold text-gray-700">{selectedCustomer.preferredService}</span></div>
                <div className="flex justify-between"><span className="text-[10px] font-black text-gray-400 uppercase">Loyalty</span><span className="font-black text-pink-500">{selectedCustomer.loyalty}</span></div>
            </div>
            <button onClick={() => setSelectedCustomer(null)} className="w-full mt-8 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all">Close Profile</button>
          </div>
        </div>
      )}
    </div>
  );
}