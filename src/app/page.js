"use client";

import Navbar from "./components/Navbar";
import CategoriesList from "./components/CategoriesList";
import ChallengesList from "./components/ChallengesList";
import TrendingCategoriesBox from "./components/TrendingCategoriesBox";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <Navbar />
      <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="p-6 rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
            <CategoriesList />
            <ChallengesList />
          </div>
        </div>
        <div className="w-full lg:w-1/3 space-y-6">
          <TrendingCategoriesBox />
        </div>
      </div>
    </div>
  );
}
