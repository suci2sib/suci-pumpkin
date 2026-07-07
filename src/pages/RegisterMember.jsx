import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { authAPI } from "../services/authAPI";

export default function RegisterMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: "", no_hp: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!formData.nama || !formData.no_hp || !formData.password) {
      setError("Semua field harus diisi!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Cek apakah nomor HP sudah terdaftar
      const existing = await authAPI.getMemberByPhone(formData.no_hp);
      if (existing && existing.length > 0) {
        setError("Nomor WhatsApp ini sudah terdaftar!");
        setLoading(false);
        return;
      }

      // Register member baru
      const newMember = {
        nama: formData.nama,
        no_hp: formData.no_hp,
        password: formData.password,
        tier: "Silver", // Default tier untuk member baru
        poin: 0
      };

      await authAPI.registerMember(newMember);
      alert("Pendaftaran Member Berhasil! 🎉 Silakan Login.");
      navigate("/login-member");
    } catch (err) {
      setError("Gagal mendaftar! Coba lagi.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-black text-gray-900 text-center">Gabung Member <span className="text-pink-500">UciLaundry</span></h2>
        <p className="text-gray-400 text-xs text-center mt-1">Dapatkan diskon Platinum, Gold, & Silver tiap kali cuci!</p>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nama Lengkap</label>
            <input 
              type="text" 
              required 
              value={formData.nama}
              onChange={e => setFormData({...formData, nama: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" 
              placeholder="Masukkan nama Anda" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nomor WhatsApp</label>
            <input 
              type="tel" 
              required 
              value={formData.no_hp}
              onChange={e => setFormData({...formData, no_hp: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" 
              placeholder="Contoh: 08123456xxx" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Password Akun</label>
            <input 
              type="password" 
              required 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" 
              placeholder="Buat password aman" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all mt-2 flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Daftar Member Sekarang"}
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-5">
          Sudah punya member? <Link to="/login-member" className="text-pink-500 font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}