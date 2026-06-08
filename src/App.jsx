import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

/**
 * Lazy Load Komponen Utama (Dashboard & Menu)
 * Menggunakan React.lazy untuk performa yang lebih ringan
 */
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const FiturCRM = React.lazy(() => import("./pages/FiturCRM")); 

/**
 * Lazy Load Komponen Error
 */
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

/**
 * Lazy Load Komponen Auth
 */
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    // Suspense menampilkan Loading spinner saat komponen sedang diunduh
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* --- GROUP UTAMA (Memakai Sidebar & Navbar) --- */}
        <Route element={<MainLayout />}>
          {/* Halaman Beranda / Dashboard */}
          <Route path="/" element={<Dashboard />} />
          
          {/* Menu Navigasi Utama */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* Fitur Produk (List & Detail) */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* 2. TAMBAHAN: Rute Jalan Tol Resmi untuk Halaman Fitur CRM */}
          <Route path="/fitur-crm" element={<FiturCRM />} />

          {/* Rute Testing untuk Error Pages (Sesuai Sidebar) */}
          <Route 
            path="/400" 
            element={<ErrorPage code="400" title="Bad Request" description="Permintaan tidak dapat diproses." />} 
          />
          <Route 
            path="/401" 
            element={<ErrorPage code="401" title="Unauthorized" description="Silakan login untuk mengakses halaman ini." />} 
          />
          <Route 
            path="/403" 
            element={<ErrorPage code="403" title="Forbidden" description="Anda tidak memiliki izin akses." />} 
          />
        </Route>

        {/* --- GROUP AUTHENTICATION (Layout Split Pink-Putih) --- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* --- HANDLING PAGE NOT FOUND (404) --- */}
        <Route 
          path="*" 
          element={<ErrorPage code="404" title="Not Found" description="Ups! Halaman yang Anda cari tidak ada." />} 
        />

      </Routes>
    </Suspense>
  );
}

export default App;