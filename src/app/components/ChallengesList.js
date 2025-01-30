"use client";

import { useEffect, useState } from "react";
import { BsCheck2Circle } from "react-icons/bs";
import { LuFileSpreadsheet } from "react-icons/lu";
import { FaRegHourglass } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchChallenges();
  }, [currentPage, searchQuery]);

  const fetchChallenges = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/challenges`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage, limit: 5, search: searchQuery },
        }
      );
      setChallenges(response.data.challenges);
      setTotalPages(response.data.totalPages);
      setError("");
    } catch (err) {
      setError("Failed to load challenges.");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Challenges</h1>
      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Search challenges..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="p-2 border rounded w-full mb-4"
      />

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="p-2 border-b">Title</th>
            <th className="p-2 border-b">Category</th>
            <th className="p-2 border-b">Difficulty</th>
            <th className="p-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {challenges.map((challenge) => (
            <tr key={challenge.id} className="border-t">
              <td className="p-2">{challenge.title}</td>
              <td className="p-2">{challenge.category}</td>
              <td className="p-2">{challenge.level}</td>
              <td className="p-2">
                <span className="flex items-center space-x-1">
                  {challenge.status === "Completed" ? (
                    <BsCheck2Circle />
                  ) : challenge.status === "Attempted" ? (
                    <LuFileSpreadsheet />
                  ) : (
                    <FaRegHourglass />
                  )}
                  <span>{challenge.status}</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ChallengesList;
