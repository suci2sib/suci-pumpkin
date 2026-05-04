export const ordersData = Array.from({ length: 30 }, (_, i) => ({
  id: `ORD-2026-${100 + i}`,
  customerName: ["Suci Ramadani", "Ahmad Fauzi", "Rian Hidayat", "Siti Aminah", "Budi Santoso"][i % 5],
  serviceType: ["Wash & Fold", "Dry Clean", "Wash Only", "Ironing"][i % 4],
  weight: (Math.random() * 10 + 1).toFixed(1),
  pickupDate: `2026-05-${(i % 28) + 1}`,
  status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Completed" : "Canceled",
  totalPrice: (Math.random() * 50 + 10).toFixed(2),
}));

export const customersData = Array.from({ length: 30 }, (_, i) => ({
  id: `CST-${500 + i}`,
  name: ["Samantha", "Suci Ramadani", "Budi Santoso", "Dewi Lestari", "Andi Wijaya"][i % 5],
  phone: `0812-3456-${7000 + i}`,
  preferredService: ["Wash & Fold", "Dry Clean", "Wash Only", "Ironing"][i % 4],
  loyalty: i % 3 === 0 ? "Bronze" : i % 3 === 1 ? "Silver" : "Gold",
}));