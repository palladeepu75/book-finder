import React from "react";

export default function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/150x220?text=No+Cover";

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1 p-4 flex flex-col items-center text-center">
      <img
        src={coverUrl}
        alt={book.title || "Book Cover"}
        loading="lazy"
        className="w-36 h-48 object-cover rounded-md mb-3"
      />
      <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
        {book.title || "Unknown Title"}
      </h2>
      <p className="text-sm text-gray-600 mt-1">
        {book.author_name ? book.author_name[0] : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}
