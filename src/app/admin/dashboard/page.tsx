"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FaTrash, FaSignOutAlt, FaFilter, FaSearch } from "react-icons/fa";

interface Order {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  phone: string;
  city: string;
  zipCode: string;
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
    router.push("/admin");
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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-neon tracking-widest">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-4 mb-6">
        <div className="relative w-1/3">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            className="p-2 pl-10 bg-gray-800 border border-gray-600 rounded-lg w-full focus:ring-2 focus:ring-neon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaFilter className="absolute left-3 top-3 text-gray-400" />
          <select
            className="p-2 pl-10 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-neon"
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
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-900 rounded-lg shadow-xl text-center">
          <thead>
            <tr className="bg-gray-700 text-neon">
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-700 transition-all">
                  <td className="py-3 px-4">{order.firstName} {order.lastName}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.address1}, {order.city} ({order.zipCode})</td>
                  <td className="py-3 px-4 font-bold text-green-400">${order.total.toFixed(2)}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      order.status === "Pending" ? "text-yellow-400" :
                      order.status === "Shipped" ? "text-blue-400" :
                      order.status === "Delivered" ? "text-green-400" :
                      "text-red-400"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="flex items-center bg-red-500 px-3 py-1 rounded-lg hover:bg-red-700 transition-all duration-300"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-6 text-gray-400">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}