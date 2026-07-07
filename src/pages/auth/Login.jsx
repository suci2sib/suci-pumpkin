import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/authAPI"; // Pastikan path import sesuai struktur foldermu

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setDataForm({ ...dataForm, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Cek User ke API Supabase
      const users = await authAPI.loginUser(dataForm.email, dataForm.password);

      // 2. Evaluasi Hasil (Karena response Supabase berbentuk Array)
      if (users && users.length > 0) {
        // Data ditemukan, simpan ke localStorage sebagai sesi
        const loggedInUser = users[0];
        localStorage.setItem("user_auth", JSON.stringify(loggedInUser));
        
        setTimeout(() => { 
            navigate("/admin"); 
            setLoading(false); 
        }, 1000);
      } else {
        // Data tidak ada / array kosong
        setError("Invalid Credentials! Email atau Password salah.");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan pada server saat mencoba login.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-3xl font-black text-gray-800 mb-2">Welcome Back 👋</h2>
      <p className="text-gray-400 text-sm mb-10">Log in to your account.</p>

      {error && (
        <div className="bg-rose-50 mb-6 p-4 rounded-2xl flex items-center gap-3 border border-rose-100 text-rose-600 text-xs font-bold">
          <BsFillExclamationDiamondFill className="text-lg shrink-0" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input required name="email" type="email" placeholder="Email Address" onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold" />
        <input required name="password" type="password" placeholder="Password" onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold" />
        
        <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100 flex justify-center items-center">
          {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Login Now"}
        </button>

        <p className="text-center text-xs font-bold text-gray-400">
          No account? <span onClick={() => navigate("/register")} className="text-pink-500 cursor-pointer hover:underline">Register</span>
        </p>
      </form>
    </div>
  );
}