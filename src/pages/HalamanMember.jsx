import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdStars, MdLocalLaundryService, MdArrowForward } from "react-icons/md";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { authAPI } from "../services/authAPI";

export default function HalamanMember() {
  const navigate = useNavigate();
  const [userMember, setUserMember] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customer_name: "",
    customer_phone: "",
    service_type: "",
    weight: "",
    status: "Pending"
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Check apakah member sudah login
    const memberAuth = localStorage.getItem("member_auth");
    if (!memberAuth) {
      navigate("/login-member");
      return;
    }

    const member = JSON.parse(memberAuth);
    setUserMember(member);
    setOrderForm({
      customer_name: member.nama,
      customer_phone: member.no_hp,
      service_type: "",
      weight: ""
    });
  }, [navigate]);

  if (!userMember) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const tierConfig = {
    Platinum: { bg: "from-blue-600 to-indigo-900", text: "text-blue-200", diskon: "20%", minOrder: "Gratis Antar Jemput Tanpa Batas" },
    Gold: { bg: "from-amber-400 to-yellow-600", text: "text-amber-950", diskon: "15%", minOrder: "Gratis Antar Jemput radius 5km" },
    Silver: { bg: "from-gray-300 to-gray-500", text: "text-gray-900", diskon: "10%", minOrder: "Gratis Antar Jemput radius 2km" }
  };

  const currentTier = tierConfig[userMember.tier] || tierConfig.Silver;

  const services = [
    { name: "Cuci Komplit", price: 8000 },
    { name: "Cuci + Setrika", price: 12000 },
    { name: "Setrika Saja", price: 6000 },
    { name: "Express Cuci Komplit", price: 14000 },
    { name: "Express Cuci + Setrika", price: 20000 }
  ];

  const handleLogout = () => {
    localStorage.removeItem("member_auth");
    navigate("/");
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    
    if (!orderForm.service_type || !orderForm.weight) {
      alert("Semua field harus diisi!");
      return;
    }

    const selectedService = services.find(s => s.name === orderForm.service_type);
    const totalPrice = selectedService.price * parseFloat(orderForm.weight);

    try {
      setSubmitting(true);
      const newOrder = {
        customer_name: orderForm.customer_name,
        customer_phone: orderForm.customer_phone,
        service_type: orderForm.service_type,
        weight: parseFloat(orderForm.weight),
        total_price: totalPrice,
        status: "Pending"
      };

      await authAPI.createOrder(newOrder);
      alert("Order berhasil dibuat! Admin akan segera memproses.");
      setShowOrderForm(false);
      setOrderForm({
        customer_name: userMember.nama,
        customer_phone: userMember.noHp,
        service_type: "",
        weight: ""
      });
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Gagal membuat order!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* HEADER NAVBAR MEMBER */}
      <div className="bg-white border-b border-gray-100 px-5 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-pink-500 text-white p-2 rounded-xl"><MdLocalLaundryService size={18} /></div>
            <span className="font-bold text-lg text-gray-900">UciLaundry <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-black">MEMBER AREA</span></span>
          </div>
          <button onClick={handleLogout} className="text-xs font-bold text-red-500 hover:underline">Logout</button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-5 mt-8">
        {/* WELCOME BANNER (KARTU MEMBER SESUAI KASTA) */}
        <div className={`p-6 rounded-3xl bg-gradient-to-r ${currentTier.bg} text-white shadow-xl relative overflow-hidden`}>
          <div className="absolute -right-10 -bottom-10 opacity-10 text-white">
            <MdStars size={200} />
          </div>
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-3 py-1 rounded-full">Official Member Card</span>
              <h2 className="text-2xl font-black mt-3">{userMember.nama}</h2>
              <p className="text-xs opacity-75 mt-0.5">{userMember.noHp}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-2xl text-center border border-white/10">
              <p className="text-[9px] font-black uppercase opacity-70">Kasta Anda</p>
              <p className="text-xl font-black tracking-wide">{userMember.tier}</p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-xs">
            <div>
              <p className="opacity-60">Total Poin Laundry</p>
              <p className="text-base font-bold">{userMember.poin} Poin</p>
            </div>
            <div className="text-right">
              <p className="opacity-60">Benefit Diskon Anda</p>
              <p className="text-base font-bold">{currentTier.diskon} Potongan Harga</p>
            </div>
          </div>
        </div>

        {/* DAFTAR PILIHAN KASTA (Platinum, Gold, Silver) UNTUK EDUKASI */}
        <h3 className="font-black text-gray-800 text-lg mt-8 mb-4">Tingkatan Kasta Member & Keuntungan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SILVER */}
          <div className={`p-5 rounded-2xl border bg-white ${userMember.tier === "Silver" ? "border-gray-400 ring-2 ring-gray-200" : "border-gray-100"}`}>
            <div className="w-8 h-8 rounded-lg bg-gray-300 flex items-center justify-center font-bold text-gray-700 text-sm">S</div>
            <h4 className="font-black text-gray-900 mt-3 text-sm">Silver Member</h4>
            <p className="text-xs text-gray-400 mt-1">Diskon otomatis <span className="font-bold text-gray-700">10%</span> setiap transaksi cuci.</p>
          </div>
          {/* GOLD */}
          <div className={`p-5 rounded-2xl border bg-white ${userMember.tier === "Gold" ? "border-yellow-400 ring-2 ring-yellow-100" : "border-gray-100"}`}>
            <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center font-bold text-amber-950 text-sm">G</div>
            <h4 className="font-black text-gray-900 mt-3 text-sm">Gold Member</h4>
            <p className="text-xs text-gray-400 mt-1">Diskon otomatis <span className="font-bold text-gray-700">15%</span> + {tierConfig.Gold.minOrder}.</p>
          </div>
          {/* PLATINUM */}
          <div className={`p-5 rounded-2xl border bg-white ${userMember.tier === "Platinum" ? "border-indigo-500 ring-2 ring-indigo-100" : "border-gray-100"}`}>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">P</div>
            <h4 className="font-black text-gray-900 mt-3 text-sm">Platinum Member</h4>
            <p className="text-xs text-gray-400 mt-1">Diskon tertinggi <span className="font-bold text-indigo-600">20%</span> + Prioritas Antrian Cucian Express.</p>
          </div>
        </div>

        {/* TOMBOL PENGIRIMAN ORDER YANG SUDAH TERAUTHENTIKASI MEMBER */}
        <div className="mt-8 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="font-black text-gray-900 text-sm">Siap Kirim Cucian Hari Ini?</h3>
            <p className="text-xs text-gray-400 mt-0.5">Sistem otomatis mendeteksi kasta <span className="font-bold text-pink-500">{userMember.tier}</span> untuk klaim diskon {currentTier.diskon} Anda.</p>
          </div>
          <div className="flex gap-2 shrink-0">
            <button 
              onClick={() => setShowOrderForm(true)}
              className="px-6 py-3 bg-pink-500 text-white font-bold text-xs rounded-xl shadow-md hover:bg-pink-600 flex items-center gap-2 transition-transform active:scale-95"
            >
              <MdArrowForward size={16} /> Form Order
            </button>
            <a 
              href={`https://wa.me/6289577224455?text=Halo%20UciLaundry%2C%20saya%20member%20*${userMember.nama}*%20dengan%20kasta%20*${userMember.tier}*%20ingin%20mengajukan%20order%20laundry.`} 
              target="_blank" 
              rel="noreferrer" 
              className="px-6 py-3 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-600 flex items-center gap-2 shrink-0 transition-transform active:scale-95"
            >
              <FaWhatsapp size={16} /> Via WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modal Order Form */}
      {showOrderForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowOrderForm(false)} 
              className="absolute top-8 right-8 text-gray-300 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-2xl font-black text-gray-900 mb-2">Buat Order Baru</h2>
            <p className="text-sm text-gray-400 mb-6">Isi form di bawah untuk membuat order laundry</p>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nama Anda</label>
                <input 
                  type="text" 
                  value={orderForm.customer_name}
                  disabled
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">No. HP</label>
                <input 
                  type="text" 
                  value={orderForm.customer_phone}
                  disabled
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 text-sm font-semibold text-gray-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Layanan</label>
                <select 
                  value={orderForm.service_type}
                  onChange={(e) => setOrderForm({...orderForm, service_type: e.target.value})}
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                >
                  <option value="">Pilih Layanan</option>
                  {services.map((service) => (
                    <option key={service.name} value={service.name}>
                      {service.name} - Rp {service.price.toLocaleString('id-ID')}/Kg
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Berat Cucian (Kg)</label>
                <input 
                  type="number" 
                  step="0.5"
                  value={orderForm.weight}
                  onChange={(e) => setOrderForm({...orderForm, weight: e.target.value})}
                  placeholder="Contoh: 5"
                  className="w-full mt-2 px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 focus:ring-2 focus:ring-pink-200 outline-none text-sm font-semibold"
                  required
                />
              </div>

              {orderForm.service_type && orderForm.weight && (
                <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Total Harga</p>
                  <p className="text-2xl font-black text-pink-600">
                    Rp {(services.find(s => s.name === orderForm.service_type)?.price * parseFloat(orderForm.weight)).toLocaleString('id-ID')}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowOrderForm(false)}
                  className="flex-1 bg-gray-200 text-gray-800 font-black py-3 rounded-xl hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-pink-500 text-white font-black py-3 rounded-xl hover:bg-pink-600 transition-all disabled:opacity-50"
                >
                  {submitting ? "Creating..." : "Create Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}