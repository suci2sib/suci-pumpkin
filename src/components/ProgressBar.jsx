export default function ProgressBar({ progress, color }) {
  return (
    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full`} style={{ width: `${progress}%` }}></div>
    </div>
  );
}