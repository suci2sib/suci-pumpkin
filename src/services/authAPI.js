import axios from 'axios';

// Ganti <project-url> dan <no-api-key> sesuai dengan Supabase kamu
// Asumsi: Kamu membuat tabel bernama 'users' di Supabase
const API_URL = "https://bejbfpuztkzeichehrqt.supabase.co/rest/v1/users"; 
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamJmcHV6dGt6ZWljaGVocnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjkwODgsImV4cCI6MjA5NzAwNTA4OH0.qeWd5DVWYx3s0fggOxpP_EcCJCcnOb7dJ6DMAasmvCw";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    // Tambahkan header Prefer agar Supabase mengembalikan data setelah create
    "Prefer": "return=representation" 
};



export const authAPI = {
    // Fungsi Register: Mengirim data user baru ke tabel
    async registerUser(userData) {
        const response = await axios.post(API_URL, userData, { headers });
        return response.data;
    },

    // Fungsi Login: Mencari user dengan email dan password yang cocok
    // Di Supabase REST, pencarian menggunakan parameter query string (eq = equals)
    async loginUser(email, password) {
        const queryUrl = `${API_URL}?email=eq.${email}&password=eq.${password}`;
        const response = await axios.get(queryUrl, { headers });
        return response.data;
    }
};