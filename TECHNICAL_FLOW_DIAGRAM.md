# 🏗️ UciLaundry - Technical Architecture & Flow Diagram

## 1️⃣ SYSTEM OVERVIEW (Keseluruhan Sistem)

```
                              🏗️ UCILAUNDRY ARCHITECTURE
                              ═══════════════════════════════════════

┌──────────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Tailwind)                   │
├──────────────────────────────────────────────────────────────────────┤
│                                                                        │
│  ┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐    │
│  │ GUEST PAGE      │  │  MEMBER AREA     │  │  ADMIN DASHBOARD │    │
│  ├─────────────────┤  ├──────────────────┤  ├──────────────────┤    │
│  │ GuestLaundry    │  │ Register Member  │  │ Login.jsx        │    │
│  │ .jsx            │  │ .jsx             │  │ ↓                │    │
│  │                 │  │ ↓                │  │ Dashboard.jsx    │    │
│  │ · Homepage      │  │ Login Member     │  │ · Stats          │    │
│  │ · Promo         │  │ .jsx             │  │ · Users (CRUD)   │    │
│  │ · Services      │  │ ↓                │  │ · Members(CRUD)  │    │
│  │ · Contact       │  │ HalamanMember    │  │ · Orders (CRUD)  │    │
│  │                 │  │ .jsx             │  │ · Products       │    │
│  │ [Admin Login]   │  │ · Create Order   │  │                  │    │
│  │ [Member Signup] │  │ · View Tier      │  │ Sidebar Menu     │    │
│  └─────────────────┘  └──────────────────┘  └──────────────────┘    │
│                                                                        │
└────────────────┬──────────────────────┬──────────────────────┬────────┘
                 │                      │                      │
                 ▼                      ▼                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│            API LAYER (Supabase REST API)                            │
├─────────────────────────────────────────────────────────────────────┤
│   https://bejbfpuztkzeichehrqt.supabase.co/rest/v1                  │
│                                                                      │
│   Headers:                                                          │
│   • apikey: [API_KEY]                                              │
│   • Authorization: Bearer [API_KEY]                                │
│   • Content-Type: application/json                                 │
│   • Prefer: return=representation                                  │
└────────────────┬──────────────────────┬──────────────────────┬──────┘
                 │                      │                      │
         POST, GET, PATCH           GET, POST, DELETE     GET, POST, PATCH
          DELETE requests            requests              DELETE requests
                 │                      │                      │
                 ▼                      ▼                      ▼
┌────────────────────────┐  ┌─────────────────┐  ┌──────────────────┐
│  /users (PostgreSQL)   │  │ /members        │  │ /orders          │
├────────────────────────┤  ├─────────────────┤  ├──────────────────┤
│                        │  │                 │  │                  │
│ id (PK)                │  │ id (PK)         │  │ id (PK)          │
│ name                   │  │ nama            │  │ customer_name    │
│ email (UNIQUE)         │  │ no_hp (UNIQUE)  │  │ customer_phone   │
│ password               │  │ password        │  │ service_type     │
│ created_at             │  │ tier (default:  │  │ weight           │
│                        │  │ Silver)         │  │ total_price      │
│ Admin Staff Table      │  │ poin (default:0)│  │ status (Pending) │
│                        │  │ created_at      │  │ created_at       │
│                        │  │                 │  │                  │
│                        │  │ Customer Table  │  │ Orders Table     │
└────────────────────────┘  └─────────────────┘  └──────────────────┘
```

---

## 2️⃣ MEMBER REGISTRATION & LOGIN FLOW

```
                    👤 MEMBER REGISTRATION & LOGIN ALUR
                    ═════════════════════════════════════════════

STEP 1: MEMBER REGISTRATION
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ Member di GuestLaundry.jsx                                     │
│ ├─ Klik Button [Daftar Sekarang]                              │
│ └─ Navigate ke /register-member                               │
│                                                                 │
│ RegisterMember.jsx (FORM)                                      │
│ ├─ Input Field 1: nama (text)                                 │
│ ├─ Input Field 2: no_hp (text) 📱                             │
│ ├─ Input Field 3: password (password)                         │
│ └─ Button: [Submit Daftar]                                    │
│                                                                 │
│ VALIDASI:                                                       │
│ ├─ Semua field harus diisi? ✓                                 │
│ └─ Nomor HP sudah ada di database?                            │
│    ├─ YA  → ❌ Tampilkan Error: "No HP sudah terdaftar"       │
│    └─ TIDAK → Lanjut ke step berikutnya                       │
│                                                                 │
│ POST ke Supabase /members                                       │
│ ├─ nama: "Budi Santoso"                                       │
│ ├─ no_hp: "08123456789"                                       │
│ ├─ password: "budi123"                                        │
│ ├─ tier: "Silver" (default)                                   │
│ └─ poin: 0 (default)                                          │
│                                                                 │
│ Response: ✅ Member berhasil dibuat!                          │
│                                                                 │
│ localStorage Clear (kosongkan localStorage sebelumnya)         │
│ Redirect ke /login-member                                     │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

STEP 2: MEMBER LOGIN
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ LoginMember.jsx (FORM)                                         │
│ ├─ Input Field 1: no_hp (text) 📱                             │
│ ├─ Input Field 2: password (password)                         │
│ └─ Button: [Login Sekarang]                                   │
│                                                                 │
│ VALIDASI:                                                       │
│ ├─ Nomor HP & password tidak boleh kosong? ✓                 │
│ └─ Cek ke Supabase /members                                   │
│    ├─ Query: WHERE no_hp = input AND password = input         │
│    ├─ MATCH FOUND ✅                                          │
│    │  └─ Save localStorage["member_auth"] = {                 │
│    │     id, nama, no_hp, password, tier, poin, created_at   │
│    │  }                                                        │
│    │  └─ Redirect ke /halaman-member                         │
│    │                                                           │
│    └─ NO MATCH ❌                                             │
│       └─ Tampilkan Error: "No HP/Password Salah"              │
│       └─ User tetap di LoginMember.jsx                        │
│                                                                 │
│ HalamanMember.jsx (PROTECTED PAGE)                            │
│ ├─ useEffect: Cek localStorage["member_auth"]                 │
│ │  ├─ Ada? → Load user data, tampilkan dashboard             │
│ │  └─ Tidak ada? → Redirect ke /login-member                 │
│ ├─ Tampilkan: Member Card                                     │
│ │  ├─ Nama: Budi Santoso                                      │
│ │  ├─ No HP: 08123456789                                      │
│ │  ├─ Tier: Gold ⭐                                           │
│ │  ├─ Poin: 150                                               │
│ │  └─ [Form Order] [Logout] buttons                           │
│ └─ Member bisa membuat order                                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 3️⃣ MEMBER ORDER CREATION FLOW (Real-time Sync to Admin)

```
                    📦 MEMBER ORDER CREATION & REAL-TIME SYNC
                    ═════════════════════════════════════════════

