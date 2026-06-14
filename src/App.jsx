import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Loading from "./components/Loading";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Products = React.lazy(() => import("./pages/Products"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const FiturCRM = React.lazy(() => import("./pages/FiturCRM")); 

const GuestLaundry = React.lazy(() => import("./pages/GuestLaundry"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>

        {/* RUTE UTAMA (LANDING PAGE): Langsung memuat halaman Guest Laundry */}
        <Route path="/" element={<GuestLaundry />} />
        
        {/* --- GROUP UTAMA (Memakai Sidebar & Navbar Admin) --- */}
        <Route element={<MainLayout />}>
          
          {/* RUTE ADMIN: Halaman dashboard utama dipindah ke "/admin" */}
          <Route path="/admin" element={<Dashboard />} />
          
          {/* Menu Navigasi Utama */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          
          {/* Fitur Produk (List & Detail) */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* Rute Halaman Fitur CRM */}
          <Route path="/fitur-crm" element={<FiturCRM />} />

          {/* Rute Testing untuk Error Pages */}
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