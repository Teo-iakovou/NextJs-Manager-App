"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) return;

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/challenges`,
        {
          headers: { Authorization: `Bearer ${token}` }, // 🔥 Protect API calls
        }
      );

      setChallenges(response.data);
    } catch (err) {
      setError("Failed to fetch challenges.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold">Challenges</h1>
        <a href="/dashboard/challenges/create" className="text-blue-500">
          + Create New Challenge
        </a>

        {error && <p className="text-red-500">{error}</p>}
        <ul className="mt-4">
          {challenges.map((challenge) => (
            <li key={challenge.id} className="border p-3 mb-2 bg-white">
              <strong>{challenge.title}</strong> ({challenge.level})
              <div>
                <a
                  href={`/dashboard/challenges/${challenge.id}`}
                  className="text-green-500"
                >
                  Edit
                </a>{" "}
                |{" "}
                <button
                  className="text-red-500"
                  onClick={() => deleteChallenge(challenge.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
