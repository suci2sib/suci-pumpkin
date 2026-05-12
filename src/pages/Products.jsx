import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
// Import data dari file JSON yang sudah kamu buat
import productData from "../data/Products.json";

export default function Products() {
  return (
    <div id="dashboard-container" className="p-6 bg-gray-50 min-h-screen">
      {/* Header Halaman */}
      <PageHeader title="Products" breadcrumb="Products" />

      {/* Container Tabel */}
      <div className="mt-6 bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {productData.map((item) => (
                <tr key={item.id} className="hover:bg-pink-50/30 transition-colors group">
                  {/* KOLOM NAMA PRODUK */}
                  <td className="px-6 py-4">
                    <Link 
                      to={`/products/${item.id}`} 
                      className="text-gray-900 font-bold hover:text-pink-500 transition-colors block"
                    >
                      {/* Menggunakan OR (||) supaya kalau di JSON kamu nulisnya title atau tittle tetap muncul */}
                      {item.tittle || item.title || "Unknown Product"} 
                    </Link>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest leading-none">
                      {item.code} | {item.brand}
                    </span>
                  </td>
                  
                  {/* KOLOM KATEGORI */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-500">
                      {item.category}
                    </span>
                  </td>
                  
                  {/* KOLOM HARGA (Format Rupiah) */}
                  <td className="px-6 py-4 text-sm text-right font-black text-gray-900">
                    Rp {item.price.toLocaleString("id-ID")}
                  </td>
                  
                  {/* KOLOM STOK (Warna berubah kalau stok dikit) */}
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      item.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {item.stock} Qty
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}