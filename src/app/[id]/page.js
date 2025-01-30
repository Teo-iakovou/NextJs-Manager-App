"use client";

import { useParams } from "next/navigation";
import Navbar from "../components/Navbar";

export default function DynamicPage() {
  const { id } = useParams();

  if (id === "leaderboard") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          {/* Add leaderboard components */}
        </div>
      </div>
    );
  }

  if (id === "staff") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold">Staff Page</h1>
          {/* Add staff-related components */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      </div>
    </div>
  );
}