STEP 1: MEMBER BUAT ORDER (di HalamanMember.jsx)
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ Member Login ✓ (localStorage["member_auth"] ada)               │
│ Lihat HalamanMember Dashboard                                  │
│ ├─ Member Card: Budi Santoso | Tier Gold | 150 Poin            │
│ ├─ Button [Form Order] ← KLIK                                  │
│                                                                 │
│ Modal Form Terbuka:                                             │
│ ├─ Nama Anda: "Budi Santoso" (auto-fill dari localStorage)    │
│ ├─ No. HP: "08123456789" (auto-fill dari localStorage)        │
│ ├─ Layanan: (dropdown)                                         │
│ │  ├─ Cuci Komplit - 8000/kg                                  │
│ │  ├─ Cuci + Setrika - 12000/kg                               │
│ │  ├─ Setrika Saja - 6000/kg                                  │
│ │  ├─ Express Cuci Komplit - 14000/kg                         │
│ │  └─ Express Cuci + Setrika - 20000/kg                       │
│ ├─ Berat Cucian: [5] kg (input number)                        │
│ ├─ Auto-Calculate: Total = 8000 × 5 = 40000 ✓                │
│ └─ Button: [Cancel] [Create Order]                            │
│                                                                 │
│ Member klik [Create Order] ←────────────────────┐             │
│                                                  │             │
└────────────────────────────────────────┬─────────┘             │
                                         │                       │
STEP 2: POST REQUEST ke Supabase         │                       │
┌────────────────────────────────────────▼─────────────────────┐
│                                                               │
│ authAPI.createOrder() function dipanggil                     │
│ ├─ HTTP Method: POST                                         │
│ ├─ Endpoint: https://bejbfpuztkzeichehrqt.supabase.co       │
│ │            /rest/v1/orders                                │
│ ├─ Headers:                                                  │
│ │  ├─ apikey: [KEY]                                         │
│ │  ├─ Authorization: Bearer [KEY]                           │
│ │  └─ Content-Type: application/json                        │
│ ├─ Body (JSON):                                             │
│ │  {                                                         │
│ │    "customer_name": "Budi Santoso",                        │
│ │    "customer_phone": "08123456789",                        │
│ │    "service_type": "Cuci Komplit",                         │
│ │    "weight": 5,                                           │
│ │    "total_price": 40000,                                  │
│ │    "status": "Pending"                                    │
│ │  }                                                         │
│                                                               │
│ Response dari Supabase:                                       │
│ ├─ Status: 201 Created ✅                                    │
│ ├─ Body Return:                                              │
│ │  {                                                         │
│ │    "id": 47,                                              │
│ │    "customer_name": "Budi Santoso",                        │
│ │    "created_at": "2024-01-10T09:00:00Z"                   │
│ │  }                                                         │
│                                                               │
│ Alert: "Order berhasil dibuat! Admin akan segera memproses"  │
│ Modal Close, Form Reset                                      │
│                                                               │
└────────────────────────────────────────────────────────────────┘

STEP 3: REAL-TIME SYNC ke ADMIN DASHBOARD
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ Admin di Orders.jsx sudah buka halaman                        │
│ useEffect: setInterval(() => fetchOrders(), 3000) ← Jalan!   │
│                                                                 │
│ Setiap 3 detik:                                               │
│ ├─ GET /orders?order=created_at.desc                         │
│ ├─ Response: Array dari semua orders                         │
│ ├─ React State Update: setOrders(data)                       │
│ ├─ Component Re-render dengan data terbaru                   │
│ └─ TABLE UPDATE ← Order Budi muncul di atas!                 │
│                                                                 │
│ Tabel Admin sekarang menampilkan:                             │
│ ┌──────────────────────────────────────────────────────────┐ │
│ │ ID │ Customer       │ Service      │ Weight│ Status│ Act│ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ 47 │ Budi Santoso   │ Cuci Komplit  │ 5kg  │ 🟡    │    │ │
│ │    │ 08123456789    │              │      │Pending│ [▼] │ │
│ ├──────────────────────────────────────────────────────────┤ │
│ │ 46 │ Siti Maryam    │ Cuci + Setrika│ 3.5kg│ 🟢    │    │ │
│ │    │ 08987654321    │              │      │Procesg│ [▼] │ │
│ └──────────────────────────────────────────────────────────┘ │
│                                                                 │
│ Admin bisa ubah status:                                       │
│ ├─ Klik Dropdown Status                                       │
│ ├─ Select "Processing" atau "Completed" atau "Cancelled"     │
│ ├─ PATCH /orders?id=eq.47                                    │
│ │  Body: { "status": "Processing" }                         │
│ └─ Status berubah menjadi 🟠 Processing                      │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

REAL-TIME FLOW DIAGRAM:
┌─────────────────┐        ┌──────────────────┐        ┌─────────┐
│ Member Create   │        │  Supabase API    │        │  Admin  │
│ Order           │        │  (PostgreSQL DB) │        │ Orders  │
│ HalamanMember   │        │                  │        │ Page    │
└────────┬────────┘        └────────────────────┘        └────┬───┘
         │                                                    │
         │ 1. POST /orders                                   │
         │ Body: {customer_name, weight, ...}               │
         ├─────────────────────────────────────────────────>│
         │                                                    │
         │                  2. INSERT INTO orders VALUES()   │
         │                  ✅ ORDER SAVED                   │
         │                                                    │
         │                  (Wait 3 seconds...)             │
         │                                                    │
         │                  3. setInterval runs              │
         │                  GET /orders?order=created_at.desc
         │<─────────────────────────────────────────────────│
         │                                                    │
         │                  4. Response: [all orders]        │
         │                  New order ID 47 appears!         │
         │                                                    │
         ✓ Order Success        5. UI RENDER with new order ✓
```

---

## 4️⃣ ADMIN DASHBOARD LOGIN & MANAGEMENT FLOW

```
                    👨‍💼 ADMIN LOGIN & DASHBOARD ALUR
                    ═════════════════════════════════════════════

STEP 1: ADMIN LOGIN
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ Admin di GuestLaundry.jsx (Public Page)                       │
│ ├─ Scroll ke bawah, cari bagian Admin                          │
│ ├─ Button [Login Admin] ← KLIK                                │
│ └─ Navigate ke /login (AuthLayout)                            │
│                                                                 │
│ Login.jsx (FORM - Admin Staff Login)                          │
│ ├─ Input Field 1: email (text)                                │
│ │  └─ Contoh: "admin@ucilaundry.com"                         │
│ ├─ Input Field 2: password (password)                         │
│ │  └─ Contoh: "12345"                                        │
│ └─ Button: [Login Sekarang]                                   │
│                                                                 │
│ VALIDASI:                                                       │
│ ├─ Email & password tidak boleh kosong? ✓                    │
│ └─ POST ke Supabase /users                                    │
│    ├─ Query: WHERE email = input AND password = input         │
│    ├─ MATCH FOUND ✅ (User dengan email admin@... ada)       │
│    │  └─ Save localStorage["user_auth"] = {                  │
│    │     id, name, email, password, created_at              │
│    │  }                                                        │
│    │  └─ Redirect ke /admin                                  │
│    │                                                           │
│    └─ NO MATCH ❌                                             │
│       └─ Tampilkan Error: "Email/Password Salah"             │
│       └─ User tetap di Login.jsx                             │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

