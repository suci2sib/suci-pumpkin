import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

// --- LAZY LOADING COMPONENTS (SESUAI STRUKTUR ASLI KAMU) ---
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const Users = React.lazy(() => import("./pages/Users"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail")); // 🌟 FIX: Kembali ke ProductDetail (Tanpa S)
const FiturCRM = React.lazy(() => import("./pages/FiturCRM")); // 🌟 FIX: Kembali ke FiturCRM asli kamu

// Komponen Alur Member Area (Mandiri & Berdiri Sendiri)
const HalamanMember = React.lazy(() => import("./pages/HalamanMember"));
const LoginMember = React.lazy(() => import("./pages/LoginMember"));
const RegisterMember = React.lazy(() => import("./pages/RegisterMember"));

// Komponen Publik & Error
const GuestLaundry = React.lazy(() => import("./pages/GuestLaundry"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

// Layout Otentikasi Staf / Admin
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* --- 1. RUTE PUBLIC (LANDING PAGE) --- */}
        <Route path="/" element={<GuestLaundry />} />
        
        {/* --- 2. RUTE MEMBER AREA (TERPISAH & TANPA SIDEBAR ADMIN) --- */}
        <Route path="/register-member" element={<RegisterMember />} />
        <Route path="/login-member" element={<LoginMember />} />
        <Route path="/halaman-member" element={<HalamanMember />} />

        {/* --- 3. GROUP DASHBOARD ADMIN (Memakai Sidebar Layout) --- */}
        <Route element={<MainLayout />}>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/users" element={<Users />} />
          <Route path="/fitur-crm" element={<FiturCRM />} />

          {/* Rute Standar Error Pages Internal */}
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

        {/* --- 4. GROUP AUTHENTICATION STAF/USER (Layout Split) --- */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* --- 5. GLOBAL HANDLING PAGE NOT FOUND (404) --- */}
        <Route 
          path="*" 
          element={<ErrorPage code="404" title="Not Found" description="Ups! Halaman yang Anda cari tidak ada." />} 
        />
      </Routes>
    </Suspense>
  );
}

export default App;