import { useState, useEffect } from "react";
import { FaUserPlus, FaTimes, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = "https://bejbfpuztkzeichehrqt.supabase.co/rest/v1/members";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamJmcHV6dGt6ZWljaGVocnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjkwODgsImV4cCI6MjA5NzAwNTA4OH0.qeWd5DVWYx3s0fggOxpP_EcCJCcnOb7dJ6DMAasmvCw";

const headers = {
  apikey: API_KEY,
  Authorization: `Bearer ${API_KEY}`,
  "Content-Type": "application/json",
  "Prefer": "return=representation"
};

const tierConfig = {
  Platinum: { color: "bg-indigo-500", textColor: "text-indigo-600", bgLight: "bg-indigo-50" },
  Gold: { color: "bg-amber-500", textColor: "text-amber-600", bgLight: "bg-amber-50" },
  Silver: { color: "bg-gray-500", textColor: "text-gray-600", bgLight: "bg-gray-50" }
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formData, setFormData] = useState({ 
    nama: "", 
    no_hp: "", 
    password: "", 
    tier: "Silver",
    poin: 0
  });
  const [submitting, setSubmitting] = useState(false);

  // Fetch data members dari Supabase
  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, { headers });
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // Create Member
  const handleCreateMember = async (e) => {
    e.preventDefault();
    if (!formData.nama || !formData.no_hp || !formData.password) {
      alert("Nama, nomor HP, dan password harus diisi!");
      return;
    }

    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, formData, { headers });
      if (response.data && response.data.length > 0) {
        setMembers([...members, response.data[0]]);
        setFormData({ nama: "", no_hp: "", password: "", tier: "Silver", poin: 0 });
        setShowFormModal(false);
        alert("Member berhasil ditambahkan!");
      }
    } catch (error) {
      console.error("Error creating member:", error);
      alert("Gagal menambahkan member! (Mungkin nomor HP sudah terdaftar)");
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Member
  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus member ini?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}?id=eq.${memberId}`, { headers });
      setMembers(members.filter(m => m.id !== memberId));
      alert("Member berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Gagal menghapus member!");
    }
  };

  // Count by tier
  const silverCount = members.filter(m => m.tier === "Silver").length;
  const goldCount = members.filter(m => m.tier === "Gold").length;
  const platinumCount = members.filter(m => m.tier === "Platinum").length;

  const stats = [
    { label: "Total Members", value: members.length, icon: "👥", color: "bg-pink-500" },
    { label: "Silver Tier", value: silverCount, icon: "🥈", color: "bg-gray-400" },
    { label: "Gold Tier", value: goldCount, icon: "🥇", color: "bg-amber-500" },
  ];

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Member Management</h1>
            <p className="text-gray-400 text-sm font-medium">Manage customer members & their tier levels</p>
          </div>
          <button 
            onClick={() => setShowFormModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all active:scale-95"
          >
            <FaUserPlus /> New Member
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
              <p className="text-gray-400 mt-4 font-semibold">Loading members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-400 font-semibold">No members found</p>
            </div>
          ) : (
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="pl-6 pb-2">Nama</th>
                  <th className="pb-2">No HP</th>
                  <th className="pb-2">Tier</th>
                  <th className="pb-2 text-center">Poin</th>
                  <th className="pb-2 text-center">Created</th>
                  <th className="pb-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => {
                  const tier = member.tier || "Silver";
                  const config = tierConfig[tier];
                  return (
                    <tr key={member.id} className="group transition-all">
                      <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black">
                            {member.nama ? member.nama.charAt(0).toUpperCase() : "?"}
                          </div>
                          <div>
                            <p className="font-bold text-gray-800 leading-tight">{member.nama || "N/A"}</p>
                            <p className="text-[10px] text-gray-400 font-black">#{member.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-600 text-sm font-medium">
                        {member.no_hp}
                      </td>
                      <td className="py-4 bg-gray-50 group-hover:bg-pink-50">
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 ${config.bgLight} ${config.textColor} text-[10px] font-black rounded-lg`}>
                          {tier === "Platinum" && "💎"}
                          {tier === "Gold" && "🏅"}
                          {tier === "Silver" && "⭐"}
                          {tier}
                        </span>
                      </td>
                      <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-center text-gray-800 text-sm font-bold">
                        {member.poin || 0}
                      </td>
                      <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-center text-gray-500 text-sm">
                        {member.created_at ? new Date(member.created_at).toLocaleDateString("id-ID") : "N/A"}
                      </td>
                      <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 text-center">
                        <div className="flex justify-center gap-2">
                          <button 
                            onClick={() => setSelectedMember(member)}
                            className="text-pink-500 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-pink-100 hover:bg-pink-500 hover:text-white transition-all"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleDeleteMember(member.id)}
                            className="text-red-500 font-black text-[10px] uppercase px-3 py-1.5 rounded-lg border border-red-100 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modal Detail Member */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-10 relative">
            <button 
              onClick={() => setSelectedMember(null)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>
            
            <div className="text-center mb-6">
              <div className={`w-20 h-20 ${tierConfig[selectedMember.tier]?.bgLight || "bg-gray-50"} ${tierConfig[selectedMember.tier]?.textColor || "text-gray-600"} rounded-[2rem] flex items-center justify-center text-3xl font-black mx-auto mb-4`}>
                {selectedMember.nama ? selectedMember.nama.charAt(0).toUpperCase() : "?"}
              </div>
              <h2 className="text-2xl font-black text-gray-900">{selectedMember.nama || "Unknown Member"}</h2>
              <p className="text-sm text-gray-400 mt-2">ID: {selectedMember.id}</p>
            </div>

            <div className="space-y-3 mb-8 text-left">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor HP</p>
                <p className="text-sm font-semibold text-gray-800">{selectedMember.no_hp}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tier</p>
                <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                  {selectedMember.tier === "Platinum" && "💎"}
                  {selectedMember.tier === "Gold" && "🏅"}
                  {selectedMember.tier === "Silver" && "⭐"}
                  {selectedMember.tier || "Silver"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Poin</p>
                <p className="text-sm font-semibold text-gray-800">{selectedMember.poin || 0} Poin</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Terdaftar Sejak</p>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedMember.created_at 
                    ? new Date(selectedMember.created_at).toLocaleDateString("id-ID", { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })
                    : "N/A"}
                </p>
              </div>
            </div>

            <button 
              onClick={() => setSelectedMember(null)} 
              className="w-full bg-gray-900 text-white font-black py-4 rounded-2xl hover:bg-gray-800 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal Form Create Member */}
      {showFormModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative">
            <button 
              onClick={() => setShowFormModal(false)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-2">Add New Member</h2>
            <p className="text-sm text-gray-400 mb-6">Tambahkan member laundry baru ke sistem</p>

            <form onSubmit={handleCreateMember} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={formData.nama}
                  onChange={(e) => setFormData({...formData, nama: e.target.value})}
                  placeholder="Masukkan nama member"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nomor HP</label>
                <input 
                  type="tel" 
                  value={formData.no_hp}
                  onChange={(e) => setFormData({...formData, no_hp: e.target.value})}
                  placeholder="08xxxxxxxxxx"
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

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tier</label>
                <select 
                  value={formData.tier}
                  onChange={(e) => setFormData({...formData, tier: e.target.value})}
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                >
                  <option value="Silver">⭐ Silver</option>
                  <option value="Gold">🏅 Gold</option>
                  <option value="Platinum">💎 Platinum</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Poin Awal</label>
                <input 
                  type="number" 
                  value={formData.poin}
                  onChange={(e) => setFormData({...formData, poin: parseInt(e.target.value) || 0})}
                  placeholder="0"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  min="0"
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
                  {submitting ? "Creating..." : "Add Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
