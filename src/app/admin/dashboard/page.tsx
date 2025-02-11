"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  phone: string;
  city: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
  status: string;
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const query = `*[_type == "order"] | order(_createdAt desc)`;
      const data = await client.fetch(query);
      setOrders(data);
    };
    fetchOrders();
  }, []);

  // Delete Order Function
  const deleteOrder = async (orderId: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      await client.delete(orderId);
      setOrders(orders.filter((order) => order._id !== orderId));
      Swal.fire("Deleted!", "Order has been deleted.", "success");
    }
  };

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPassword");
    router.push("/admin/login");
  };

  // Filter Orders Based on Search & Status
  const filteredOrders = orders.filter(
    (order) =>
      (statusFilter === "All" || order.status === statusFilter) &&
      (order.firstName.toLowerCase().includes(search.toLowerCase()) ||
        order.lastName.toLowerCase().includes(search.toLowerCase()) ||
        order.email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold text-neon">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-700 transition">
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search orders..."
          className="p-2 bg-gray-800 border border-gray-600 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="p-2 bg-gray-800 border border-gray-600 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Orders</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-neon">
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Total</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-700">
                <td className="py-2 px-4">{order.firstName} {order.lastName}</td>
                <td className="py-2 px-4">{order.email}</td>
                <td className="py-2 px-4">{order.address}</td>
                <td className="py-2 px-4">${order.total}</td>
                <td className="py-2 px-4">{order.status}</td>
                <td className="py-2 px-4">
                  <button onClick={() => deleteOrder(order._id)} className="bg-red-500 px-3 py-1 rounded hover:bg-red-700">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}