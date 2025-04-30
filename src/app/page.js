"use client";

import React, { useState, useEffect, useCallback } from "react";
import ItemCard from "@/components/ItemCard";
import Cart from "@/components/Cart";
import SearchBar from "@/components/SearchBar";
import ChatInput from "@/components/ChatInput";

const itemsPerPage = 10;

const Page = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
const url = process.env.NEXT_PUBLIC_API_URL;

console.log("url", url)
  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/items?search=${search}&page=${currentPage}&limit=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch items");

      const data = await res.json();
      if (Array.isArray(data.items)) {
        setItems(data.items);
        setTotalPages(data.totalPages || 1);
      } else {
        console.error("Items data is not an array", data);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  }, [search, currentPage]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem._id === item._id);
      return existing
        ? prev.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        : [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity:
                type === "increase"
                  ? item.quantity + 1
                  : Math.max(item.quantity - 1, 1),
            }
          : item
      )
    );
  };

  const handlePageChange = (newPage) => {
    if (newPage !== currentPage && newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-5xl text-center font-bold mb-6">Ordering Web App</h1>
      <ChatInput/>
      <SearchBar setSearch={setSearch} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 my-6">
        {items.length > 0 ? (
          items.map((item) => (
            <ItemCard key={item._id} item={item} addToCart={addToCart} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No items found
          </p>
        )}
      </div>

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      {totalPages > 1 && (
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-black rounded-md disabled:opacity-50"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-4 py-2 rounded-md cursor-pointer ${
                page === currentPage
                  ? "bg-black text-white"
                  : "bg-gray-300 text-black"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-black rounded-md cursor-pointer disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Page;
