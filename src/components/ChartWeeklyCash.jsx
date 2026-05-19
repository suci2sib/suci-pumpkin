import BarItem from "./BarItem";

export default function ChartWeeklyCash({ data }) {
  return (
    <div className="flex flex-col justify-between flex-1">
      <div className="flex items-end justify-between h-40 gap-2 px-2 mb-6">
        {data.map((h, i) => (
          <BarItem key={i} height={h} />
        ))}
      </div>
      <div className="grid grid-cols-3 text-center border-t border-gray-100 pt-4 text-[10px] font-bold">
        <div>
          <span className="text-gray-400 block uppercase mb-0.5">Target</span>
          <span className="text-emerald-500">▲ 841</span>
        </div>
        <div>
          <span className="text-gray-400 block uppercase mb-0.5">Last Week</span>
          <span className="text-rose-500">▼ 234</span>
        </div>
        <div>
          <span className="text-gray-400 block uppercase mb-0.5">Monthly</span>
          <span className="text-emerald-500">▲ 3278</span>
        </div>
      </div>
    </div>
  );
}