STEP 2: ADMIN DASHBOARD (MainLayout)
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│ useEffect: Cek localStorage["user_auth"]                       │
│ ├─ Ada? → User terautentikasi ✓                              │
│ └─ Tidak ada? → Redirect ke /login                            │
│                                                                 │
│ LAYOUT STRUCTURE:                                               │
│                                                                 │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ SIDEBAR (Sidebar.jsx)       │  MAIN CONTENT               │ │
│ ├─────────────────────────────┼─────────────────────────────┤ │
│ │ 🏢 Uci Laundry              │ Dashboard.jsx               │ │
│ │                             │ (default route /admin)      │ │
│ │ Menu Navigation:            │ ├─ Stats Cards              │ │
│ │ ├─ 📊 Dashboard       ──┐   │ │ ├─ Total Orders           │ │
│ │ ├─ 📦 Orders          ──┼─> │ │ ├─ Pending Orders         │ │
│ │ ├─ 👥 Customers       │ │   │ │ └─ Completed Orders       │ │
│ │ ├─ 🛍️ Products        │ │   │ ├─ Charts                  │ │
│ │ ├─ 🎯 Laundry Control │ │   │ └─ Recent Activity         │ │
│ │ ├─ 👤 Users (CRUD)    │ │   │                             │ │
│ │ ├─ 👥 Members (CRUD)  │ │   │ Orders.jsx                 │ │
│ │ │                     │ │   │ (route /orders)            │ │
│ │ │ Error Tests:        │ │   │ ├─ Real-time Table         │ │
│ │ │ ├─ 400 Error        │ │   │ ├─ Status: Pending/Proc... │ │
│ │ │ ├─ 401 Unauthorized │ │   │ ├─ Update Status PATCH     │ │
│ │ │ └─ 403 Forbidden    │ │   │ ├─ Delete Order            │ │
│ │ │                     │ │   │ └─ Auto-refresh 3s         │ │
│ │ └─────────────────────┘ │   │                             │ │
│ │                          │   │ Users.jsx                  │ │
│ │ v4.0 Premium             │   │ (route /users) - CRUD      │ │
│ │ [Upgrade Now]            │   │                             │ │
│ │                          │   │ Members.jsx                │ │
│ │                          │   │ (route /members) - CRUD    │ │
│ └──────────────────────────┴─────────────────────────────────┘ │
│                                                                 │
└────────────────────────────────────────────────────────────────┘

STEP 3: ADMIN OPERATIONS

A. VIEW ORDERS (Auto-refresh Real-time)
   ├─ Klik Menu [Orders]
   ├─ Navigate ke /orders
   ├─ Orders.jsx Load
   │  ├─ useEffect: GET /orders (initial load)
   │  ├─ setInterval: GET /orders setiap 3 detik
   │  └─ useState: Update state dengan data terbaru
   ├─ Tabel Tampilkan:
   │  ├─ Order ID | Customer | Service | Weight | Status | Action
   │  └─ Status Color: 🟡 Pending, 🟠 Processing, 🟢 Completed, 🔴 Cancelled
   └─ Admin bisa: [Change Status] [Delete]

B. MANAGE USERS (Admin Staff)
   ├─ Klik Menu [Users]
   ├─ Navigate ke /users
   ├─ Users.jsx Load
   │  ├─ GET /users → Display semua admin staff
   │  └─ Stats: Total Users, Active Users, Admin Staff
   ├─ Operations:
   │  ├─ CREATE: [New User] → Form Modal → POST /users
   │  ├─ READ: [View] → Detail Modal
   │  └─ DELETE: [Delete] → Confirmation → DELETE /users
   └─ Tabel: Name | Email | Password | Created | Action

C. MANAGE MEMBERS (Customer)
   ├─ Klik Menu [Members]
   ├─ Navigate ke /members
   ├─ Members.jsx Load
   │  ├─ GET /members → Display semua customers
   │  └─ Stats: Total Members, Silver Count, Gold Count
   ├─ Operations:
   │  ├─ CREATE: [New Member] → Form Modal → POST /members
   │  ├─ READ: [View] → Detail Modal (show tier & poin)
   │  └─ DELETE: [Delete] → Confirmation → DELETE /members
   └─ Tabel: Nama | No HP | Tier | Poin | Created | Action

STEP 4: LOGOUT
   ├─ Admin klik [Logout] (di profile/menu)
   ├─ localStorage.removeItem("user_auth")
   ├─ All state clear
   └─ Redirect ke / (GuestLaundry.jsx)
```

---

## 5️⃣ DATABASE SCHEMA (Supabase PostgreSQL Tables)

```
                    🗄️ SUPABASE DATABASE STRUCTURE
                    ═══════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                      TABLE 1: users (Admin Staff)                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Columns:                                                            │
│  ┌─────────────┬──────────┬──────────────┬─────────────────┐       │
│  │ Field       │ Type     │ Constraints  │ Example         │       │
│  ├─────────────┼──────────┼──────────────┼─────────────────┤       │
│  │ id          │ BIGINT   │ PK, AUTO     │ 1               │       │
│  │ name        │ TEXT     │ NOT NULL     │ Admin Suci      │       │
│  │ email       │ TEXT     │ UNIQUE, NN   │ admin@uci...com │       │
│  │ password    │ TEXT     │ NOT NULL     │ 12345           │       │
│  │ created_at  │ TIMESTAMP│ DEFAULT NOW  │ 2024-01-01...   │       │
│  └─────────────┴──────────┴──────────────┴─────────────────┘       │
│                                                                      │
│  Sample Data:                                                        │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ ID │ Name          │ Email                 │ Password  │    │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │ 1  │ Admin Suci    │ admin@ucilaundry.com  │ 12345     │    │   │
│  │ 2  │ Admin Rina    │ rina@ucilaundry.com   │ abcde     │    │   │
│  │ 3  │ Admin Budi    │ budi@ucilaundry.com   │ qwerty    │    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  Purpose: Store admin/staff login credentials                      │
│  Used By: Login.jsx, Users.jsx                                     │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                   TABLE 2: members (Customer Laundry)                │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Columns:                                                            │
│  ┌──────────────┬──────────┬──────────────┬─────────────────┐      │
│  │ Field        │ Type     │ Constraints  │ Example         │      │
│  ├──────────────┼──────────┼──────────────┼─────────────────┤      │
│  │ id           │ BIGINT   │ PK, AUTO     │ 1               │      │
│  │ nama         │ TEXT     │ NOT NULL     │ Budi Santoso    │      │
│  │ no_hp        │ TEXT     │ UNIQUE, NN   │ 08123456789     │      │
│  │ password     │ TEXT     │ NOT NULL     │ budi123         │      │
│  │ tier         │ TEXT     │ DEFAULT Silver│ Gold            │      │
│  │ poin         │ INT      │ DEFAULT 0    │ 150             │      │
│  │ created_at   │ TIMESTAMP│ DEFAULT NOW  │ 2024-01-05...   │      │
│  └──────────────┴──────────┴──────────────┴─────────────────┘      │
│                                                                      │
│  Sample Data:                                                        │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │ ID │ Nama         │ No HP      │ Tier      │ Poin  │ Tgl   │   │
│  ├────────────────────────────────────────────────────────────┤   │
│  │ 1  │ Budi Santoso │ 08123456789│ Gold ⭐   │ 150   │ 1/5   │   │
│  │ 2  │ Siti Maryam  │ 08987654321│ Silver ⭐ │ 50    │ 1/6   │   │
│  │ 3  │ Rina Pratiwi │ 08555666777│ Platinum 💎│ 300  │ 1/7   │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  Tier Options:                                                       │
│  ├─ Silver (DEFAULT)  → Diskon 10%, Gratis antar 2km              │
│  ├─ Gold              → Diskon 15%, Gratis antar 5km              │
│  └─ Platinum          → Diskon 20%, Gratis antar unlimited        │
│                                                                      │
│  Purpose: Store customer/member data                               │
│  Used By: RegisterMember, LoginMember, HalamanMember, Members.jsx │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                  TABLE 3: orders (Laundry Jobs)                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Columns:                                                            │
│  ┌──────────────────┬──────────┬──────────────┬──────────┐          │
│  │ Field            │ Type     │ Constraints  │ Example  │          │
│  ├──────────────────┼──────────┼──────────────┼──────────┤          │
│  │ id               │ BIGINT   │ PK, AUTO     │ 1        │          │
│  │ customer_name    │ TEXT     │ NOT NULL     │ Budi ... │          │
│  │ customer_phone   │ TEXT     │ NOT NULL     │ 08123... │          │
│  │ service_type     │ TEXT     │ NOT NULL     │ Cuci ... │          │
│  │ weight           │ DECIMAL  │ NOT NULL     │ 5.0      │          │
│  │ total_price      │ DECIMAL  │ NOT NULL     │ 40000    │          │
│  │ status           │ TEXT     │ DEFAULT Pend │ Process  │          │
│  │ created_at       │ TIMESTAMP│ DEFAULT NOW  │ 2024-... │          │
│  └──────────────────┴──────────┴──────────────┴──────────┘          │
│                                                                      │
│  Sample Data:                                                        │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ID │ Customer      │ Service       │Wt │ Price  │ Status   │  │
│  ├──────────────────────────────────────────────────────────────┤  │
│  │47 │ Budi Santoso  │ Cuci Komplit  │5kg│ 40000  │ Pending 🟡│  │
│  │46 │ Siti Maryam   │ Cuci+Setrika  │3.5│ 42000  │ Process 🟠│  │
│  │45 │ Rina Pratiwi  │ Express       │2kg│ 28000  │ Complete🟢│  │
│  │44 │ Budi Santoso  │ Setrika Saja  │8kg│ 48000  │ Cancel  🔴│  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Service Options:                                                    │
│  ├─ Cuci Komplit          → 8000/kg                                │
│  ├─ Cuci + Setrika        → 12000/kg                               │
│  ├─ Setrika Saja          → 6000/kg                                │
│  ├─ Express Cuci Komplit  → 14000/kg                               │
│  └─ Express Cuci + Setrika→ 20000/kg                               │
│                                                                      │
│  Status Options:                                                     │
│  ├─ Pending     (🟡) → Order baru, belum diproses                  │
│  ├─ Processing  (🟠) → Admin sedang mengerjakan                    │
│  ├─ Completed   (🟢) → Cucian sudah selesai                        │
│  └─ Cancelled   (🔴) → Order dibatalkan                            │
│                                                                      │
│  Purpose: Store customer orders & track status                     │
│  Used By: HalamanMember.jsx, Orders.jsx                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

