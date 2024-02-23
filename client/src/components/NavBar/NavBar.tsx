import { Link } from "react-router-dom";
import { IoCartOutline, IoCart } from "react-icons/io5";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

export default function NavBar() {
  const { cartQuantity, isOpen, toggleCart } = useShoppingCart();

  return (
    <div className="flex justify-between flex-wrap shadow-lg p-4 bg-slate-200">
      <div className="flex flex-col text-center">
        <Link to="/">
          <h1 className="text-3xl">Antique Glass</h1>
        </Link>
        <h2 className="text-xl">Your Place for Unique Glassware</h2>
      </div>

      {/* add buttons for various pages */}
      <div className="flex flex-row justify-items-start items-center">
        <h2 className="px-2">Store</h2>
        <h2 className="px-2">About</h2>
      </div>

      <div className="flex flex-wrap content-center w-11">
        <button className="w-full h-full relative" onClick={toggleCart}>
          {!cartQuantity ? (
            <IoCartOutline className="w-full h-full" />
          ) : (
            <div>
              <IoCart className="w-full h-full" />
              <div className="absolute bottom-1.5 -right-1 w-6 rounded-full bg-red-400 text-white">
                {cartQuantity}
              </div>
            </div>
          )}
        </button>
        {isOpen && cartQuantity ? (
          <ShoppingCart />
        ) : null}
      </div>
    </div>
  );
}
