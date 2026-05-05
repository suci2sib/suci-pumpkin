import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDEFF4] p-4 font-sans">
      <div className="bg-white w-full max-w-5xl flex rounded-[2.5rem] shadow-2xl shadow-pink-100 overflow-hidden min-h-[600px]">
        
        {/* SISI KIRI: Visual Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-pink-200 via-pink-300 to-rose-300 relative items-center justify-center p-12 text-white">
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-black mb-4 drop-shadow-md">LaundryPro.</h1>
            <p className="text-pink-100 font-medium tracking-wide">Premium Management System.</p>
          </div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-pink-400/30 rounded-full blur-3xl"></div>
        </div>

        {/* SISI KANAN: Form (Render halaman login/register di sini) */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-white relative">
          <div className="max-w-sm mx-auto w-full">
            <Outlet /> {/* PENTING: Untuk menampilkan isi Login/Register */}
            <p className="text-center text-[10px] font-bold text-gray-300 uppercase tracking-widest mt-12">
              © 2026 LaundryPro System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}