RELATIONSHIPS:
┌──────────────┐          ┌──────────────┐          ┌─────────────┐
│ users        │          │ members      │          │ orders      │
├──────────────┤          ├──────────────┤          ├─────────────┤
│ id (PK)      │          │ id (PK)      │◄──────┐ │ id (PK)     │
│ name         │          │ nama         │  many │ │ customer... │
│ email        │          │ no_hp        │       │ │ weight      │
│ password     │          │ password     │       │ │ total_price │
│ created_at   │          │ tier         │       │ │ status      │
│              │          │ poin         │       │ │ created_at  │
│              │          │ created_at   │       │ │             │
└──────────────┘          └──────────────┘       └─────────────┘
                                                     
Notes:
• users (1) ─→ (many) orders? NO DIRECT RELATION
           → Admin tidak "own" order, orders dari members saja
           
• members (1) ──→ (many) orders
           → 1 member bisa membuat banyak orders
           → Tapi tidak pakai FK, hanya customer_phone reference
           
Current Setup: No Foreign Keys
├─ orders.customer_phone → references members.no_hp
├─ Tidak ada explicit FK constraint di Supabase
└─ Manual referential integrity di aplikasi logic
```

---

## 6️⃣ SESSION MANAGEMENT (localStorage Keys)

```
                    💾 LOCAL STORAGE SESSION KEYS
                    ═════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│                        KEY 1: member_auth                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Purpose: Menyimpan data member yang sudah login                   │
│  Where: Browser localStorage                                       │
│  When Set: Setelah member berhasil login di LoginMember.jsx       │
│  When Cleared: Saat member logout via HalamanMember.jsx           │
│                                                                      │
│  Data Structure (JSON):                                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ {                                                            │  │
│  │   "id": 1,                                                  │  │
│  │   "nama": "Budi Santoso",                                   │  │
│  │   "no_hp": "08123456789",                                   │  │
│  │   "password": "budi123",                                    │  │
│  │   "tier": "Gold",                                           │  │
│  │   "poin": 150,                                              │  │
│  │   "created_at": "2024-01-05T10:00:00Z"                      │  │
│  │ }                                                            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Usage:                                                              │
│  ├─ LoginMember.jsx                                                 │
│  │  └─ Setelah login sukses: localStorage.setItem(...)            │
│  ├─ HalamanMember.jsx                                              │
│  │  ├─ On Mount: Check if exists (jika tidak → redirect login)   │
│  │  ├─ Load: const member = JSON.parse(localStorage.getItem(...))│
│  │  └─ Display: Tampilkan member data di dashboard               │
│  └─ handleLogout()                                                 │
│     └─ Saat logout: localStorage.removeItem("member_auth")        │
│                                                                      │
│  Flow:                                                               │
│  Register → Login → ✅ SET localStorage ↓                          │
│                ↓                                                    │
│          HalamanMember (Protected)                                 │
│          ├─ useEffect: Check localStorage ✓                       │
│          ├─ Display member data from localStorage                 │
│          └─ Logout → REMOVE localStorage                          │
│                                                                      │
│  Key Code Snippets:                                                 │
│  • Set: localStorage.setItem("member_auth", JSON.stringify(member))│
│  • Get: const auth = localStorage.getItem("member_auth")          │
│  • Parse: const member = JSON.parse(auth)                         │
│  • Remove: localStorage.removeItem("member_auth")                 │
│  • Check: if (!auth) redirect to login                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                         KEY 2: user_auth                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  Purpose: Menyimpan data admin/staff yang sudah login              │
│  Where: Browser localStorage                                       │
│  When Set: Setelah admin berhasil login di Login.jsx              │
│  When Cleared: Saat admin logout dari dashboard                   │
│                                                                      │
│  Data Structure (JSON):                                             │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │ {                                                            │  │
│  │   "id": 1,                                                  │  │
│  │   "name": "Admin Suci",                                     │  │
│  │   "email": "admin@ucilaundry.com",                          │  │
│  │   "password": "12345",                                      │  │
│  │   "created_at": "2024-01-01T08:00:00Z"                      │  │
│  │ }                                                            │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│  Usage:                                                              │
│  ├─ Login.jsx                                                       │
│  │  └─ Setelah login sukses: localStorage.setItem(...)            │
│  ├─ MainLayout.jsx / Dashboard.jsx                                 │
│  │  ├─ On Mount: Check if exists (jika tidak → redirect login)   │
│  │  └─ Load: const admin = JSON.parse(localStorage.getItem(...)) │
│  ├─ Orders.jsx, Users.jsx, Members.jsx (all protected)             │
│  │  └─ useEffect: Verify localStorage exists                      │
│  └─ Logout button (di Sidebar atau profile)                       │
│     └─ Saat logout: localStorage.removeItem("user_auth")          │
│                                                                      │
│  Flow:                                                               │
│  Login (admin@ucilaundry.com) → ✅ SET localStorage ↓             │
│                ↓                                                    │
│          MainLayout (Protected)                                    │
│          ├─ useEffect: Check localStorage ✓                       │
│          ├─ Load admin data from localStorage                     │
│          └─ Logout → REMOVE localStorage                          │
│                                                                      │
│  Key Code Snippets:                                                 │
│  • Set: localStorage.setItem("user_auth", JSON.stringify(user))   │
│  • Get: const auth = localStorage.getItem("user_auth")            │
│  • Parse: const user = JSON.parse(auth)                           │
│  • Remove: localStorage.removeItem("user_auth")                   │
│  • Check: if (!auth) redirect to login                            │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

