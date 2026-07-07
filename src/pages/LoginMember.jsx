import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import { authAPI } from "../services/authAPI";

export default function LoginMember() {
  const navigate = useNavigate();
  const [noHp, setNoHp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!noHp || !password) {
      setError("Nomor WhatsApp dan password harus diisi!");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Login member dari Supabase
      const members = await authAPI.loginMember(noHp, password);

      if (members && members.length > 0) {
        // Simpan data member ke localStorage
        const member = members[0];
        localStorage.setItem("member_auth", JSON.stringify(member));
        
        setTimeout(() => { 
          navigate("/halaman-member"); 
          setLoading(false); 
        }, 500);
      } else {
        setError("Nomor WhatsApp atau Password salah!");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login!");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-5">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-black text-gray-900 text-center">Login Portal <span className="text-pink-500">Member</span></h2>
        <p className="text-gray-400 text-xs text-center mt-1">Masuk untuk melihat status kasta kupon & diskon Anda</p>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nomor WhatsApp Member</label>
            <input 
              type="tel" 
              required 
              value={noHp}
              onChange={e => setNoHp(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" 
              placeholder="081234xxxx" 
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-pink-500" 
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-pink-500 text-white font-bold rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all mt-2 flex justify-center items-center disabled:opacity-50"
          >
            {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Masuk Ke Halaman Member"}
          </button>
        </form>
        
        <p className="text-xs text-center text-gray-400 mt-5">
          Belum bergabung member? <Link to="/register-member" className="text-pink-500 font-bold hover:underline">Daftar Sekarang</Link>
        </p>
      </div>
    </div>
  );
}