import React from 'react'
import { Link } from "react-router";
import { ShoppingCart } from "lucide-react"; // ใช้ icon ของ lucide
import { useSelector } from "react-redux"; // ดึง cartItems มานับจำนวน

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <nav>
      <div className="flex  justify-between items-center bg-gray-800 text-white p-4 mb-4">
        <div className="flex items-center">
          <Link to="/todo-list">
            <h1 className="text-2xl font-bold">Todo List</h1>
          </Link>

          <h1 className="text-2xl font-bold mx-4">|</h1>
          <Link to="/movie">
            <h1 className="text-2xl font-bold">Movie</h1>
          </Link>
        </div>
        <div className="relative">
          <Link to="/cart">
            <ShoppingCart className="w-8 h-8" />
            {cartItems.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </div>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar