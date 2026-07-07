import { useState, useEffect } from "react";
import { FaShoppingCart, FaCheckCircle, FaBan, FaDollarSign, FaPlus, FaEye, FaTimes, FaSync } from "react-icons/fa";
import { authAPI } from "../services/authAPI";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch orders dari Supabase
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await authAPI.getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Auto refresh setiap 3 detik untuk real-time effect
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await authAPI.updateOrder(orderId, { status: newStatus });
      fetchOrders();
      alert("Status order berhasil diubah!");
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Gagal mengubah status!");
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      "Pending": "bg-yellow-100 text-yellow-600",
      "Processing": "bg-blue-100 text-blue-600",
      "Completed": "bg-emerald-100 text-emerald-600",
      "Cancelled": "bg-red-100 text-red-600"
    };
    return colors[status] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Laundry Orders</h1>
            <p className="text-gray-400 text-sm font-medium">Track your customer laundry process (Real-time from Supabase)</p>
          </div>
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all disabled:opacity-50"
          >
            <FaSync className={refreshing ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin">⏳</div>
              <p className="text-gray-400 mt-4 font-semibold">Loading orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 font-semibold">Belum ada order masuk</p>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-4">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="pl-6 pb-2">Order ID</th>
                  <th className="pb-2">Customer</th>
                  <th className="pb-2">Service</th>
                  <th className="pb-2">Weight (Kg)</th>
                  <th className="pb-2 text-center">Status</th>
                  <th className="pb-2">Total</th>
                  <th className="pb-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="group">
                    <td className="py-5 pl-6 font-black text-pink-500 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50">#{order.id}</td>
                    <td className="py-5 font-bold text-gray-800 bg-gray-50 group-hover:bg-pink-50">{order.customer_name}</td>
                    <td className="py-5 text-gray-500 bg-gray-50 group-hover:bg-pink-50 text-sm">{order.service_type}</td>
                    <td className="py-5 text-gray-600 bg-gray-50 group-hover:bg-pink-50 font-semibold">{order.weight} Kg</td>
                    <td className="py-5 bg-gray-50 group-hover:bg-pink-50 text-center">
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-5 font-black text-gray-900 bg-gray-50 group-hover:bg-pink-50">Rp {order.total_price?.toLocaleString('id-ID') || 0}</td>
                    <td className="py-5 pr-6 text-center bg-gray-50 rounded-r-2xl group-hover:bg-pink-50">
                      <button onClick={() => setSelectedOrder(order)} className="p-2.5 bg-white text-gray-400 rounded-xl hover:text-pink-500 shadow-sm transition-all">
                        <FaEye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Detail Order */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative">
            <button 
              onClick={() => setSelectedOrder(null)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-6">Order Detail</h2>

            <div className="space-y-4 mb-8">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="text-sm font-semibold text-gray-800">#{selectedOrder.id}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</p>
                <p className="text-sm font-semibold text-gray-800">{selectedOrder.customer_name}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Service</p>
                <p className="text-sm font-semibold text-gray-800">{selectedOrder.service_type}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Weight</p>
                <p className="text-sm font-semibold text-gray-800">{selectedOrder.weight} Kg</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Price</p>
                <p className="text-sm font-semibold text-gray-800">Rp {selectedOrder.total_price?.toLocaleString('id-ID') || 0}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Change Status</p>
                <div className="flex gap-2">
                  {["Pending", "Processing", "Completed", "Cancelled"].map((status) => (
                    <button 
                      key={status}
                      onClick={() => handleStatusChange(selectedOrder.id, status)}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                        selectedOrder.status === status 
                          ? "bg-pink-500 text-white" 
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSelectedOrder(null)} 
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}