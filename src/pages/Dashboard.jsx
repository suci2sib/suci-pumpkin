import { FaDownload, FaPlus, FaEllipsisV } from "react-icons/fa";

export default function Dashboard() {
  return (
    <div className="p-6 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Hi Suci Ramadani</h1>
            <p className="text-gray-400 text-sm font-medium">Welcome back to Uci Laundry dashboard</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-600 rounded-xl shadow-sm text-xs font-bold border border-gray-100 hover:bg-gray-50 transition-all">
              <FaDownload /> Export Report
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-pink-500 text-white rounded-xl shadow-lg shadow-pink-100 text-xs font-bold hover:bg-pink-600 transition-all active:scale-95">
              <FaPlus /> New Order
            </button>
          </div>
        </div>

        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard label="Total Cucian Bulan Ini" value="1,240.5 Kg" progress={67} color="bg-pink-500" />
          <StatCard label="Pendapatan Harian" value="Rp 850.000" progress={45} color="bg-rose-400" />
          <StatCard label="Utilitas Mesin (Ready)" value="92%" progress={92} color="bg-emerald-400" />
          <StatCard label="Order Selesai Hari Ini" value="45 Order" progress={80} color="bg-amber-400" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className="flex justify-between mb-8">
                  <h3 className="font-black text-gray-800">Distribusi Layanan</h3>
                  <FaEllipsisV className="text-gray-200" />
              </div>
              <div className="flex justify-center py-6 relative">
                  <div className="w-40 h-40 rounded-full border-[18px] border-pink-100 border-l-pink-500 border-b-emerald-400 rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-2xl font-black text-gray-800">75%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Kiloan</span>
                  </div>
              </div>
          </div>

          <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className="flex justify-between mb-8">
                  <h3 className="font-black text-gray-800">Arus Kas Mingguan</h3>
                  <FaEllipsisV className="text-gray-200" />
              </div>
              <div className="flex items-end justify-between h-40 gap-2 px-2">
                  {[30, 50, 40, 85, 45, 90, 65].map((h, i) => (
                      <div key={i} className="w-full bg-pink-500 rounded-t-lg hover:bg-pink-600 cursor-pointer" style={{height: `${h}%`}}></div>
                  ))}
              </div>
          </div>

          <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50">
              <div className="flex justify-between mb-4">
                  <h3 className="font-black text-gray-800">Total Omzet</h3>
                  <FaEllipsisV className="text-gray-200" />
              </div>
              <h2 className="text-3xl font-black text-gray-900">Rp 25.450.000</h2>
              <p className="text-[10px] text-gray-400 font-bold mb-8">Berdasarkan 450 Transaksi</p>
              <div className="h-32 bg-gradient-to-t from-pink-50 to-white rounded-2xl flex items-center justify-center border-2 border-dashed border-pink-100 group">
                  <span className="text-pink-300 text-[10px] font-bold group-hover:text-pink-500">VISUALISASI TREN</span>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, progress, color }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 transition-all hover:-translate-y-1">
      <h2 className="text-2xl font-black text-gray-800 mb-1">{value}</h2>
      <p className="text-[11px] font-bold text-gray-400 mb-6 uppercase tracking-tight">{label}</p>
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}