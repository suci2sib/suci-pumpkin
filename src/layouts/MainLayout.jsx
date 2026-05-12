import { Outlet } from "react-router-dom";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"

export default function MainLayout() {
  return (
    <div id="app-container" className="bg-[#F8F9FB] min-h-screen flex overflow-hidden">
      {/* Sidebar akan mengambil ruang 64 unit di kiri */}
      <Sidebar />

      {/* Main Content Area akan mengambil sisa ruang yang ada */}
      <div id="main-content" className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        <Header />
        
        {/* Konten halaman dengan padding agar tidak mepet */}
        <main className="flex-1">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}