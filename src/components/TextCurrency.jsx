export default function TextCurrency({ amount, label }) {
  return (
    <div className="mb-4">
      <h2 className="text-3xl font-black text-gray-900 tracking-tight">{amount}</h2>
      <p className="text-[10px] text-gray-400 font-bold mt-1">{label}</p>
    </div>
  );
}