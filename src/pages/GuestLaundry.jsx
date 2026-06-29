import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 🟢 WAJIB ADA untuk pindah halaman
import {
  MdLocalLaundryService,
  MdSearch,
  MdCheckCircle,
  MdCheck,
  MdClose,
  MdMenu,
  MdStar,
  MdPhone,
  MdArrowForward,
  MdLocalShipping,
  MdFlashOn,
  MdStars,
  MdFileCopy,
  MdInfo,
  MdCancel,
  MdSchedule,
  MdPlace,
  MdQuestionAnswer,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";

function SmartImg({ src, alt, fallbackGradient, fallbackEmoji, className, imgClass }) {
  const [failed, setFailed] = useState(false);
  return (
    <div
      className={"relative overflow-hidden " + (className || "")}
      style={{ background: failed ? (fallbackGradient || "linear-gradient(135deg, #fce7f3, #ec4899)") : "#f3f4f6" }}
    >
      {!failed && src && (
        <img
          src={src}
          alt={alt}
          className={"w-full h-full object-cover " + (imgClass || "")}
          loading="lazy"
          onError={function() { setFailed(true); }}
        />
      )}
      {failed && (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2">
          <span className="text-5xl md:text-6xl">{fallbackEmoji || "🧺"}</span>
          <span className="text-xs font-bold text-white/80">{alt}</span>
        </div>
      )}
      {!failed && src && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  );
}

export default function GuestLaundry() {
  const [searchNoHp, setSearchNoHp] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [activeTab, setActiveTab] = useState("reguler");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, title: "", msg: "", type: "success" });
  const [countdown, setCountdown] = useState({ h: 8, m: 45, s: 12 });
  const [openFaq, setOpenFaq] = useState(null);

  var dummyTrackingData = [
    { noHp: "081234567890", name: "Della Oktaviani", status: "Proses", service: "Cuci Komplit + Premium Wangi", weight: "5.5 Kg", total: "Rp 55.000", estimasi: "Hari ini, 18:00", member: "Gold" },
    { noHp: "089577224455", name: "Suci Ramadani", status: "Selesai", service: "Cuci Selimut & Bedcover XL", weight: "8.0 Kg", total: "Rp 120.000", estimasi: "Sudah selesai", member: "Bronze" },
    { noHp: "085298765432", name: "Ahmad Pratama", status: "Antri", service: "Express Cuci + Setrika", weight: "3.0 Kg", total: "Rp 60.000", estimasi: "Besok, 10:00", member: "Platinum" }
  ];

  var faqData = [
    { q: "Berapa minimal order untuk cuci laundry?", a: "Minimal order 2 Kg untuk layanan reguler. Express dan premium tidak ada minimal order, tapi harga minimum Rp20.000 tetap berlaku." },
    { q: "Apakah cucian saya aman dan tidak dicampur?", a: "Pasti aman! Kami pakai sistem 1 Pelanggan = 1 Mesin. Cucian Anda dicuci terpisah, tidak pernah dicampur milik orang lain." },
    { q: "Berapa lama proses pencucian?", a: "Reguler: 1-2 hari kerja. Express: 3-5 jam. Premium: 1-2 hari kerja dengan treatment khusus." },
    { q: "Apakah ada layanan antar-jemput?", a: "Ada! Gratis antar-jemput radius 5 Km. Di luar area dikenakan biaya Rp5.000-Rp15.000 tergantung jarak." },
    { q: "Metode pembayaran apa yang diterima?", a: "Cash, Transfer Bank (BCA, Mandiri, BRI), dan E-Wallet (GoPay, OVO, DANA, ShopeePay)." },
    { q: "Bagaimana kalau ada pakaian rusak atau hilang?", a: "Kami bertanggung jawab penuh. Jika terbukti kesalahan kami, ganti sesuai nilai pakaian (maks. 5x harga cuci)." },
    { q: "Parfum apa yang digunakan?", a: "Reguler: parfum standar segar. Premium: pilihan parfum import (Lavender, Cherry Blossom, Vanilla, Ocean Breeze)." },
    { q: "Apakah bisa request cuci terpisah pakaian dalam?", a: "Tentu! Minta pakaian dalam dicuci terpisah, tidak ada biaya tambahan. Informasikan saat order via WhatsApp." }
  ];

  var photos = {
    hero: "https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?w=800&h=500&fit=crop",
    gallery: [
      { src: "https://cdn1-production-images-kly.akamaized.net/76UvHsFKxWyHUP4MLxdIWVUOAkc=/500x281/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4344731/original/012793600_1677817618-shutterstock_757701847.jpg", label: "Kemeja Rapi", grad: "linear-gradient(135deg, #93c5fd, #3b82f6)" },
      { src: "https://down-id.img.susercontent.com/file/13d9ff7e22c8fe765f069ee1c06c7547", label: "Handuk Putih", grad: "linear-gradient(135deg, #f9a8d4, #ec4899)" },
      { src: "https://i.pinimg.com/736x/7e/3b/bf/7e3bbf345b3afe93ec7a6bc8ca8072fc.jpg", label: "Baju Gantung", grad: "linear-gradient(135deg, #fcd34d, #f59e0b)" },
      { src: "https://mylovebedcover.com/cdn/shop/products/ziggy-bc-rumbai.jpg?v=1673601463", label: "Bed Cover", grad: "linear-gradient(135deg, #6ee7b7, #10b981)" }
    ],
    services: {
      reguler: [
        { name: "Cuci Komplit", desc: "Cuci + kering + lipat rapi", price: "8.000", unit: "/Kg", grad: "linear-gradient(135deg, #38bdf8, #0ea5e9)", img: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=500&h=350&fit=crop" },
        { name: "Cuci + Setrika", desc: "Cuci + kering + setrika rapi", price: "12.000", unit: "/Kg", grad: "linear-gradient(135deg, #f472b6, #ec4899)", popular: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh_JzFg1e-rgNPYcnCmIce9Q9LCrpLargU9w&s" },
        { name: "Setrika Saja", desc: "Setrika pakaian siap pakai", price: "6.000", unit: "/Kg", grad: "linear-gradient(135deg, #fbbf24, #f59e0b)", img: "https://a-cdn.sindonews.com/dyn/620/content/2019/05/10/186/1403030/trik-nyetrika-pakaian-agar-tak-kusut-pMQ-thumb.jpg" }
      ],
      express: [
        { name: "Express Cuci Komplit", desc: "Selesai dalam 3 jam!", price: "14.000", unit: "/Kg", grad: "linear-gradient(135deg, #f87171, #ef4444)", img: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=500&h=350&fit=crop" },
        { name: "Express Cuci + Setrika", desc: "Selesai 5 jam, siap pakai", price: "20.000", unit: "/Kg", grad: "linear-gradient(135deg, #a78bfa, #8b5cf6)", popular: true, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=350&fit=crop" },
        { name: "Express Setrika", desc: "Selesai dalam 2 jam", price: "10.000", unit: "/Kg", grad: "linear-gradient(135deg, #34d399, #10b981)", img: "https://a-cdn.sindonews.com/dyn/620/content/2019/05/10/186/1403030/trik-nyetrika-pakaian-agar-tak-kusut-pMQ-thumb.jpg" }
      ],
      premium: [
        { name: "Premium Komplit", desc: "Detergen premium + parfum import", price: "18.000", unit: "/Kg", grad: "linear-gradient(135deg, #818cf8, #6366f1)", img: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=500&h=350&fit=crop" },
        { name: "Premium + Setrika", desc: "Full treatment + parfum mewah", price: "25.000", unit: "/Kg", grad: "linear-gradient(135deg, #e879f9, #d946ef)", popular: true, img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=350&fit=crop" },
        { name: "Cuci Sepatu", desc: "Deep clean + deodorizer", price: "35.000", unit: "/Pasang", grad: "linear-gradient(135deg, #0ea5e9, #0284c7)", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=350&fit=crop" }
      ]
    }
  };

  useEffect(function() {
    var interval = setInterval(function() {
      setCountdown(function(prev) {
        var total = prev.h * 3600 + prev.m * 60 + prev.s;
        if (total <= 0) return prev;
        total--;
        return { h: Math.floor(total / 3600), m: Math.floor((total % 3600) / 60), s: total % 60 };
      });
    }, 1000);
    return function() { clearInterval(interval); };
  }, []);

  useEffect(function() {
    if (toast.show) {
      var timer = setTimeout(function() { setToast(function(t) { return { show: false, title: t.title, msg: t.msg, type: t.type }; }); }, 4000);
      return function() { clearTimeout(timer); };
    }
  }, [toast.show]);

  function showToast(title, msg, type) {
    setToast({ show: true, title: title, msg: msg, type: type || "success" });
  }

  function copyVoucher(code) {
    navigator.clipboard.writeText(code).then(function() {
      showToast("Kode Disalin! 🎉", "Voucher " + code + " berhasil disalin.", "success");
    }).catch(function() {
      showToast("Kode Voucher", "Salin manual: " + code, "info");
    });
  }

  function handleTrack(e) {
    e.preventDefault();
    if (!searchNoHp.trim()) { showToast("Oops!", "Masukkan nomor HP dulu.", "error"); return; }
    setHasSearched(true);
    var result = dummyTrackingData.find(function(item) { return item.noHp === searchNoHp.trim(); });
    setTrackingResult(result || null);
    if (result) { showToast("Ditemukan! ✨", "Status: " + result.status, "success"); }
    else { showToast("Tidak Ditemukan", "Nomor HP tidak terdaftar.", "error"); }
  }

  var statusConfig = {
    Selesai: { icon: <MdCheckCircle size={14} />, bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100", label: "✅ Siap Dijemput", step: 5 },
    Proses: { icon: <MdLocalLaundryService size={14} className="animate-spin" />, bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100", label: "🔄 Sedang Diproses", step: 3 },
    Antri: { icon: <MdSchedule size={14} />, bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100", label: "⏳ Dalam Antrian", step: 1 }
  };

  var trackSteps = ["Diterima", "Dicuci", "Kering", "Setrika", "Selesai"];
  var waLink = "https://wa.me/6289577224455?text=Halo%20UciLaundry%2C%20saya%20ingin%20order%20laundry";
  var waAskLink = "https://wa.me/6289577224455?text=Halo%20UciLaundry%2C%20saya%20ingin%20bertanya%20tentang%20layanan";
  var currentServices = photos.services[activeTab];

  return (
    <div className="bg-white min-h-screen text-gray-800 font-sans relative">

      {/* TOAST */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-[9999]" style={{ animation: "slideDown 0.4s ease-out" }}>
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 flex items-center gap-3 min-w-[280px]">
            <div className={"w-10 h-10 rounded-xl flex items-center justify-center shrink-0 " + (toast.type === "success" ? "bg-emerald-50 text-emerald-500" : toast.type === "error" ? "bg-rose-50 text-rose-500" : "bg-blue-50 text-blue-500")}>
              {toast.type === "success" ? <MdCheckCircle size={22} /> : toast.type === "error" ? <MdCancel size={22} /> : <MdInfo size={22} />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-800">{toast.title}</p>
              <p className="text-xs text-gray-400">{toast.msg}</p>
            </div>
            <button onClick={function() { setToast(function(t) { return { show: false, title: t.title, msg: t.msg, type: t.type }; }); }} className="text-gray-300 hover:text-gray-500">
              <MdClose size={16} />
            </button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
          <a href="#" className="flex items-center gap-2">
            <div className="bg-pink-500 text-white p-2 rounded-xl shadow-md shadow-pink-200"><MdLocalLaundryService size={20} /></div>
            <span className="font-black text-xl text-gray-900">Uci<span className="text-pink-500">Laundry</span></span>
          </a>
          <div className="hidden md:flex items-center gap-6">
            <a href="#layanan" className="text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors">Layanan</a>
            <a href="#promo" className="text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors">Promo</a>
            <a href="#faq" className="text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors">FAQ</a>
            <a href="#cek-status" className="text-sm font-semibold text-gray-500 hover:text-pink-500 transition-colors">Tracking</a>
          </div>
          <div className="flex items-center gap-2">
            {/* 🟢 TOMBOL BARU: LOGIN MEMBER AREA */}
            <Link to="/login-member" className="hidden sm:flex px-4 py-2 bg-pink-50 text-pink-600 text-xs font-black rounded-xl border border-pink-100 hover:bg-pink-500 hover:text-white transition-all">
               Login Member
            </Link>
            
            <a href={waLink} target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95">
              <FaWhatsapp size={16} /> Chat WhatsApp
            </a>
            <button onClick={function() { setMenuOpen(!menuOpen); }} className="md:hidden p-2 text-gray-500 hover:text-pink-500 rounded-xl">
              {menuOpen ? <MdClose size={22} /> : <MdMenu size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col gap-1 pt-3">
              <a href="#layanan" onClick={function() { setMenuOpen(false); }} className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl">Layanan</a>
              <a href="#promo" onClick={function() { setMenuOpen(false); }} className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl">Promo</a>
              <a href="#faq" onClick={function() { setMenuOpen(false); }} className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl">FAQ</a>
              <a href="#cek-status" onClick={function() { setMenuOpen(false); }} className="px-4 py-3 text-sm font-semibold text-gray-600 hover:text-pink-500 hover:bg-pink-50 rounded-xl">Tracking</a>
              {/* 🟢 TOMBOL BARU MOBILE: LOGIN MEMBER */}
              <Link to="/login-member" onClick={function() { setMenuOpen(false); }} className="px-4 py-3 text-sm font-bold text-pink-600 border border-pink-100 rounded-xl mt-2 text-center">Login Member Area</Link>
              <a href={waLink} target="_blank" rel="noreferrer" className="px-4 py-3 bg-emerald-500 text-white text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2 mt-2">
                <FaWhatsapp size={18} /> Chat WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-5 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 bg-pink-50 border border-pink-100 rounded-full px-4 py-2 mb-5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span className="text-xs font-bold text-pink-600">🎉 Diskon 30% Pelanggan Baru!</span>
              <a href="#promo" className="text-[10px] font-black text-white bg-pink-500 px-2 py-0.5 rounded-full hover:bg-pink-600">AMBIL</a>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black text-gray-900 tracking-tight leading-[1.1]">
              Pakaian Bersih,<br/><span className="text-pink-500">Wangi Premium</span><br/><span className="text-gray-300">Tanpa Ribet.</span>
            </h1>
            <p className="text-gray-400 text-sm md:text-base font-medium mt-5 max-w-md leading-relaxed">
              Cuci, setrika, dry clean — mesin terpisah per pelanggan. Higienis, wangi, dan tepat waktu.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              {/* 🟢 TOMBOL YANG DIUBAH: KE DAFTAR MEMBER (CRM FLOW) */}
              <Link to="/register-member" className="group px-6 py-3.5 bg-pink-500 text-white text-sm font-bold rounded-2xl shadow-lg shadow-pink-200 hover:bg-pink-600 transition-all active:scale-95 flex items-center gap-2">
                <MdLocalLaundryService size={18} /> Pesan Sekarang <MdArrowForward size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#cek-status" className="px-6 py-3.5 bg-gray-50 text-gray-700 text-sm font-bold rounded-2xl border border-gray-200 hover:border-pink-300 hover:text-pink-500 transition-all flex items-center gap-2">
                <MdSearch size={18} /> Cek Status Cucian
              </a>
            </div>
            <div className="mt-9 flex gap-8 border-t border-gray-100 pt-6">
              <div><p className="text-lg font-black text-gray-900">5K+</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Pelanggan</p></div>
              <div><p className="text-lg font-black text-gray-900">3 Jam</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Express</p></div>
              <div><p className="text-lg font-black text-gray-900">4.9★</p><p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Rating</p></div>
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-pink-100/40">
              <SmartImg
                src={photos.hero}
                alt="Cucian Bersih Rapi"
                fallbackGradient="linear-gradient(135deg, #fce7f3 0%, #fbcfe8 30%, #f9a8d4 60%, #ec4899 100%)"
                fallbackEmoji="🧺"
                className="h-[320px] md:h-[460px]"
                imgClass="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-3 -left-3 md:-bottom-4 md:-left-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 md:p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0"><MdCheckCircle size={22} className="text-emerald-500" /></div>
              <div><p className="text-xs md:text-sm font-black text-gray-900">1 Orang = 1 Mesin</p><p className="text-[10px] text-gray-400 font-medium">Higienis dan terpisah</p></div>
            </div>
            <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 md:p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center shrink-0"><MdFlashOn size={22} className="text-pink-500" /></div>
              <div><p className="text-xs md:text-sm font-black text-gray-900">Express 3 Jam</p><p className="text-[10px] text-gray-400 font-medium">Butuh cepat? Siap!</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* HASIL KERJA KAMI */}
      <section className="py-14 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">Hasil Kerja Kami</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-3">Bersih, Rapi dan Wangi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {photos.gallery.map(function(item, i) {
              return (
                <div key={i} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <SmartImg
                    src={item.src}
                    alt={item.label}
                    fallbackGradient={item.grad}
                    fallbackEmoji={item.emoji}
                    className="h-40 md:h-56"
                    imgClass="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 left-2.5 z-10">
                    <span className="bg-white/90 backdrop-blur text-gray-800 text-[10px] md:text-xs font-bold px-2.5 py-1.5 rounded-lg">{item.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LAYANAN DAN HARGA */}
      <section id="layanan" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">Layanan dan Harga</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-3">Pilih Layanan Anda</h2>
            <p className="text-gray-400 text-sm font-medium mt-2">Harga transparan, tanpa biaya tersembunyi</p>
          </div>
          <div className="flex justify-center mb-10">
            <div className="bg-gray-50 rounded-2xl p-1.5 border border-gray-200 flex gap-1">
              <button onClick={function() { setActiveTab("reguler"); }} className={"px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 " + (activeTab === "reguler" ? "bg-pink-500 text-white shadow-lg shadow-pink-100" : "text-gray-400 hover:text-gray-600")}>🧺 Reguler</button>
              <button onClick={function() { setActiveTab("express"); }} className={"px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 " + (activeTab === "express" ? "bg-pink-500 text-white shadow-lg shadow-pink-100" : "text-gray-400 hover:text-gray-600")}>⚡ Express</button>
              <button onClick={function() { setActiveTab("premium"); }} className={"px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 " + (activeTab === "premium" ? "bg-pink-500 text-white shadow-lg shadow-pink-100" : "text-gray-400 hover:text-gray-600")}>✨ Premium</button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {currentServices.map(function(s, i) {
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative flex flex-col h-full">
                  {s.popular && <div className="absolute top-3 right-3 z-10 bg-white text-pink-500 text-[9px] font-black px-3 py-1 rounded-full shadow-md border border-pink-100">⭐ FAVORIT</div>}
                  <SmartImg
                    src={s.img}
                    alt={s.name}
                    fallbackGradient={s.grad}
                    fallbackEmoji={s.emoji}
                    className="h-44"
                    imgClass="group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{s.emoji}</span>
                      <h3 className="font-black text-gray-900 text-sm">{s.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 font-medium mb-3">{s.desc}</p>
                    <div className="flex items-end gap-1 mb-4 mt-auto">
                      <span className="text-sm font-medium text-gray-400">Rp</span>
                      <span className="text-2xl font-black text-gray-900">{s.price}</span>
                      <span className="text-xs font-semibold text-gray-400 mb-0.5">{s.unit}</span>
                    </div>
                    {/* 🟢 TOMBOL YANG DIUBAH: KE DAFTAR MEMBER PER PAKET */}
                    <Link to="/register-member" className="w-full flex items-center justify-center gap-2 py-3 bg-pink-50 text-pink-600 text-xs font-bold rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                      Ambil Paket Member
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2"><MdCheckCircle size={14} className="text-emerald-500" /><span className="text-[11px] font-semibold text-gray-600">Min. Order 2Kg</span></div>
            <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2"><MdCheckCircle size={14} className="text-emerald-500" /><span className="text-[11px] font-semibold text-gray-600">Gratis Jemput 5Km</span></div>
            <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-100 rounded-lg px-3 py-2"><MdCheckCircle size={14} className="text-emerald-500" /><span className="text-[11px] font-semibold text-gray-600">1 Pelanggan = 1 Mesin</span></div>
          </div>
        </div>
      </section>

      {/* CARA ORDER */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-4xl mx-auto px-5">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-gray-900">Cara Order</h2>
            <p className="text-gray-400 text-sm font-medium mt-1">Semudah 1-2-3</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"><FaWhatsapp size={20} /></div>
              <div><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Step 1</p><h3 className="font-black text-gray-900 text-sm mt-0.5">Daftar Akun</h3><p className="text-xs text-gray-400 font-medium mt-0.5">Gabung member premium UciLaundry</p></div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"><MdLocalShipping size={20} /></div>
              <div><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Step 2</p><h3 className="font-black text-gray-900 text-sm mt-0.5">Pesan & Jemput</h3><p className="text-xs text-gray-400 font-medium mt-0.5">Kami jemput, cuci mesin terpisah</p></div>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
              <div className="w-11 h-11 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"><MdCheckCircle size={20} /></div>
              <div><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Step 3</p><h3 className="font-black text-gray-900 text-sm mt-0.5">Antar & Reward</h3><p className="text-xs text-gray-400 font-medium mt-0.5">Diantar ke rumah + Poin loyalitas</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* PROMO */}
      <section id="promo" className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">🔥 Promo</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-3">Diskon dan Voucher</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10">
            <div onClick={function() { copyVoucher("UCI30"); }} className="cursor-pointer bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-5 border border-pink-100 hover:shadow-xl transition-all group flex items-center gap-4">
              <div className="w-16 h-16 bg-pink-500 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform"><span className="text-white text-base font-black">30% OFF</span></div>
              <div className="flex-1 min-w-0">
                <span className="bg-pink-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full">NEW USER</span>
                <p className="text-xs text-gray-500 font-medium mt-1.5 mb-2">Pelanggan baru. Min. 3Kg. Maks. Rp30.000</p>
                <div className="flex items-center gap-2">
                  <div className="bg-white border-2 border-dashed border-pink-300 rounded-lg px-3 py-1"><span className="text-sm font-black text-pink-600 tracking-wider">UCI30</span></div>
                  <span className="text-[10px] font-bold text-pink-400 flex items-center gap-1"><MdFileCopy size={11} /> Salin</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-6 text-center text-white relative overflow-hidden shadow-xl">
               <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-widest opacity-80">Flash Sale Member Berakhir</p>
                  <div className="flex justify-center gap-3 my-3">
                     <div className="bg-white/20 p-2 rounded-lg min-w-[50px]"><span className="block text-xl font-black">{String(countdown.h).padStart(2, '0')}</span><span className="text-[8px] uppercase">Jam</span></div>
                     <div className="bg-white/20 p-2 rounded-lg min-w-[50px]"><span className="block text-xl font-black">{String(countdown.m).padStart(2, '0')}</span><span className="text-[8px] uppercase">Menit</span></div>
                     <div className="bg-white/20 p-2 rounded-lg min-w-[50px]"><span className="block text-xl font-black">{String(countdown.s).padStart(2, '0')}</span><span className="text-[8px] uppercase">Detik</span></div>
                  </div>
                  {/* 🟢 TOMBOL BARU: KLAIM DI PROMO */}
                  <Link to="/register-member" className="inline-block px-6 py-2 bg-white text-pink-600 text-xs font-black rounded-full hover:bg-gray-50">Daftar Member Sekarang</Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-20 bg-gray-50 border-y border-gray-100">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">❓ Pertanyaan</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-3">Sering Ditanya (FAQ)</h2>
            <p className="text-gray-400 text-sm font-medium mt-2">Belum menemukan jawaban? Langsung tanya kami!</p>
          </div>
          <div className="space-y-2.5 mb-8">
            {faqData.map(function(faq, i) {
              return (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <button onClick={function() { setOpenFaq(openFaq === i ? null : i); }} className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 hover:bg-gray-50 transition-colors">
                    <span className="text-sm font-bold text-gray-800">{faq.q}</span>
                    <MdKeyboardArrowDown size={20} className={"text-gray-400 shrink-0 transition-transform duration-300 " + (openFaq === i ? "rotate-180" : "")} />
                  </button>
                  <div className={"transition-all duration-300 ease-in-out overflow-hidden " + (openFaq === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0")}>
                    <div className="px-5 pb-4">
                      <div className="border-t border-gray-100 pt-3"><p className="text-xs text-gray-500 font-medium leading-relaxed">{faq.a}</p></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center">
            <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><MdQuestionAnswer size={28} className="text-pink-500" /></div>
            <h3 className="text-base font-black text-gray-900 mb-1">Masih Ada Pertanyaan?</h3>
            <p className="text-xs text-gray-400 font-medium mb-5">Jangan ragu, langsung tanya tim kami via WhatsApp!</p>
            <a href={waAskLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-all active:scale-95">
              <FaWhatsapp size={18} /> Tanya via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRACKING */}
      <section id="cek-status" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 bg-pink-50 px-4 py-1.5 rounded-full">📍 Tracking</span>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mt-3">Lacak Cucian Anda</h2>
            <p className="text-gray-400 text-sm font-medium mt-2">Masukkan nomor HP yang terdaftar di nota</p>
          </div>
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100">
            <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input type="text" placeholder="Contoh: 089577224455" value={searchNoHp} onChange={function(e) { setSearchNoHp(e.target.value); }} className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold focus:border-pink-300 focus:ring-2 focus:ring-pink-100 focus:bg-white transition-all placeholder:text-gray-300" />
              </div>
              <button type="submit" className="px-7 py-3.5 bg-pink-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-pink-100 hover:bg-pink-600 transition-all active:scale-95 flex items-center justify-center gap-2">
                <MdSearch size={18} /> Lacak
              </button>
            </form>
            {hasSearched && (
              <div className="border-t border-gray-100 pt-6">
                {trackingResult ? (
                  <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white flex justify-between items-start">
                      <div>
                        <p className="text-[10px] font-bold opacity-60 uppercase tracking-wider">Pelanggan</p>
                        <p className="text-base font-black mt-0.5">{trackingResult.name}</p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[9px] font-bold bg-white/10"><MdStars size={10} className="text-amber-400" /> {trackingResult.member}</span>
                      </div>
                      <span className={"inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold " + (statusConfig[trackingResult.status] || statusConfig["Antri"]).bg + " " + (statusConfig[trackingResult.status] || statusConfig["Antri"]).text + " border " + (statusConfig[trackingResult.status] || statusConfig["Antri"]).border}>
                        {(statusConfig[trackingResult.status] || statusConfig["Antri"]).icon} {(statusConfig[trackingResult.status] || statusConfig["Antri"]).label}
                      </span>
                    </div>
                    <div className="px-4 pt-4 pb-2">
                      <div className="flex items-center justify-between">
                        {trackSteps.map(function(step, i) {
                          var cs = (statusConfig[trackingResult.status] || statusConfig["Antri"]).step;
                          return (
                            <React.Fragment key={i}>
                              <div className="flex flex-col items-center relative z-10">
                                <div className={"w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold " + (i < cs ? "bg-pink-500 text-white shadow-md shadow-pink-200" : i === cs ? "bg-pink-100 text-pink-500 border-2 border-pink-300" : "bg-gray-100 text-gray-400")}>
                                  {i < cs ? <MdCheck size={14} /> : i + 1}
                                </div>
                                <span className={"text-[8px] font-bold mt-1 " + (i < cs ? "text-pink-500" : "text-gray-400")}>{step}</span>
                              </div>
                              {i < trackSteps.length - 1 && <div className={"flex-1 h-0.5 mx-0.5 -mt-4 rounded-full " + (i < cs - 1 ? "bg-pink-500" : "bg-gray-200")}></div>}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                    <div className="p-4 grid grid-cols-2 gap-3">
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase">Layanan</p><p className="text-sm font-bold text-gray-700 mt-0.5">{trackingResult.service}</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase">Berat</p><p className="text-sm font-bold text-gray-700 mt-0.5">{trackingResult.weight}</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase">Total</p><p className="text-sm font-black text-pink-500 mt-0.5">{trackingResult.total}</p></div>
                      <div><p className="text-[10px] font-bold text-gray-400 uppercase">Estimasi</p><p className="text-sm font-bold text-gray-700 mt-0.5">{trackingResult.estimasi}</p></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-rose-50 rounded-xl flex items-center justify-center mx-auto mb-3"><MdSearch size={24} className="text-rose-400" /></div>
                    <p className="text-sm font-bold text-gray-800 mb-1">Nomor HP Tidak Ditemukan</p>
                    <p className="text-xs text-gray-400 mb-3">Pastikan nomor sesuai nota pendaftaran.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 pt-12 pb-8 px-5 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-pink-500 text-white p-2 rounded-xl"><MdLocalLaundryService size={16} /></div>
                <span className="font-black text-lg text-white">Uci<span className="text-pink-500">Laundry</span></span>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-relaxed mb-3">Premium laundry service di Pekanbaru. Bersih, wangi, terpercaya.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-3">Layanan</h4>
              <ul className="space-y-2">
                <li><a href="#layanan" className="text-xs font-medium text-gray-500 hover:text-pink-400 transition-colors">Cuci Komplit</a></li>
                <li><a href="#layanan" className="text-xs font-medium text-gray-500 hover:text-pink-400 transition-colors">Cuci + Setrika</a></li>
              </ul>
            </div>
            <div>
               <h4 className="text-xs font-bold text-white mb-3">CRM & Member</h4>
               <ul className="space-y-2">
                  <li><Link to="/login-member" className="text-xs font-medium text-gray-500 hover:text-pink-400 transition-colors">Portal Login Member</Link></li>
                  <li><Link to="/register-member" className="text-xs font-medium text-gray-500 hover:text-pink-400 transition-colors">Daftar Member Baru</Link></li>
               </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-3">Kontak</h4>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2"><MdPlace size={13} className="text-pink-400 mt-0.5 shrink-0" /><span className="text-xs text-gray-500">Jl. Tuanku Tambusai No. 88, Pekanbaru</span></li>
              </ul>
            </div>
          </div>
          <hr className="border-gray-800 mb-5" />
          <p className="text-[10px] text-gray-600 text-center">© 2025 UciLaundry. All rights reserved.</p>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <div className="fixed bottom-6 right-6 z-50">
        <a href={waLink} target="_blank" rel="noreferrer" className="relative w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-xl hover:bg-emerald-600 hover:scale-110 transition-all active:scale-95">
          <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-25"></span>
          <FaWhatsapp size={28} className="text-white relative z-10" />
        </a>
      </div>

    </div>
  );
}