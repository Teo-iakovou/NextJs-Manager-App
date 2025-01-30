"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const user = { name: "Admin", email: "admin@example.com" }; // Mocked user

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/auth/signin");
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white p-3 rounded"
      >
        Logout
      </button>
    </div>
  );
}
