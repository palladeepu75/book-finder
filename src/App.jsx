import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import BookCard from "./components/BookCard";

export default function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  // Fetch default books on load
  useEffect(() => {
    fetchBooks("javascript");
  }, []);

  // Reload defaults when query cleared
  useEffect(() => {
    if (query.trim() === "") {
      fetchBooks("javascript");
    }
  }, [query]);

  const fetchBooks = async (title) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}`
      );
      const data = await response.json();
      setBooks(data.docs.slice(0, 20));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setQuery(term);
    if (term.trim() !== "") {
      fetchBooks(term);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-200 p-6">
      {/* Test Header for Tailwind */}
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
        📚 Book Finder
      </h1>

      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
          Search Books
        </h2>

        <SearchBar onSearch={handleSearch} setQuery={setQuery} />

        <p className="text-sm text-gray-600 mt-4 text-center">
          Type a book title and press Search
        </p>

        {/* Book Display */}
        <div className="mt-10 w-full border border-gray-200 rounded-2xl bg-white/70 shadow-inner p-6">
          {loading ? (
            <p className="text-center text-gray-700 font-medium animate-pulse">
              Loading books...
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.length > 0 ? (
                books.map((book, index) => <BookCard key={index} book={book} />)
              ) : (
                <p className="col-span-full text-center text-gray-600">
                  No books found.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
