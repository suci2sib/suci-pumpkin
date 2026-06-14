import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/authAPI"; // Pastikan path import sesuai struktur foldermu
import { ImSpinner2 } from "react-icons/im";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", confirmPassword: "" });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
        return alert("Password mismatch!");
    }
    
    setLoading(true);

    try {
      // 🟢 PERBAIKAN: Ubah properti pengiriman menjadi "name" agar sesuai dengan Supabase
      await authAPI.registerUser({
        name: formData.fullName, 
        email: formData.email,
        password: formData.password
      });
      
      alert("Register Berhasil! Silakan Login.");
      navigate("/login");
    } catch (error) {
      alert("Gagal mendaftar. Pastikan server terhubung.");
      console.error("Register error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-3xl font-black text-gray-800 mb-8">Create Account</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input required name="fullName" placeholder="Full Name" onChange={(e) => setFormData({...formData, fullName: e.target.value})}
          className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
        <input required name="email" type="email" placeholder="Email Address" onChange={(e) => setFormData({...formData, email: e.target.value})}
          className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
        <input required name="password" type="password" placeholder="Password" onChange={(e) => setFormData({...formData, password: e.target.value})}
          className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
        <input required name="confirmPassword" type="password" placeholder="Confirm Password" onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
          className="w-full px-5 py-3.5 bg-gray-50 rounded-2xl outline-none text-sm font-semibold" />
        
        <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl mt-4 flex justify-center items-center">
          {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Register Now"}
        </button>
        <p className="text-center text-xs font-bold text-gray-400">
          Have account? <span onClick={() => navigate("/login")} className="text-pink-500 cursor-pointer hover:underline">Login</span>
        </p>
      </form>
    </div>
  );
}