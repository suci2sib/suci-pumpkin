import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";

// Import data dari folder data
import productData from "../data/Products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mencari produk berdasarkan ID yang diklik dari halaman list
  const product = productData.find((p) => p.id === parseInt(id));

  // Jika ID tidak ditemukan di JSON
  if (!product) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 font-bold">Produk tidak ditemukan!</p>
        <button 
          onClick={() => navigate("/products")} 
          className="text-pink-500 underline mt-4 font-bold"
        >
          Kembali ke Daftar Produk
        </button>
      </div>
    );
  }

  return (
    <div id="dashboard-container" className="p-6 bg-gray-50 min-h-screen">
      {/* Tombol Back & Judul Halaman */}
      <div className="flex items-center space-x-4 mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="px-4 py-2 bg-white rounded-xl shadow-sm hover:bg-gray-100 text-pink-500 font-bold transition-all border border-pink-50"
        >
          &larr; Back
        </button>
        <PageHeader title="Product Detail" />
      </div>

      {/* Card Detail Produk */}
      <div className="bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 max-w-2xl mx-auto">
        <div className="text-center border-b border-gray-100 pb-8 mb-8">
          <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            {product.category}
          </span>
          
          {/* PERBAIKAN: Menggunakan 'tittle' (double t) sesuai permintaan data JSON kamu */}
          <h2 className="text-4xl font-black text-gray-900 mt-4 leading-tight">
            {product.tittle}
          </h2>
          
          <p className="text-gray-400 font-mono text-sm mt-1 uppercase">
            {product.brand} — {product.code}
          </p>
        </div>

        {/* Info Harga & Stok */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Price</p>
            <p className="text-2xl font-black text-gray-900">
              Rp {product.price.toLocaleString("id-ID")}
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-3xl text-center border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Availability</p>
            <p className={`text-2xl font-black ${product.stock < 10 ? 'text-red-500' : 'text-pink-500'}`}>
              {product.stock} pcs
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button className="w-full mt-10 bg-pink-500 hover:bg-pink-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-pink-100 tracking-wide active:scale-95">
          Add to Cart
        </button>
      </div>
    </div>
  );
}