COMPARISON:

┌─────────────────────────────────────────────────────────────────┐
│         member_auth (Customer)    │    user_auth (Admin)        │
├──────────────────────────────────┼────────────────────────────┤
│ Stores: Customer member data      │ Stores: Admin staff data   │
│ Set By: LoginMember.jsx           │ Set By: Login.jsx          │
│ Used By: HalamanMember.jsx        │ Used By: MainLayout.jsx    │
│ Protected Pages:                  │ Protected Pages:           │
│  • /halaman-member               │  • /admin                  │
│                                   │  • /orders                 │
│                                   │  • /users                  │
│                                   │  • /members                │
│                                   │  • /products               │
│                                   │  • /fitur-crm              │
│ Fields: {id, nama, no_hp,        │ Fields: {id, name, email,  │
│          password, tier, poin,   │          password,         │
│          created_at}              │          created_at}       │
│ Tier: Silver/Gold/Platinum       │ Role: Admin/Staff (fixed)  │
│ Logout: handleLogout()            │ Logout: handleLogout()     │
└──────────────────────────────────┴────────────────────────────┘

SECURITY NOTES ⚠️ (Development Only):
├─ Passwords stored as plain text in localStorage (NOT SECURE)
├─ localStorage dapat diakses via browser console
├─ XSS attacks bisa steal session tokens
├─ No token expiration (session persist sampai manual logout)
├─ No password encryption/hashing
└─ Recommendations:
   ├─ Use secure HTTP-only cookies instead
   ├─ Implement JWT token-based auth
   ├─ Hash passwords dengan bcrypt
   ├─ Set token expiration time
   └─ Use HTTPS only
```

---

## 7️⃣ API ENDPOINTS & HTTP METHODS

### **Members API**
| Method | Endpoint | Headers | Body | Response |
|--------|----------|---------|------|----------|
| **GET** | `/members` | apikey, Authorization, Content-Type | - | `[{id, nama, no_hp, ...}]` |
| **GET** | `/members?no_hp=eq.08123456789` | apikey, Authorization, Content-Type | - | `[{member}]` (single) |
| **POST** | `/members` | apikey, Authorization, Content-Type | `{nama, no_hp, password, tier, poin}` | `[{created_member}]` |
| **DELETE** | `/members?id=eq.1` | apikey, Authorization, Content-Type | - | `[]` |

### **Users API**
| Method | Endpoint | Headers | Body | Response |
|--------|----------|---------|------|----------|
| **GET** | `/users` | apikey, Authorization, Content-Type | - | `[{id, name, email, ...}]` |
| **GET** | `/users?email=eq.admin@ucilaundry.com` | apikey, Authorization, Content-Type | - | `[{user}]` (single) |
| **POST** | `/users` | apikey, Authorization, Content-Type | `{name, email, password}` | `[{created_user}]` |
| **DELETE** | `/users?id=eq.1` | apikey, Authorization, Content-Type | - | `[]` |

### **Orders API**
| Method | Endpoint | Headers | Body | Response |
|--------|----------|---------|------|----------|
| **GET** | `/orders?order=created_at.desc` | apikey, Authorization, Content-Type | - | `[{id, customer_name, ...}]` |
| **POST** | `/orders` | apikey, Authorization, Content-Type | `{customer_name, customer_phone, service_type, weight, total_price, status}` | `[{created_order}]` |
| **PATCH** | `/orders?id=eq.1` | apikey, Authorization, Content-Type | `{status: 'Processing'}` | `[{updated_order}]` |
| **DELETE** | `/orders?id=eq.1` | apikey, Authorization, Content-Type | - | `[]` |

---

## 8️⃣ SUPABASE AUTHENTICATION HEADERS

```javascript
const headers = {
  apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "Content-Type": "application/json",
  "Prefer": "return=representation"  // Return data setelah create/update
};
```

---

## 9️⃣ TECH STACK

```
Frontend:
├── React 18+ (UI Library)
├── React Router v6 (Client-side Routing)
├── Tailwind CSS (Styling)
├── react-icons (Icon Library)
├── Axios (HTTP Client)
└── localStorage (Session Management)

Backend/Database:
├── Supabase (PostgreSQL + REST API)
│   ├── users table
│   ├── members table
│   └── orders table
└── REST API (No backend server needed)

