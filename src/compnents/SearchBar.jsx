import React, { useState, useEffect } from "react";

export default function SearchBar({ onSearch, setQuery }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  useEffect(() => {
    setQuery(input);
  }, [input, setQuery]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full bg-white rounded-2xl shadow-md overflow-hidden"
    >
      <input
        type="text"
        placeholder="🔍 Search by title..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow p-3 text-gray-700 outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-3 hover:bg-blue-700 transition"
      >
        Search
      </button>
    </form>
  );
}
