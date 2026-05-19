export default function ChartTrendVisualization({ text }) {
  return (
    <div className="h-32 bg-gradient-to-t from-pink-50/50 to-white rounded-2xl flex items-center justify-center border-2 border-dashed border-pink-100 group cursor-pointer mt-auto">
      <span className="text-pink-400 text-[10px] font-black tracking-widest group-hover:text-pink-500 transition-colors uppercase">
        {text}
      </span>
    </div>
  );
}