Deployment:
├── Vite (Build Tool)
└── Vercel (Hosting)
```

---

## 🔟 SECURITY NOTES

⚠️ **Current Implementation (Development):**
- Passwords stored as plain text di Supabase (NOT RECOMMENDED)
- API key exposed di frontend (development only)
- No JWT token validation

✅ **Production Recommendations:**
1. Use **bcrypt** untuk hash password
2. Move API key ke backend environment variables
3. Implement **JWT** token-based authentication
4. Add **CORS** policy restrictions
5. Use **Supabase Auth** built-in service
6. Add **input validation** on backend
7. Implement **rate limiting**
8. Use **HTTPS only**

---

## 1️⃣1️⃣ COMPLETE USER JOURNEYS (End-to-End)

```
╔═══════════════════════════════════════════════════════════════════════╗
║                   👤 MEMBER USER JOURNEY (Customer)                   ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  STEP 1: DISCOVER (Homepage)                                        ║
║  └─ Member buka aplikasi → Masuk GuestLaundry.jsx                  ║
║     ├─ Lihat layanan laundry dengan harga                           ║
║     ├─ Lihat keuntungan member (Silver/Gold/Platinum)              ║
║     ├─ Scroll ke bawah → Button [Daftar Sekarang]                  ║
║     └─ KLIK → Navigate /register-member                             ║
║                                                                       ║
║  STEP 2: REGISTER                                                    ║
║  └─ RegisterMember.jsx                                               ║
║     ├─ Input: Nama Lengkap → "Budi Santoso"                        ║
║     ├─ Input: Nomor HP → "08123456789"                             ║
║     ├─ Input: Password → "budi123"                                 ║
║     ├─ Validation: No HP check (tidak boleh duplikat)              ║
║     ├─ Submit → POST /members ke Supabase                          ║
║     ├─ Response: ✅ Member created (tier: Silver, poin: 0)         ║
║     └─ Redirect → /login-member                                    ║
║                                                                       ║
║  STEP 3: LOGIN                                                       ║
║  └─ LoginMember.jsx                                                  ║
║     ├─ Input: Nomor HP → "08123456789"                             ║
║     ├─ Input: Password → "budi123"                                 ║
║     ├─ Submit → GET /members dengan filter no_hp & password        ║
║     ├─ Response: ✅ Match found                                     ║
║     ├─ Save localStorage["member_auth"] = {...member_data}         ║
║     └─ Redirect → /halaman-member (Member Dashboard)              ║
║                                                                       ║
║  STEP 4: MEMBER DASHBOARD                                           ║
║  └─ HalamanMember.jsx (Protected - check localStorage)              ║
║     ├─ useEffect: Verify localStorage["member_auth"] exists        ║
║     │  └─ Jika tidak ada → Redirect /login-member                 ║
║     ├─ Load member data from localStorage                          ║
║     ├─ Tampilkan: Member Card                                      ║
║     │  ├─ Member Name: Budi Santoso                                ║
║     │  ├─ Tier: Silver ⭐                                          ║
║     │  ├─ Poin: 0                                                  ║
║     │  ├─ Diskon: 10%                                              ║
║     │  └─ Benefits: Gratis antar jemput radius 2km                 ║
║     ├─ Tampilkan: Tier Explanation (Silver/Gold/Platinum cards)   ║
║     └─ Button: [Form Order] [Logout]                               ║
║                                                                       ║
║  STEP 5: CREATE ORDER                                               ║
║  └─ Modal Form (triggered by [Form Order] button)                   ║
║     ├─ Field: Nama (auto-fill: "Budi Santoso")                    ║
║     ├─ Field: No. HP (auto-fill: "08123456789")                   ║
║     ├─ Field: Layanan (dropdown)                                   ║
║     │  ├─ Cuci Komplit - 8000/kg                                   ║
║     │  ├─ Cuci + Setrika - 12000/kg                                ║
║     │  ├─ Setrika Saja - 6000/kg                                   ║
║     │  ├─ Express Cuci Komplit - 14000/kg                          ║
║     │  └─ Express Cuci + Setrika - 20000/kg                        ║
║     ├─ Field: Berat Cucian (number input) → "5" kg                ║
║     ├─ Auto Calculate: Total = 8000 × 5 = Rp 40.000              ║
║     ├─ Button: [Cancel] [Create Order]                             ║
║     └─ KLIK [Create Order]:                                        ║
║        ├─ POST /orders ke Supabase                                 ║
║        ├─ Body: {customer_name, customer_phone, service, weight,   ║
║        │         total_price, status: "Pending"}                   ║
║        ├─ Response: ✅ Order created (ID 47)                       ║
║        ├─ Alert: "Order berhasil! Admin akan memproses"            ║
║        ├─ Modal close, form reset                                  ║
║        └─ Member tetap di HalamanMember.jsx                        ║
║                                                                       ║
║  STEP 6: TRACK ORDER (Optional)                                     ║
║  └─ Member tunggu admin process                                     ║
║     ├─ Bisa kembali ke form order untuk pesan lagi                ║
║     ├─ Bisa terus refresh halaman untuk cek status (admin harus    ║
║     │  buat status tracking page untuk member - belum ada)         ║
║     └─ Atau hubungi admin via WhatsApp (tombol sudah ada)         ║
║                                                                       ║
║  STEP 7: LOGOUT                                                      ║
║  └─ Member klik [Logout] button                                     ║
║     ├─ localStorage.removeItem("member_auth")                      ║
║     ├─ State reset                                                 ║
║     ├─ useEffect trigger redirect                                  ║
║     └─ Redirect → / (GuestLaundry.jsx)                             ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝

╔═══════════════════════════════════════════════════════════════════════╗
║                  👨‍💼 ADMIN USER JOURNEY (Staff)                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  STEP 1: LOGIN                                                       ║
║  └─ Admin di GuestLaundry.jsx                                        ║
║     ├─ Scroll ke bagian admin                                        ║
║     ├─ Button [Login Admin] → KLIK                                  ║
║     ├─ Navigate /login (AuthLayout)                                 ║
║     └─ Login.jsx                                                     ║
║        ├─ Input: Email → "admin@ucilaundry.com"                    ║
║        ├─ Input: Password → "12345"                                ║
║        ├─ Submit → POST /users ke Supabase                         ║
║        │  └─ Query: WHERE email & password match                   ║
║        ├─ Response: ✅ Match found                                  ║
║        ├─ Save localStorage["user_auth"] = {...admin_data}         ║
║        └─ Redirect → /admin (Dashboard)                            ║
║                                                                       ║
║  STEP 2: ADMIN DASHBOARD                                            ║
║  └─ Dashboard.jsx (Protected - check localStorage)                  ║
║     ├─ useEffect: Verify localStorage["user_auth"] exists          ║
║     │  └─ Jika tidak ada → Redirect /login                         ║
║     ├─ Tampilkan: Dashboard Stats                                  ║
║     │  ├─ Total Orders: 15                                         ║
║     │  ├─ Pending Orders: 3                                        ║
║     │  └─ Completed Orders: 12                                     ║
║     ├─ Tampilkan: Charts & Graphs                                  ║
║     └─ Navigation: Sidebar menu untuk browse pages                 ║
║                                                                       ║
║  STEP 3: VIEW ORDERS (Real-time)                                    ║
║  └─ Sidebar → Menu [Orders] KLIK → Navigate /orders                ║
║     ├─ Orders.jsx Load                                              ║
║     ├─ useEffect: GET /orders (initial load)                       ║
║     ├─ setInterval: GET /orders setiap 3 detik                     ║
║     ├─ Tampilkan: Orders Table                                     ║
║     │  ├─ Kolom: ID | Customer | Service | Weight | Status | Action │
║     │  ├─ Order 47 (Budi): Cuci Komplit | 5kg | 🟡 Pending        │
║     │  ├─ Order 46 (Siti): Cuci+Setrika | 3.5kg | 🟠 Processing  │
║     │  └─ Order 45 (Rina): Express | 2kg | 🟢 Completed          │
║     ├─ Button: [Refresh] (manual refresh)                          │
║     └─ Admin bisa: Update Status atau Delete                       ║
║                                                                       ║
║  STEP 4: UPDATE ORDER STATUS                                        ║
║  └─ Admin lihat order Budi (ID 47) dengan status Pending           ║
║     ├─ Klik Status Dropdown                                         ║
║     ├─ Select: "Processing" (ubah dari Pending)                    ║
║     ├─ PATCH /orders?id=eq.47                                      ║
║     │  └─ Body: { "status": "Processing" }                         ║
║     ├─ Supabase UPDATE: status changed                             ║
║     ├─ UI Update: Budi's order status 🟡 → 🟠                    ║
║     └─ Auto-refresh akan terus update setiap 3 detik              ║
║                                                                       ║
║  STEP 5: MANAGE USERS (Admin Staff CRUD)                            ║
║  └─ Sidebar → Menu [Users] KLIK → Navigate /users                  ║
║     ├─ Users.jsx Load                                               ║
║     ├─ GET /users → Tampilkan semua admin staff                    ║
║     ├─ Stats: Total Users, Active Users, Admin Staff               ║
║     ├─ Operations:                                                  ║
║     │  ├─ CREATE: [New User] button → Form Modal                  ║
║     │  │  ├─ Input: name, email, password                         ║
║     │  │  └─ POST /users → Add new admin                          ║
║     │  ├─ READ: [View] button → Detail Modal                      ║
║     │  └─ DELETE: [Delete] button → Confirmation                  ║
║     │     └─ DELETE /users → Remove admin                         ║
║     └─ Table: Name | Email | Password | Created | Action           ║
║                                                                       ║
║  STEP 6: MANAGE MEMBERS (Customer CRUD)                             ║
║  └─ Sidebar → Menu [Members] KLIK → Navigate /members              ║
║     ├─ Members.jsx Load                                             ║
║     ├─ GET /members → Tampilkan semua customers                    ║
║     ├─ Stats: Total Members, Silver Count, Gold Count              ║
║     ├─ Operations:                                                  ║
║     │  ├─ CREATE: [New Member] button → Form Modal                ║
║     │  │  ├─ Input: nama, no_hp, password, tier, poin             ║
║     │  │  └─ POST /members → Add new customer                     ║
║     │  ├─ READ: [View] button → Detail Modal                      ║
║     │  │  └─ Tampilkan: nama, no_hp, tier, poin, created_at      ║
║     │  └─ DELETE: [Delete] button → Confirmation                  ║
║     │     └─ DELETE /members → Remove customer                    ║
║     └─ Table: Nama | No HP | Tier | Poin | Created | Action       ║
║                                                                       ║
║  STEP 7: MANAGE PRODUCTS                                            ║
║  └─ Sidebar → Menu [Products] KLIK → Navigate /products            ║
║     └─ Products.jsx (existing functionality)                        ║
║                                                                       ║
║  STEP 8: LOGOUT                                                      ║
║  └─ Admin klik [Logout] button (di profile atau menu)              ║
║     ├─ localStorage.removeItem("user_auth")                        ║
║     ├─ State reset                                                 ║
║     └─ Redirect → / (GuestLaundry.jsx)                             ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝

