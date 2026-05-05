import axios from "axios";
import { useState } from "react";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook } from "react-icons/fa";

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

    // 1. Cek User di LocalStorage
    const savedUser = JSON.parse(localStorage.getItem("user_auth"));
    if (savedUser && dataForm.email === savedUser.username && dataForm.password === savedUser.password) {
      setTimeout(() => { navigate("/"); setLoading(false); }, 1000);
      return;
    }

    // 2. Jika tidak ada, cek API DummyJSON
    axios.post("https://dummyjson.com/auth/login", {
      username: dataForm.email,
      password: dataForm.password,
    }).then(() => navigate("/"))
      .catch(() => setError("Invalid Credentials!"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="animate-in fade-in duration-700">
      <h2 className="text-3xl font-black text-gray-800 mb-2">Welcome Back 👋</h2>
      <p className="text-gray-400 text-sm mb-10">Log in to your account.</p>

      {error && (
        <div className="bg-rose-50 mb-6 p-4 rounded-2xl flex items-center gap-3 border border-rose-100 text-rose-600 text-xs font-bold">
          <BsFillExclamationDiamondFill className="text-lg" /> {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input required name="email" type="text" placeholder="Username/Email" onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold" />
        <input required name="password" type="password" placeholder="Password" onChange={handleChange}
          className="w-full px-5 py-4 bg-gray-50 rounded-2xl focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold" />
        
        <button type="submit" disabled={loading} className="w-full bg-pink-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-pink-100">
          {loading ? <ImSpinner2 className="animate-spin mx-auto" /> : "Login Now"}
        </button>

        <p className="text-center text-xs font-bold text-gray-400">
          No account? <span onClick={() => navigate("/register")} className="text-pink-500 cursor-pointer">Register</span>
        </p>
      </form>
    </div>
  );
}