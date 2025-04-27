import React from "react";
import { Button } from "@/components/ui/button";
import noImage from "@/assets/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cartSlice";
const imageUrl = "https://image.tmdb.org/t/p/w200/";

const alreadyInCart = (cartItems, movie) =>
  cartItems.some((item) => item.id === movie.id);;

const Card = ({ movie }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <div className="rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300">
      <div className="h-40 bg-neutral-700 flex items-center justify-center text-2xl text-white font-bold">
        <img
          src={movie.poster_path ? `${imageUrl}${movie.poster_path}` : noImage}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="text-sm font-semibold truncate">{movie.title}</div>
        <div className="text-red-400 font-medium">0</div>
        {alreadyInCart(cartItems, movie) ? (
          <Button
            size="sm"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => dispatch(removeFromCart(movie))}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full bg-red-600 hover:bg-red-700"
            onClick={() => dispatch(addToCart(movie))}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default Card;
