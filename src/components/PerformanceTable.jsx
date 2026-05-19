import React from "react";

export default function PerformanceTable() {
  const users = [
    { id: 1, name: "Mathilda Bell", revenue: "$8,192,000", leads: 187, deals: 154, tasks: "28 Tasks Done", rate: "100%", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { id: 2, name: "Marion Figueroa", revenue: "$5,240,000", leads: 132, deals: 98, tasks: "20 Tasks Done", rate: "85%", img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" }
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[11px] font-bold text-gray-400 border-b border-gray-100 uppercase tracking-wider">
            <th className="pb-4 font-bold">No</th>
            <th className="pb-4 font-bold">Ref</th>
            <th className="pb-4 font-bold">Leads</th>
            <th className="pb-4 font-bold">Deals</th>
            <th className="pb-4 font-bold">Tasks</th>
            <th className="pb-4 font-bold text-right">Rate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50 text-sm font-semibold text-gray-700">
          {users.map((user, idx) => (
            <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <td className="py-4 text-xs text-gray-400">{idx + 1}.</td>
              <td className="py-4 flex items-center gap-3">
                <img src={user.img} alt={user.name} className="w-9 h-9 rounded-full object-cover shadow-sm" />
                <div>
                  <p className="font-bold text-gray-800 text-xs leading-tight">{user.name}</p>
                  <span className="text-[10px] text-gray-400 font-medium">{user.revenue}</span>
                </div>
              </td>
              <td className="py-4 text-xs font-bold text-gray-500">{user.leads}</td>
              <td className="py-4 text-xs font-bold text-gray-500">{user.deals}</td>
              <td className="py-4 text-xs text-gray-400 font-medium">{user.tasks}</td>
              <td className="py-4 text-right text-xs font-black text-pink-500">{user.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}