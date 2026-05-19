import DropdownAction from "./DropdownAction";

export default function CardHeader({ title, mb = "mb-8" }) {
  return (
    <div className={`flex justify-between items-center ${mb}`}>
      <h3 className="font-black text-gray-800 text-base">{title}</h3>
      <DropdownAction />
    </div>
  );
}