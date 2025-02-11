"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const savedEmail = localStorage.getItem("adminEmail");
        const savedPassword = localStorage.getItem("adminPassword");
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "syedfawwadali10@gmail.com" && password === "admin123") {
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "Welcome to Admin Panel",
            }).then(() => {
                localStorage.setItem("adminEmail", email);
                localStorage.setItem("adminPassword", password);
                router.push("/admin/dashboard");
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Email or Password",
            });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-900 to-black">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
                <h2 className="text-3xl font-semibold text-center mb-4 neon-text">FD-Bites Admin</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        required
                        className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-white"
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-white pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-2 text-gray-400 hover:text-white"
                        >
                            {showPassword ? "👁" : "🔒"}
                        </button>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}