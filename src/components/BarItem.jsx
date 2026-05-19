export default function BarItem({ height }) {
  return (
    <div 
      className="w-full bg-pink-500 rounded-t-lg hover:bg-pink-600 cursor-pointer transition-all" 
      style={{ height: `${height}%` }}
    ></div>
  );
}