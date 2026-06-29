import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginMember() {
  const navigate = useNavigate();
  const [noHp, setNoHp] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Autentikasi member di sini
    // Setelah sukses, arahkan langsung ke halaman member tingkatan tingkatan tier
    navigate("/halaman-member"); 
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-black text-gray-900 text-center">Login Portal <span className="text-pink-500">Member</span></h2>
        <p className="text-gray-400 text-xs text-center mt-1">Masuk untuk melihat status kasta kupon & diskon Anda</p>
        
        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nomor WhatsApp Member</label>
            <input type="tel" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" placeholder="081234xxxx" onChange={e => setNoHp(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Password</label>
            <input type="password" required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" placeholder="••••••••" />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all mt-2">
            Masuk Ke Halaman Member
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-5">
          Belum bergabung member? <Link to="/register-member" className="text-pink-500 font-bold hover:underline">Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
}