KEY METRICS:
├─ Member registration time: ~2-3 seconds (depends on internet)
├─ Login time: ~1-2 seconds
├─ Order creation time: ~2-3 seconds
├─ Admin sees new order: ~3 seconds (next auto-refresh)
├─ Order status update: Real-time ~1 second
└─ Total member journey (register → order): ~10-15 seconds
```

---

## 1️⃣2️⃣ COMPLETE DATA FLOW: Member Order → Admin View

```
                    🔄 COMPLETE ORDER DATA FLOW
                    ═════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 1: MEMBER CREATES ORDER                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ User Interaction:                                                   │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ HalamanMember.jsx                                            │  │
│ │ Member Budi Santoso (localStorage["member_auth"] loaded)    │  │
│ │                                                              │  │
│ │ [Form Order] Button CLICKED                                │  │
│ │                ↓                                            │  │
│ │ Modal terbuka                                              │  │
│ │ ├─ Nama: Budi Santoso (auto-fill)                         │  │
│ │ ├─ No HP: 08123456789 (auto-fill)                         │  │
│ │ ├─ Layanan: [Select] → "Cuci Komplit"                     │  │
│ │ ├─ Berat: [5] kg                                          │  │
│ │ └─ Total: 8000 × 5 = 40000                                │  │
│ │                                                              │  │
│ │ [Create Order] Button CLICKED                              │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
└────────────────────────┬──────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 2: REQUEST CONSTRUCTION & TRANSMISSION                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ authAPI.createOrder() function called                              │
│                                                                      │
│ HTTP REQUEST DETAILS:                                              │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ Method:  POST                                                │  │
│ │ URL:     https://bejbfpuztkzeichehrqt.supabase.co/rest/v1/  │  │
│ │          orders                                             │  │
│ │                                                              │  │
│ │ Headers:                                                     │  │
│ │ {                                                           │  │
│ │   "apikey": "eyJhbGciOiJIUzI1NiIsI...",                     │  │
│ │   "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsI...",       │  │
│ │   "Content-Type": "application/json",                       │  │
│ │   "Prefer": "return=representation"                         │  │
│ │ }                                                           │  │
│ │                                                              │  │
│ │ Body (JSON):                                               │  │
│ │ {                                                           │  │
│ │   "customer_name": "Budi Santoso",                         │  │
│ │   "customer_phone": "08123456789",                         │  │
│ │   "service_type": "Cuci Komplit",                          │  │
│ │   "weight": 5,                                            │  │
│ │   "total_price": 40000,                                   │  │
│ │   "status": "Pending"                                     │  │
│ │ }                                                           │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ Network Transmission: ~100-500ms                                   │
│ (tergantung kecepatan internet)                                   │
│                                                                      │
└────────────────────────┬──────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 3: SUPABASE API PROCESSING                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Supabase REST API menerima request                                 │
│ ├─ Parse JSON body ✓                                              │
│ ├─ Validate authentication headers ✓                              │
│ └─ Route ke Supabase PostgreSQL database                           │
│                                                                      │
│ PostgreSQL INSERT Query:                                           │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ INSERT INTO orders (                                         │  │
│ │   customer_name,                                             │  │
│ │   customer_phone,                                            │  │
│ │   service_type,                                              │  │
│ │   weight,                                                    │  │
│ │   total_price,                                               │  │
│ │   status,                                                    │  │
│ │   created_at                                                 │  │
│ │ ) VALUES (                                                   │  │
│ │   'Budi Santoso',                                           │  │
│ │   '08123456789',                                            │  │
│ │   'Cuci Komplit',                                           │  │
│ │   5,                                                        │  │
│ │   40000,                                                    │  │
│ │   'Pending',                                                │  │
│ │   NOW()                                                     │  │
│ │ )                                                            │  │
│ │ RETURNING *;                                                 │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ Database Response: (Data yang di-return dengan Prefer header)      │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ {                                                            │  │
│ │   "id": 47,                                                │  │
│ │   "customer_name": "Budi Santoso",                         │  │
│ │   "customer_phone": "08123456789",                         │  │
│ │   "service_type": "Cuci Komplit",                          │  │
│ │   "weight": 5,                                             │  │
│ │   "total_price": 40000,                                    │  │
│ │   "status": "Pending",                                     │  │
│ │   "created_at": "2024-01-10T09:00:00Z"                     │  │
│ │ }                                                            │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ HTTP Response: 201 Created ✅                                      │
│ Transmit kembali ke Frontend: ~100-500ms                          │
│                                                                      │
└────────────────────────────┬──────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 4: MEMBER SIDE UI UPDATE                                      │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Response received di HalamanMember.jsx                             │
│ ├─ Alert: "Order berhasil dibuat! Admin akan segera memproses" ✅ │
│ ├─ Modal Close                                                     │
│ ├─ Form Reset:                                                     │
│ │  ├─ customer_name: "Budi Santoso" (masih terisi)               │
│ │  ├─ customer_phone: "08123456789" (masih terisi)               │
│ │  ├─ service_type: "" (kosong)                                  │
│ │  └─ weight: "" (kosong)                                        │
│ └─ Member tetap di HalamanMember.jsx                             │
│                                                                      │
│ localStorage Unchanged:                                           │
│ ├─ member_auth masih ada ✓ (belum logout)                        │
│ └─ Session masih aktif ✓                                         │
│                                                                      │
└────────────────────────────────────────────────────────────────────┘

                     ⏰ WAITING PERIOD: 0-3 seconds
                     (Next admin auto-refresh)

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 5: ADMIN AUTO-REFRESH (Real-time Sync)                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Admin sudah buka Orders.jsx tab                                    │
│ ├─ useEffect() di-set setiap component mount                       │
│ ├─ setInterval(() => fetchOrders(), 3000) → Jalan setiap 3 detik  │
│ │                                                                   │
│ │ REFRESH #1 (0s):  Order ID 46 saja                             │
│ │ REFRESH #2 (3s):  Order ID 47 MUNCUL! ← New Order!           │
│ │ REFRESH #3 (6s):  Order ID 47 masih ada                       │
│ │                                                                   │
│ └─ setInterval Trigger:                                           │
│    ├─ Call: authAPI.getOrders()                                   │
│    ├─ GET /orders?order=created_at.desc                           │
│    ├─ Response: [order_47, order_46, ...]                         │
│    ├─ setOrders(data) ← State update!                             │
│    └─ Component Re-render dengan data terbaru                     │
│                                                                      │
│ Admin Table Updated:                                              │
│ ┌──────────────────────────────────────────────────────────────┐  │
│ │ ID │ Customer      │ Service      │ Weight│ Status│ Action  │  │
│ ├──────────────────────────────────────────────────────────────┤  │
│ │ 47 │ Budi Santoso  │ Cuci Komplit  │ 5 kg │ 🟡    │ [Change] │  │
│ │    │ 08123456789   │              │      │Pending│ [Delete] │  │
│ ├──────────────────────────────────────────────────────────────┤  │
│ │ 46 │ Siti Maryam   │ Cuci+Setrika  │ 3.5kg│ 🟠    │ [Change] │  │
│ │    │ 08987654321   │              │      │Proces │ [Delete] │  │
│ └──────────────────────────────────────────────────────────────┘  │
│                                                                      │
│ ✅ Order dari member VISIBLE di admin dashboard dalam 3 detik!    │
│                                                                      │
└────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│ PHASE 6: ADMIN TAKES ACTION                                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│ Admin melihat order Budi (ID 47) dengan status Pending            │
│ ├─ Klik Dropdown Status untuk order ID 47                         │
│ ├─ Select "Processing"                                            │
│ ├─ PATCH /orders?id=eq.47                                         │
│ │  Body: { "status": "Processing" }                              │
│ ├─ Supabase UPDATE: status = 'Processing'                        │
│ ├─ UI Update: Status berubah 🟡 → 🟠                            │
│ └─ Ongoing auto-refresh tetap berjalan                          │
│                                                                      │
│ Beberapa jam kemudian...                                          │
│ ├─ Admin klik Status lagi                                        │
│ ├─ Select "Completed"                                            │
│ ├─ PATCH /orders?id=eq.47                                        │
│ │  Body: { "status": "Completed" }                              │
│ ├─ Supabase UPDATE: status = 'Completed'                         │
│ └─ UI Update: Status berubah 🟠 → 🟢                            │
│                                                                      │
│ ✅ Order workflow complete!                                       │
│                                                                      │
└────────────────────────────────────────────────────────────────────┘

