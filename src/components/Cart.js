import React from "react";

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center border-b pb-4"
        >
          <div>
            <p>Name: {item.title}</p>
            <p>Quantity: {item.quantity}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => updateQuantity(item._id, "decrease")}
              disabled={item.quantity <= 1}
              className="px-3 py-1 bg-blue-500 cursor-pointer rounded-md"
            >
              -
            </button>

            <button
              onClick={() => updateQuantity(item._id, "increase")}
              className="px-3 py-1 bg-blue-500 cursor-pointer rounded-md"
            >
              +
            </button>
            <button
              onClick={() => removeFromCart(item._id)}
              className="px-4 py-1 bg-red-500 cursor-pointer text-white rounded-md"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
