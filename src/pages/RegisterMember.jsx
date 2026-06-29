import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: "", noHp: "", password: "" });

  const handleRegister = (e) => {
    e.preventDefault();
    // Proses simpan data member ke database/API Anda di sini
    alert("Pendaftaran Member Berhasil! 🎉 Silakan Login.");
    navigate("/login-member"); // Lempar ke halaman login member
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-black text-gray-900 text-center">Gabung Member <span className="text-pink-500">UciLaundry</span></h2>
        <p className="text-gray-400 text-xs text-center mt-1">Dapatkan diskon Platinum, Gold, & Silver tiap kali cuci!</p>
        
        <form onSubmit={handleRegister} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nama Lengkap</label>
            <input type="text" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" placeholder="Masukkan nama Anda" onChange={e => setFormData({...formData, nama: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nomor WhatsApp</label>
            <input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" placeholder="Contoh: 08123456xxx" onChange={e => setFormData({...formData, noHp: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Password Akun</label>
            <input type="password" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" placeholder="Buat password aman" onChange={e => setFormData({...formData, password: e.target.value})} />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all mt-2">
            Daftar Member Sekarang
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-5">
          Sudah punya member? <Link to="/login-member" className="text-pink-500 font-bold hover:underline">Login di sini</Link>
        </p>
      </div>
    </div>
  );
}