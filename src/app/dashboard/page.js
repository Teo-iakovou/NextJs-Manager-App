"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");

    if (!token) {
      router.push("/auth/signin");
    } else {
      // Fetch user details if necessary
      setUser({ name: "Admin" }); // Placeholder
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}</h1>
        <p>Manage coding challenges and user profiles from here.</p>
        <div className="mt-6">
          <a href="/dashboard/challenges" className="text-blue-500">
            Manage Challenges
          </a>
          <br />
          <a href="/dashboard/profile" className="text-blue-500">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
}
