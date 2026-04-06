export default function SelectField({ label, options, value, onChange, error }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full p-2 border rounded bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <option value="">-- Pilih --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
    </div>
  );
}