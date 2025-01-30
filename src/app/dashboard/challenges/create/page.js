"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CreateChallenge() {
  const router = useRouter();
  const [challenge, setChallenge] = useState({
    title: "",
    category: "",
    description: "",
    level: "Easy",
  });

  const handleChange = (e) => {
    setChallenge({ ...challenge, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_JSON_SERVER_URL}/challenges`,
        challenge
      );
      router.push("/dashboard/challenges");
    } catch (error) {
      console.error("Error creating challenge:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">Create Challenge</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={challenge.title}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={challenge.category}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={challenge.description}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
          required
        ></textarea>
        <select
          name="level"
          value={challenge.level}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="Easy">Easy</option>
          <option value="Moderate">Moderate</option>
          <option value="Hard">Hard</option>
        </select>
        <button
          type="submit"
          className="w-full p-3 bg-blue-500 text-white rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
