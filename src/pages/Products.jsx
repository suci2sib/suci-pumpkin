import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa"; // Menggunakan ikon yang seimbang jika ingin ditambah tombol di kemudian hari
// Import data dari file JSON yang sudah kamu buat
import productData from "../data/Products.json";

export default function Products() {
  const [products] = useState(productData);

  return (
    // Menggunakan p-6, warna background, dan posisi relative yang sama persis dengan Customers
    <div className="bg-[#F8F9FB] min-h-screen p-6 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* 🛠️ HEADER MANUAl (SAMA PERSIS STRUKTUR & MARGINNYA DENGAN CUSTOMER DATABASE) */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-1">Products</h1>
            <p className="text-gray-400 text-sm font-medium">Manage your laundry products and supplies</p>
          </div>
          {/* Dikasi space kosong atau tombol opsional agar tingginya tetap simetris */}
          <div className="h-[46px] w-1 sm:block hidden"></div>
        </div>

        {/* CONTAINER TABEL - Menggunakan rounded-[2.5rem] p-8 shadow-sm border border-gray-50 */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-3">
              <thead>
                <tr className="text-gray-400 text-[10px] font-black uppercase tracking-widest">
                  <th className="pl-6 pb-2">Product Name</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2 text-right">Price</th>
                  <th className="pb-2 text-center pr-6">Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="group transition-all">
                    
                    {/* KOLOM NAMA PRODUK */}
                    <td className="py-4 pl-6 bg-gray-50 rounded-l-2xl group-hover:bg-pink-50 transition-colors">
                      <div className="flex items-center gap-3">
                        {/* Ikon inisial kotak kecil agar seimbang dengan kolom profile customer */}
                        <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-500 font-black shrink-0">
                          {(item.tittle || item.title || "P").charAt(0)}
                        </div>
                        <div>
                          <Link 
                            to={`/products/${item.id}`} 
                            className="text-gray-800 font-bold hover:text-pink-500 transition-colors block leading-tight"
                          >
                            {item.tittle || item.title || "Unknown Product"} 
                          </Link>
                          <span className="text-[10px] font-black text-gray-400 uppercase">
                            {item.code} | {item.brand}
                          </span>
                        </div>
                      </div>
                    </td>
                    
                    {/* KOLOM KATEGORI */}
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-gray-500 text-sm transition-colors">
                      {item.category}
                    </td>
                    
                    {/* KOLOM HARGA */}
                    <td className="py-4 bg-gray-50 group-hover:bg-pink-50 text-sm text-right font-black text-gray-900 transition-colors">
                      Rp {item.price.toLocaleString("id-ID")}
                    </td>
                    
                    {/* KOLOM STOK */}
                    <td className="py-4 pr-6 bg-gray-50 rounded-r-2xl group-hover:bg-pink-50 text-center transition-colors">
                      <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider ${
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
    </div>
  );
}