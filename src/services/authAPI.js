import axios from 'axios';

const SUPABASE_URL = "https://bejbfpuztkzeichehrqt.supabase.co/rest/v1";
const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlamJmcHV6dGt6ZWljaGVocnF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0MjkwODgsImV4cCI6MjA5NzAwNTA4OH0.qeWd5DVWYx3s0fggOxpP_EcCJCcnOb7dJ6DMAasmvCw";

const headers = {
    apikey: API_KEY,
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
    "Prefer": "return=representation" 
};

export const authAPI = {
    // ===== USERS API (ADMIN) =====
    async registerUser(userData) {
        const response = await axios.post(`${SUPABASE_URL}/users`, userData, { headers });
        return response.data;
    },

    async loginUser(email, password) {
        const queryUrl = `${SUPABASE_URL}/users?email=eq.${email}&password=eq.${password}`;
        const response = await axios.get(queryUrl, { headers });
        return response.data;
    },

    // ===== MEMBERS API =====
    async registerMember(memberData) {
        const response = await axios.post(`${SUPABASE_URL}/members`, memberData, { headers });
        return response.data;
    },

    async loginMember(noHp, password) {
        const queryUrl = `${SUPABASE_URL}/members?no_hp=eq.${noHp}&password=eq.${password}`;
        const response = await axios.get(queryUrl, { headers });
        return response.data;
    },

    async getMemberByPhone(noHp) {
        const queryUrl = `${SUPABASE_URL}/members?no_hp=eq.${noHp}`;
        const response = await axios.get(queryUrl, { headers });
        return response.data;
    },

    // ===== ORDERS API =====
    async getOrders() {
        const response = await axios.get(`${SUPABASE_URL}/orders?order=created_at.desc`, { headers });
        return response.data;
    },

    async createOrder(orderData) {
        const response = await axios.post(`${SUPABASE_URL}/orders`, orderData, { headers });
        return response.data;
    },

    async updateOrder(orderId, updateData) {
        const response = await axios.patch(`${SUPABASE_URL}/orders?id=eq.${orderId}`, updateData, { headers });
        return response.data;
    },

    async deleteOrder(orderId) {
        const response = await axios.delete(`${SUPABASE_URL}/orders?id=eq.${orderId}`, { headers });
        return response.data;
    }
};