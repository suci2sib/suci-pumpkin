import { useState } from "react";
import { FaShoppingCart, FaCheckCircle, FaBan, FaDollarSign, FaPlus, FaTimes, FaEye, FaEllipsisV } from "react-icons/fa";
import { ordersData } from "../data/mockData";

export default function Orders() {
  const [orders, setOrders] = useState(ordersData);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ 
    customerName: "", 
    serviceType: "Wash & Fold", 
    weight: "", 
    pickupDate: "", 
    totalPrice: "", 
    status: "Pending" 
  });

  const stats = [
    { id: "loads", label: "Total Laundry Loads", value: "75", icon: <FaShoppingCart />, color: "bg-pink-500" },
    { id: "completed", label: "Services Completed", value: "357", icon: <FaCheckCircle />, color: "bg-pink-500" },
    { id: "canceled", label: "Canceled Orders", value: "65", icon: <FaBan />, color: "bg-red-400" },
    { id: "revenue", label: "Monthly Revenue", value: "$128", icon: <FaDollarSign />, color: "bg-pink-500" },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    const dataBaru = { ...newOrder, id: (orders.length + 1).toString() };
    setOrders([dataBaru, ...orders]);
    setShowModal(false);
    setNewOrder({ customerName: "", serviceType: "Wash & Fold", weight: "", pickupDate: "", totalPrice: "", status: "Pending" });
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-10 ml-64 font-sans relative">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-black text-gray-900 mb-1">Laundry Orders</h1>
          <p className="text-gray-400 text-sm font-medium">Manage and track your customer laundry process</p>
        </div>
        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg shadow-pink-100 text-sm font-bold hover:bg-pink-600 transition-all active:scale-95"
        >
          <FaPlus /> Add New Order
        </button>
      </div>

      {/* STATS CARDS */}
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

      {/* DATA TABLE */}
      <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
        <div className="flex justify-between items-center mb-8 px-2">
            <h3 className="font-black text-gray-800">Recent Transactions</h3>
            <FaEllipsisV className="text-gray-300 cursor-pointer" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="pl-6 pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Service</th>
                <th className="pb-2">Weight</th>
                <th className="pb-2 text-center">Status</th>
                <th className="pb-2">Total</th>
                <th className="pb-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="group transition-all">
                  <td className="py-5 pl-6 font-black text-pink-500 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">#{order.id}</td>
                  <td className="py-5 font-bold text-gray-800 bg-gray-50 group-hover:bg-pink-50">{order.customerName}</td>
                  <td className="py-5 text-gray-500 font-medium bg-gray-50 group-hover:bg-pink-50">{order.serviceType}</td>
                  <td className="py-5 font-bold text-gray-800 bg-gray-50 group-hover:bg-pink-50">{order.weight} kg</td>
                  <td className="py-5 bg-gray-50 group-hover:bg-pink-50 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${
                      order.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 
                      order.status === 'Pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 font-black text-gray-900 bg-gray-50 group-hover:bg-pink-50">${order.totalPrice}</td>
                  <td className="py-5 pr-6 text-center bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 transition-all relative">
                    <button 
                      onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }} 
                      className="relative z-20 p-2.5 bg-white text-gray-400 rounded-xl hover:text-pink-500 shadow-sm transition-all active:scale-90"
                    >
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: ADD ORDER */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors"><FaTimes /></button>
            <h2 className="text-2xl font-black text-gray-800 mb-2">New Order</h2>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">Uci Laundry System</p>
            <form onSubmit={handleSave} className="space-y-4">
              <input required type="text" placeholder="Customer Name" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pink-200 outline-none" onChange={(e) => setNewOrder({...newOrder, customerName: e.target.value})} />
              <select className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pink-200 outline-none" onChange={(e) => setNewOrder({...newOrder, serviceType: e.target.value})}>
                <option>Wash & Fold</option><option>Dry Clean</option><option>Ironing Only</option>
              </select>
              <div className="grid grid-cols-2 gap-4">
                <input required type="number" placeholder="Weight (kg)" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pink-200" onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})} />
                <input required type="date" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pink-200 text-gray-400" onChange={(e) => setNewOrder({...newOrder, pickupDate: e.target.value})} />
              </div>
              <input required type="number" placeholder="Total Price ($)" className="w-full bg-gray-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-pink-200 outline-none" onChange={(e) => setNewOrder({...newOrder, totalPrice: e.target.value})} />
              <button type="submit" className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100 mt-4 hover:bg-pink-600 transition-all">Save Transaction</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: DETAIL ORDER */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 shadow-2xl relative text-center">
            <div className="w-16 h-16 bg-pink-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-100">
                <FaShoppingCart size={24}/>
            </div>
            <h2 className="text-xl font-black text-gray-900 leading-none">Order #{selectedOrder.id}</h2>
            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2 mb-8">Detailed Invoice</p>
            <div className="space-y-4 text-left bg-gray-50 p-6 rounded-3xl border border-gray-100">
                <div className="flex justify-between border-b pb-2"><span className="text-[10px] font-black text-gray-400 uppercase">Customer</span><span className="font-bold text-gray-800">{selectedOrder.customerName}</span></div>
                <div className="flex justify-between border-b pb-2"><span className="text-[10px] font-black text-gray-400 uppercase">Service</span><span className="font-bold text-gray-800">{selectedOrder.serviceType}</span></div>
                <div className="flex justify-between"><span className="text-[10px] font-black text-gray-400 uppercase">Total Amount</span><span className="font-black text-pink-500">${selectedOrder.totalPrice}</span></div>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="w-full mt-8 bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}