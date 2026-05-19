export default function DashboardContainer({ children }) {
  return (
    <div className="p-10 bg-[#F8F9FB] min-h-screen">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}