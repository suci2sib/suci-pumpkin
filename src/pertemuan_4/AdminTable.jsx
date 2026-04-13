export default function AdminTable({ data }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b text-gray-700">
          <tr>
            <th className="p-4 font-bold">Layanan</th>
            <th className="p-4 font-bold">Vendor</th>
            <th className="p-4 font-bold">Harga</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold">Rating</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50 transition">
              <td className="p-4">
                <p className="font-semibold text-gray-800">{item.nama_layanan}</p>
                <p className="text-xs text-gray-400">{item.kategori}</p>
              </td>
              <td className="p-4 text-gray-600">{item.info_bisnis.vendor}</td>
              <td className="p-4 font-medium">Rp {item.harga.mulai_dari.toLocaleString()}</td>
              <td className="p-4">
                <span className={`px-2 py-1 rounded-full text-xs ${item.statistik.status === 'Tersedia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {item.statistik.status}
                </span>
              </td>
              <td className="p-4 font-bold text-yellow-600">{item.statistik.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}