import ProgressBar from "./ProgressBar";

export default function StatCard({ label, value, progress, color, subText }) {
  return (
    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 transition-all hover:-translate-y-1">
      <h2 className="text-3xl font-bold text-gray-800 mb-1 tracking-tight">{value}</h2>
      <p className="text-[10px] font-bold text-gray-400 mb-6 uppercase tracking-wider">{label}</p>
      <ProgressBar progress={progress} color={color} />
      {subText && (
        <div className="flex justify-between items-center mt-2 text-[10px] font-bold text-gray-300">
          <span>{subText}</span>
          <span>{progress}%</span>
        </div>
      )}
    </div>
  );
}