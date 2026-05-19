export default function CardContainer({ children, className = "" }) {
  return (
    <div className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col justify-between ${className}`}>
      {children}
    </div>
  );
}