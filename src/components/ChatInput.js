/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
const ChatInput = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await response.json();
      setResult(data.data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
    <input
      type="text"
      className="border p-2 flex-1 rounded"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Ask me anything... (e.g Show Accessories under $50)"
    />
    <button
      type="submit"
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      {loading ? "Searching..." : "Search"}
    </button>
    <button
      type="button"
      onClick={() => {
        setQuery("");
        setResult(null);
      }}
      className="bg-gray-400 text-white px-4 py-2 rounded"
    >
      Clear
    </button>
  </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {result && result.length > 0 ? (
          result.map((item) => (
            <div key={item._id} className="grid border p-4 rounded-lg shadow-md">
              <img
                src={item.imageSrc}
                alt={item.title}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
              <p className="text-sm text-gray-600">Type: {item.type}</p>
              <p className="text-sm text-gray-600">SKU: {item.variantSKU}</p>
              <p className="text-md font-bold">${item.variantPrice}</p>
            </div>
          ))
        ) : loading ? null : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};
export default ChatInput;