SUMMARY:
• Member create order via form → POST /orders (step 1-3)
• Supabase save to database (step 3)
• Member see success alert, form reset (step 4)
• Admin auto-refresh every 3 seconds (step 5)
• New order appears in admin table within 3 seconds (step 5)
• Admin can change status via PATCH request (step 6)
• Status update reflects immediately in UI (step 6)
• All data synchronized real-time! ✅
```

---

## 1️⃣3️⃣ KEY FILES & RESPONSIBILITIES

```
src/
├── services/
│   └── authAPI.js ......................... Centralized Supabase API calls
│                                            - registerMember()
│                                            - loginMember()
│                                            - getMemberByPhone()
│                                            - createOrder()
│                                            - updateOrder()
│                                            - getOrders()
│                                            - registerUser()
│                                            - loginUser()
│                                            - getUsers()
│                                            - deleteUser()
│
├── pages/
│   ├── auth/
│   │   └── Login.jsx ...................... Admin/Staff login
│   ├── RegisterMember.jsx ................. Member registration form
│   ├── LoginMember.jsx .................... Member login form
│   ├── HalamanMember.jsx .................. Member dashboard (protected)
│   ├── Users.jsx .......................... Admin user management CRUD
│   ├── Members.jsx ........................ Admin member management CRUD
│   ├── Orders.jsx ......................... Admin order management + real-time
│   ├── Dashboard.jsx ...................... Admin dashboard stats
│   └── GuestLaundry.jsx ................... Public landing page
│
├── components/
│   └── Sidebar.jsx ........................ Navigation menu (admin)
│
├── layouts/
│   ├── MainLayout.jsx ..................... Admin layout wrapper
│   └── AuthLayout.jsx ..................... Login layout wrapper
│
└── App.jsx ............................... Main routing config
```

---

## 1️⃣4️⃣ QUICK REFERENCE - FUNCTION CALLS

### **Member Registration**
```javascript
// Step 1: Check if phone exists
const existingMember = await authAPI.getMemberByPhone(no_hp);
if (existingMember.length > 0) throw new Error("Phone already exists");

// Step 2: Register new member
const newMember = await authAPI.registerMember({
  nama: "Budi Santoso",
  no_hp: "08123456789",
  password: "budi123",
  tier: "Silver",
  poin: 0
});

// Step 3: Save to localStorage (after login)
localStorage.setItem("member_auth", JSON.stringify(newMember));
navigate("/halaman-member");
```

### **Order Creation**
```javascript
// Step 1: Calculate total price
const service = services.find(s => s.name === service_type);
const totalPrice = service.price * weight;

// Step 2: Create order
const order = await authAPI.createOrder({
  customer_name: member.nama,
  customer_phone: member.no_hp,
  service_type: "Cuci Komplit",
  weight: 5,
  total_price: 40000,
  status: "Pending"
});

// Step 3: Admin sees it in 3 seconds
// Orders.jsx auto-refreshes via setInterval
```

### **Admin Update Order Status**
```javascript
// Step 1: Admin clicks status button
const updatedOrder = await authAPI.updateOrder(orderId, {
  status: "Processing"
});

// Step 2: UI updates immediately
setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
```

---

## 📊 DIAGRAM SUMMARY

✅ **11 diagrams telah dibuat untuk menjelaskan:**
1. System Overview (keseluruhan)
2. Member Registration & Login
3. Member Order Creation (Real-time)
4. Admin Dashboard Flow
5. Database Schema (3 tables)
6. localStorage Keys (2 sessions)
7. API Endpoints & Methods
8. Supabase Headers & Authentication
9. Tech Stack
10. Complete User Journeys (Member + Admin)
11. Order Placement to Admin View (Data Flow)
12. File Structure & Responsibilities
13. Function Call Examples

---

## 🎯 FOR PRESENTATION TO CLIENT/TEAM

> **"UciLaundry adalah sistem laundry terintegrasi dengan 2 alur utama:"**
> 
> **Member Side:** Registrasi → Login → Order Laundry → Real-time Tracking
> 
> **Admin Side:** Manage Users, Members, Orders, Products dengan dashboard real-time
> 
> **Tech:** React + Supabase (PostgreSQL) + Tailwind CSS
> 
> **Key Features:**
> - Tier-based membership (Silver/Gold/Platinum)
> - Real-time order sync (3-second refresh)
> - CRUD management untuk users, members, orders
> - Session management via localStorage
> - Responsive design dengan Tailwind CSS

---

**Dibuat untuk: Pertemuan teknis dengan stakeholders/team**
**Updated: 2025**
