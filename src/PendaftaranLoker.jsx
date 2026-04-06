import { useState } from "react";
import InputField from "./FormLoker/InputField";
import SelectField from "./FormLoker/SelectField";

export default function PendaftaranLoker() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [pengalaman, setPengalaman] = useState("");
  const [posisi, setPosisi] = useState("");
  const [lokasi, setLokasi] = useState("");

  // Validasi
  const errorNama = nama && /^[0-9]+$/.test(nama) ? "Nama tidak boleh angka" : !nama ? "Wajib diisi" : "";
  const errorEmail = email && !email.includes("@") ? "Email tidak valid" : !email ? "Wajib diisi" : "";
  const errorPengalaman = pengalaman && pengalaman < 0 ? "Tidak boleh negatif" : !pengalaman ? "Wajib diisi" : "";

  const isValid = !errorNama && !errorEmail && !errorPengalaman && posisi && lokasi;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Form Lowongan Kerja</h2>

        <InputField label="Nama Lengkap" type="text" value={nama} onChange={(e)=>setNama(e.target.value)} error={errorNama} />
        <InputField label="Email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} error={errorEmail} />
        <InputField label="Pengalaman (Tahun)" type="number" value={pengalaman} onChange={(e)=>setPengalaman(e.target.value)} error={errorPengalaman} />

        <SelectField label="Posisi" options={["Frontend", "Backend", "UI/UX"]} value={posisi} onChange={(e)=>setPosisi(e.target.value)} />
        <SelectField label="Lokasi" options={["Jakarta", "Bandung", "Remote"]} value={lokasi} onChange={(e)=>setLokasi(e.target.value)} />

        {isValid ? (
          <button className="w-full bg-blue-600 text-white py-2 rounded mt-4">Kirim Lamaran</button>
        ) : (
          <p className="text-sm text-gray-500 mt-4 text-center italic">Silahkan isi semua data dengan benar</p>
        )}

        {isValid && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded border border-green-400">
            Terima kasih <b>{nama}</b>, lamaran untuk posisi <b>{posisi}</b> di <b>{lokasi}</b> telah siap dikirim!
          </div>
        )}
      </div>
    </div>
  );
}