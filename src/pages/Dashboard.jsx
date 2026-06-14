import React from "react";
import DashboardContainer from "../components/DashboardContainer";
import Heading1 from "../components/Heading1";
import SubHeading from "../components/SubHeading";
import ButtonSecondary from "../components/ButtonSecondary";
import ButtonPrimary from "../components/ButtonPrimary";
import StatCard from "../components/StatCard";
import CardContainer from "../components/CardContainer";
import CardHeader from "../components/CardHeader";
import ChartDistribution from "../components/ChartDistribution";
import ChartWeeklyCash from "../components/ChartWeeklyCash";
import TextCurrency from "../components/TextCurrency";
import ChartTrendVisualization from "../components/ChartTrendVisualization";

// Komponen baru yang barusan kita buat
import PerformanceTable from "../components/PerformanceTable";
import TaskList from "../components/TaskList";

export default function Dashboard() {
  const cashFlowHeights = [35, 50, 42, 68, 52, 90, 70];

  return (
    <DashboardContainer>
      {/* 1. Greeting Section */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <Heading1 text="Hi Suci Ramadani" />
          <SubHeading text="Welcome back to Uci Laundry dashboard" />
        </div>
        <div className="flex gap-3">
          <ButtonPrimary text="New Order" />
        </div>
      </div>

      {/* 2. Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard label="Total Cucian Bulan Ini" value="1,240.5 Kg" progress={67} color="bg-pink-500" subText="Won from 18 deals" />
        <StatCard label="Pendapatan Harian" value="Rp 850.000" progress={18} color="bg-rose-400" subText="Daily average income" />
        <StatCard label="Utilitas Mesin (Ready)" value="92%" progress={78} color="bg-emerald-400" subText="Lead conversion" />
        <StatCard label="Order Selesai Hari Ini" value="45 Order" progress={80} color="bg-amber-400" subText="Campaign sent" />
      </div>

      {/* 3. Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Distribusi Layanan */}
        <CardContainer className="lg:col-span-4">
          <CardHeader title="Distribusi Layanan" />
          <ChartDistribution percentage="75%" label="Kiloan" />
        </CardContainer>

        {/* Arus Kas Mingguan */}
        <CardContainer className="lg:col-span-4">
          <CardHeader title="Arus Kas Mingguan" />
          <ChartWeeklyCash data={cashFlowHeights} />
        </CardContainer>

        {/* Total Omzet */}
        <CardContainer className="lg:col-span-4">
          <CardHeader title="Total Omzet" mb="mb-4" />
          <TextCurrency amount="Rp 25.450.000" label="Berdasarkan 450 Transaksi" />
          <ChartTrendVisualization text="Visualisasi Tren" />
        </CardContainer>
      </div>

      {/* 4. SECTION TERBARU: TABEL & TASKS (Biar Penuh sesuai Figma) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Kolom Kiri: Top Performance */}
        <CardContainer className="lg:col-span-8">
          <CardHeader title="Top Performance" mb="mb-6" />
          <PerformanceTable />
        </CardContainer>

        {/* Kolom Kanan: Tasks List */}
        <CardContainer className="lg:col-span-4">
          <CardHeader title="Tasks" mb="mb-2" />
          <TaskList />
        </CardContainer>
      </div>
    </DashboardContainer>
  );
}