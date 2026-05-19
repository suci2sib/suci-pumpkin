export default function ChartDistribution({ percentage, label }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1">
      <div className="flex justify-center py-6 relative">
        <div className="w-40 h-40 rounded-full border-[18px] border-pink-100 border-l-pink-500 border-b-emerald-400 rotate-45"></div>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span className="text-2xl font-black text-gray-800">{percentage}</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase">{label}</span>
        </div>
      </div>
      <div className="w-full border-t border-gray-100 pt-4 mt-2 flex justify-between text-[10px] font-bold text-gray-400">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-pink-500"></span> 860 SEND
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 234 SPAM
        </div>
      </div>
    </div>
  );
}