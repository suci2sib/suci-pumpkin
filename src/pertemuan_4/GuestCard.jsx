export default function GuestCard({ item }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <img src={item.gambar} alt={item.nama_layanan} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-wider">
            {item.kategori}
          </span>
          <p className="text-sm font-semibold text-yellow-600">⭐ {item.statistik.rating}</p>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{item.nama_layanan}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.deskripsi}</p>
        <div className="border-t pt-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-400">Mulai dari</p>
            <p className="text-md font-bold text-green-600">Rp {item.harga.mulai_dari.toLocaleString()}</p>
          </div>
          <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg hover:bg-blue-700">Detail</button>
        </div>
      </div>
    </div>
  );
}