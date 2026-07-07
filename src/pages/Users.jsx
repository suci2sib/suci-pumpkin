import { useState, useEffect } from "react";
import { FaUserPlus, FaTimes, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = "https://bejbfpuztkzeichehrqt.supabase.co/rest/v1/users";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamJmcHV6dGt6ZWljaGVocnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjkwODgsImV4cCI6MjA5NzAwNTA4OH0.qeWd5DVWYx3s0fggOxpP_EcCJCcnOb7dJ6DMAasmvCw";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  // Fetch data users dari Supabase
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { headers });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create User
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Semua field harus diisi!");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, formData, { headers });
      if (response.data && response.data.length > 0) {
        setUsers([...users, response.data[0]]);
        setFormData({ name: "", email: "", password: "" });
        setShowFormModal(false);
        alert("User berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Gagal menambahkan user!");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus user ini?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}?id=eq.${userId}`, { headers });
      setUsers(users.filter(u => u.id !== userId));
      alert("User berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Gagal menghapus user!");
    }
  };

  const stats = [
    { label: "Total Users", value: users.length, icon: "👥", color: "bg-pink-500" },
    { label: "Active Users", value: users.length, icon: "✅", color: "bg-emerald-400" },
    { label: "Admin Staff", value: users.length, icon: "👨‍💼", color: "bg-blue-500" },
  ];

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">User Management</h1>
            <p className="text-gray-400 text-sm font-medium">Manage admin staff & system users</p>
          </div>
          <button 
            onClick={() => setShowFormModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all active:scale-95"
          >
            <FaUserPlus /> New User
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
              <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md text-xl`}>
                {item.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">{item.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin">⏳</div>
              <p className="text-gray-400 mt-4 font-semibold">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 font-semibold">No users found</p>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="pl-6 pb-2">Name</th>
                  <th className="pb-2">Email</th>
                  <th className="pb-2">Password</th>
                  <th className="pb-2 text-center">Created</th>
                  <th className="pb-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="group transition-all">
                    <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black">
                          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 leading-tight">{user.name || "N/A"}</p>
                          <p className="text-[10px] text-gray-400 font-black">#{user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-600 text-sm font-medium">
                      {user.email}
                    </td>
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-400 text-sm font-mono">
                      ••••••••
                    </td>
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-center text-gray-500 text-sm">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString("id-ID") : "N/A"}
                    </td>
                    <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 text-center">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="text-pink-500 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-pink-100 hover:bg-pink-500 hover:text-white transition-all"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-500 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Detail User */}
      {selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 relative">
            <button 
              onClick={() => setSelectedUser(null)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-pink-100 text-pink-500 rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4">
                {selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "?"}
              </div>
              <h2 className="text-2xl font-black text-gray-900">{selectedUser.name || "Unknown User"}</h2>
              <p className="text-sm text-gray-400 mt-2">ID: {selectedUser.id}</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</p>
                <p className="text-sm font-semibold text-gray-800">{selectedUser.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Created</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedUser.created_at 
                    ? new Date(selectedUser.created_at).toLocaleDateString("id-ID", { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedUser(null)} 
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Form Create User */}
      {showFormModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative">
            <button 
              onClick={() => setShowFormModal(false)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-2">Add New User</h2>
            <p className="text-sm text-gray-400 mb-6">Tambahkan user admin baru ke sistem</p>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Masukkan nama user"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="user@example.com"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Password</label>
                <input 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Masukkan password"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowFormModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 font-black py-3 rounded-xl hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-pink-500 text-white font-black py-3 rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
