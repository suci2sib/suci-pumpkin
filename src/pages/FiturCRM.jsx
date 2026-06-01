import React, { useState } from "react";
// Import Komponen Inti Shadcn UI
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Import Ikon
import { MdSearch, MdFilterList, MdCheckCircle, MdHourglassTop, MdCancel, MdLocalPhone } from "react-icons/md";
import { FaGem, FaDollarSign, FaUserFriends, FaUserPlus, FaTimes } from "react-icons/fa";

export default function FiturCRM() {
  // 🛠️ Ubah data mentah jadi STATE agar bisa dimanipulasi/ditambah live
  const [crmData, setCrmData] = useState([
    { id: "TRX-2026-01", name: "Della Oktaviani", phone: "0812-3456-7890", service: "Cuci Komplit + Premium Wangi", weight: "5.5 Kg", date: "01 Jun 2026", status: "Proses", total: "Rp 55.000" },
    { id: "TRX-2026-02", name: "Fikri Muhaffizh", phone: "0823-8888-1122", service: "Setrika Express 3 Jam", weight: "3.0 Kg", date: "01 Jun 2026", status: "Selesai", total: "Rp 30.000" },
    { id: "TRX-2026-03", name: "Suci Ramadani", phone: "0895-7722-4455", service: "Cuci Selimut & Bedcover XL", weight: "8.0 Kg", date: "31 Mei 2026", status: "Selesai", total: "Rp 120.000" },
    { id: "TRX-2026-04", name: "Ahmad Dhani", phone: "0813-9900-1122", service: "Cuci Kiloan Biasa", weight: "4.0 Kg", date: "30 Mei 2026", status: "Batal", total: "Rp 24.000" },
    { id: "TRX-2026-05", name: "Marion Figueroa", phone: "0852-1133-5577", service: "Dry Cleaning Jas & Kebaya", weight: "2 Pcs", date: "29 Mei 2026", status: "Proses", total: "Rp 95.000" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("Semua");

  // 🛠️ State kontrol buka/tutup Form Modal Tambah Data
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 🛠️ State untuk menampung field input form baru
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newService, setNewService] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newTotal, setNewTotal] = useState("");

  // Logika filter gabungan
  const filteredData = crmData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatusFilter === "Semua" || item.status === selectedStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // 🛠️ Fungsi Eksekusi Tambah Data Baru ke Tabel
  const handleAddData = (e) => {
    e.preventDefault();
    if (!newName || !newPhone) return alert("Nama dan Nomor HP wajib diisi!");

    const newIdNumber = crmData.length + 1;
    const newData = {
      id: `TRX-2026-0${newIdNumber}`,
      name: newName,
      phone: newPhone,
      service: newService || "Cuci Kiloan Standar",
      weight: newWeight ? `${newWeight} Kg` : "1.0 Kg",
      date: "01 Jun 2026", // Otomatis hari ini
      status: "Proses",    // Default order baru pasti proses
      total: newTotal ? `Rp ${parseInt(newTotal).toLocaleString("id-ID")}` : "Rp 0"
    };

    setCrmData([newData, ...crmData]); // Taruh data baru paling atas
    
    // Reset Form & Tutup Modal
    setNewName("");
    setNewPhone("");
    setNewService("");
    setNewWeight("");
    setNewTotal("");
    setIsModalOpen(false);
  };

  const stats = [
    { label: "Total Members", value: crmData.length * 200 + 250 + "", icon: <FaUserFriends />, color: "bg-pink-500" },
    { label: "Churn Rate", value: "0.8%", icon: <FaGem />, color: "bg-emerald-400" },
    { label: "Avg Spend", value: "$42", icon: <FaDollarSign />, color: "bg-pink-500" },
  ];

  return (
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Customer Relationship Management</h1>
            <p className="text-gray-400 text-sm font-medium">Data interaksi pelanggan dan pelacakan status cucian Uci Laundry</p>
          </div>
          
          {/* 🛠️ TOMBOL TAMBAH DATA (SAMA PERSIS DESIGN BUTTON DENGAN NEW MEMBER CUSTOMERS) */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-2xl shadow-lg font-bold hover:bg-pink-600 transition-all active:scale-95 cursor-pointer"
          >
            <FaUserPlus /> Tambah Data
          </button>
        </div>

        {/* STATS CARD CONTAINER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {stats.map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex items-center gap-4">
              <div className={`${item.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md`}>
                {item.icon}
              </div>
              <div>
                <p className="text-2xl font-black text-gray-800 leading-none">{item.value}</p>
                <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* WORKSPACE AREA */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50">
          
          {/* SEARCH & FILTER ACTION BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input 
                type="text" 
                placeholder="Cari nama pelanggan..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
              />
            </div>

            {/* CONTAINER TOMBOL FILTER */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isFilterOpen ? "bg-pink-500 border-pink-500 text-white shadow-md" : "bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100"
                }`}
              >
                <MdFilterList size={16} /> Filter Lanjutan: {selectedStatusFilter}
              </button>

              {/* DROPDOWN MENU FILTER */}
              {isFilterOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <p className="text-[10px] font-black uppercase text-gray-400 px-3 py-1.5 tracking-wider">Filter Status</p>
                  <hr className="border-gray-50 mb-1" />
                  {["Semua", "Proses", "Selesai", "Batal"].map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setSelectedStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                        selectedStatusFilter === status ? "bg-pink-50 text-pink-600" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TABLE RIWAYAT */}
          <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-inner">
            <Table>
              <TableHeader className="bg-gray-50/70 text-gray-400 font-bold text-xs uppercase tracking-wider">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="py-4 font-bold pl-6">ID Transaksi</TableHead>
                  <TableHead className="font-bold">Pelanggan</TableHead>
                  <TableHead className="font-bold">Paket Layanan</TableHead>
                  <TableHead className="font-bold">Tgl Masuk</TableHead>
                  <TableHead className="font-bold">Status Cucian</TableHead>
                  <TableHead className="font-bold text-right pr-6">Nominal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10 text-gray-400 font-medium text-xs">
                      Tidak ada data yang tersedia.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((trx) => (
                    <TableRow key={trx.id} className="hover:bg-gray-50/40 transition-colors group">
                      <TableCell className="py-4 font-bold text-gray-400 text-xs pl-6 group-hover:text-pink-500 transition-colors">
                        {trx.id}
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-9 h-9 border-2 border-white shadow-sm ring-2 ring-pink-100">
                            <AvatarImage src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${trx.name}`} alt={trx.name} />
                            <AvatarFallback className="bg-pink-100 text-pink-600 font-black text-xs">
                              {trx.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-black text-gray-800 text-xs leading-none mb-1">{trx.name}</p>
                            <span className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5">
                              <MdLocalPhone size={10} /> {trx.phone}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <p className="font-bold text-gray-700 text-xs">{trx.service}</p>
                        <span className="text-[10px] font-bold text-pink-400 bg-pink-50 px-1.5 py-0.5 rounded-md mt-0.5 inline-block">
                          {trx.weight}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 text-xs font-semibold text-gray-500">
                        {trx.date}
                      </TableCell>
                      <TableCell className="py-4">
                        {trx.status === "Selesai" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                            <MdCheckCircle size={12} /> {trx.status}
                          </span>
                        )}
                        {trx.status === "Proses" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                            <MdHourglassTop className="animate-spin" size={12} /> {trx.status}
                          </span>
                        )}
                        {trx.status === "Batal" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                            <MdCancel size={12} /> {trx.status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="py-4 text-right font-black text-gray-800 text-xs pr-6 group-hover:text-pink-500 transition-colors">
                        {trx.total}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

        </div>

      </div>

      {/* 🛠️ MODAL DIALOG POPUP FORM TAMBAH DATA (MATCH DESIGN THEME) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Tombol Close */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
            >
              <FaTimes size={16} />
            </button>
            
            <h2 className="text-xl font-black text-gray-900 mb-2 flex items-center gap-2">
              <FaUserPlus className="text-pink-500" /> Tambah Order CRM Baru
            </h2>
            <p className="text-gray-400 text-xs font-medium mb-6">Masukkan data order laundry pelanggan secara berkala.</p>
            
            <form onSubmit={handleAddData} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Nama Lengkap *</label>
                <input 
                  type="text" required value={newName} onChange={(e) => setNewName(e.target.value)}
                  placeholder="Contoh: Suci Ramadani"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">No. Handphone *</label>
                <input 
                  type="text" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="Contoh: 0895-xxxx-xxxx"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Paket Layanan</label>
                <input 
                  type="text" value={newService} onChange={(e) => setNewService(e.target.value)}
                  placeholder="Contoh: Cuci Kiloan + Setrika Express"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Berat (Kg / Pcs)</label>
                  <input 
                    type="number" step="0.1" value={newWeight} onChange={(e) => setNewWeight(e.target.value)}
                    placeholder="Contoh: 4.5"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 tracking-wider mb-1">Total Biaya (Rp)</label>
                  <input 
                    type="number" value={newTotal} onChange={(e) => setNewTotal(e.target.value)}
                    placeholder="Contoh: 35000"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-semibold focus:outline-none focus:border-pink-300 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-500 font-bold rounded-xl text-xs hover:bg-gray-200 transition-all cursor-pointer"
                >
                  Batal
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-3 bg-pink-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all cursor-pointer"
                >
                  Simpan Data
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}