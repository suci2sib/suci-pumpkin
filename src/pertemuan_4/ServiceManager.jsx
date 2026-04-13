import { useState } from "react";
import serviceData from "./layanan.json";
import GuestCard from "./GuestCard";
import AdminTable from "./AdminTable";

export default function ServiceManager() {
  // 1. Inisialisasi State (Best Practice)
  const [dataForm, setDataForm] = useState({
    searchTerm: "",
    selectedKategori: "",
    viewMode: "guest", // Default tampilan Guest
  });

  // 2. Handle Perubahan Input (General)
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 3. Logic Search & Filter
  const _searchTerm = dataForm.searchTerm.toLowerCase();
  const filteredData = serviceData.filter((item) => {
    const matchesSearch =
      item.nama_layanan.toLowerCase().includes(_searchTerm) ||
      item.info_bisnis.vendor.toLowerCase().includes(_searchTerm);

    const matchesKategori = dataForm.selectedKategori
      ? item.kategori === dataForm.selectedKategori
      : true;

    return matchesSearch && matchesKategori;
  });

  // 4. Ambil Kategori Unik untuk Filter
  const allKategori = [...new Set(serviceData.map((item) => item.kategori))];

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 text-center">Service Directory</h1>
        <p className="text-gray-500 text-center mb-10 italic">Platform pencarian jasa EO terlengkap - Suci Pumpkin</p>

        {/* --- Area Kontrol (Search, Filter, Switch View) --- */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="w-full md:w-1/3">
            <label className="text-xs font-bold text-gray-400 uppercase">Search</label>
            <input
              type="text"
              name="searchTerm"
              placeholder="Cari layanan atau vendor..."
              value={dataForm.searchTerm}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="w-full md:w-1/4">
            <label className="text-xs font-bold text-gray-400 uppercase">Kategori</label>
            <select
              name="selectedKategori"
              value={dataForm.selectedKategori}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-50 border border-gray-200 rounded-xl outline-none"
            >
              <option value="">Semua Kategori</option>
              {allKategori.map((kat) => (
                <option key={kat} value={kat}>{kat}</option>
              ))}
            </select>
          </div>

          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-auto mt-4 md:mt-0">
            <button
              onClick={() => setDataForm({ ...dataForm, viewMode: "guest" })}
              className={`flex-1 md:px-6 py-2 rounded-lg text-sm font-bold transition ${dataForm.viewMode === "guest" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              Mode Guest
            </button>
            <button
              onClick={() => setDataForm({ ...dataForm, viewMode: "admin" })}
              className={`flex-1 md:px-6 py-2 rounded-lg text-sm font-bold transition ${dataForm.viewMode === "admin" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"}`}
            >
              Mode Admin
            </button>
          </div>
        </div>

        {/* --- Area Konten --- */}
        {filteredData.length > 0 ? (
          dataForm.viewMode === "guest" ? (
            /* GRID DESIGN UNTUK GUEST */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredData.map((layanan) => (
                <GuestCard key={layanan.id} item={layanan} />
              ))}
            </div>
          ) : (
            /* TABLE DESIGN UNTUK ADMIN */
            <AdminTable data={filteredData} />
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Layanan yang kamu cari tidak ada di galaksi ini... 🚀</p>
          </div>
        )}
      </div>
    </div>
  );
}