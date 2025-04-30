/* eslint-disable @next/next/no-img-element */
import React from "react";
const ItemCard = ({ item, addToCart }) => {
  return (
    <div className="border p-4 rounded-lg shadow-md">
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
      <button
        onClick={() => addToCart(item)}
        className="mt-3 bg-blue-500 text-white py-1 px-3 rounded cursor-pointer hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ItemCard;
