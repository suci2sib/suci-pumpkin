import { useState } from "react";
import { FaShoppingCart, FaCheckCircle, FaBan, FaDollarSign, FaPlus, FaEye, FaTimes } from "react-icons/fa";
import { ordersData } from "../data/mockData";

export default function Orders() {
  const [orders] = useState(ordersData);
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Laundry Orders</h1>
            <p className="text-gray-400 text-sm font-medium">Track your customer laundry process</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all">
            <FaPlus /> Add New Order
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
          <table className="w-full text-left border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                <th className="pl-6 pb-2">Order ID</th>
                <th className="pb-2">Customer</th>
                <th className="pb-2">Service</th>
                <th className="pb-2 text-center">Status</th>
                <th className="pb-2">Total</th>
                <th className="pb-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="group">
                  <td className="py-5 pl-6 font-black text-pink-500 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50">#{order.id}</td>
                  <td className="py-5 font-bold text-gray-800 bg-gray-50 group-hover:bg-pink-50">{order.customerName}</td>
                  <td className="py-5 text-gray-500 bg-gray-50 group-hover:bg-pink-50">{order.serviceType}</td>
                  <td className="py-5 bg-gray-50 group-hover:bg-pink-50 text-center">
                    <span className="px-4 py-1.5 rounded-xl text-[10px] font-black uppercase bg-emerald-100 text-emerald-600">{order.status}</span>
                  </td>
                  <td className="py-5 font-black text-gray-900 bg-gray-50 group-hover:bg-pink-50">${order.totalPrice}</td>
                  <td className="py-5 pr-6 text-center bg-gray-50 rounded-r-2xl group-hover:bg-pink-50">
                    <button onClick={() => setSelectedOrder(order)} className="p-2.5 bg-white text-gray-400 rounded-xl hover:text-pink-500 shadow-sm transition-all">
                      <FaEye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}