import { Link } from "react-router-dom";
import { MdArrowForward, MdFormatQuote, MdStar, MdThumbUp, MdVerified } from "react-icons/md";
import DashboardContainer from "../components/DashboardContainer";
import Heading1 from "../components/Heading1";
import SubHeading from "../components/SubHeading";
import CardContainer from "../components/CardContainer";
import CardHeader from "../components/CardHeader";

const testimonials = [
  {
    name: "Della Oktaviani",
    role: "Pemilik Kos Putri",
    rating: 5,
    text: "Layanan sangat cepat, cucian rapi, dan wangi. Saya sering pakai untuk seragam harian dan selimut.",
  },
  {
    name: "Suci Ramadani",
    role: "Ibu Rumah Tangga",
    rating: 5,
    text: "Prosesnya simpel dan hasilnya selalu bersih. Saya suka karena cucian saya dipisah dan dijaga kebersihannya.",
  },
  {
    name: "Ahmad Pratama",
    role: "Karyawan Swasta",
    rating: 5,
    text: "Saya pakai layanan express dan hasilnya sangat memuaskan. Tepat waktu dan sangat praktis.",
  },
];

export default function Testimoni() {
  return (
    <DashboardContainer>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
        <div>
          <Heading1 text="Testimoni Pelanggan" />
          <SubHeading text="Bukti kepuasan pelanggan yang terus mempercayai Uci Laundry" />
        </div>
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-gray-200 text-sm font-semibold text-gray-600 hover:border-pink-200 hover:text-pink-500 transition-all"
        >
          Kembali ke Dashboard
          <MdArrowForward size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <CardContainer className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center">
              <MdStar size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">4.9/5</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Rata-rata rating</p>
            </div>
          </div>
        </CardContainer>

        <CardContainer className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <MdVerified size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">320+</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Pelanggan puas</p>
            </div>
          </div>
        </CardContainer>

        <CardContainer className="lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <MdThumbUp size={24} />
            </div>
            <div>
              <p className="text-3xl font-black text-gray-800">98%</p>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Repeat order</p>
            </div>
          </div>
        </CardContainer>
      </div>

      <CardContainer className="p-0 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <CardHeader title="Ulasan terbaru" mb="mb-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-8">
          {testimonials.map((item, index) => (
            <div key={index} className="rounded-[1.5rem] border border-gray-100 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: item.rating }).map((_, starIndex) => (
                  <MdStar key={starIndex} size={18} />
                ))}
              </div>
              <div className="text-pink-500 mb-4">
                <MdFormatQuote size={24} />
              </div>
              <p className="text-sm leading-7 text-gray-600">“{item.text}”</p>
              <div className="mt-6">
                <p className="font-bold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-400">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContainer>
    </DashboardContainer>
  );
}
