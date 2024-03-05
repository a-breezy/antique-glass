import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CartButton from "./CartButton";

export default function NavBar() {
  const { cartQuantity, isOpen } = useShoppingCart();

  return (
    <div className="flex justify-between flex-wrap shadow-lg p-4 bg-slate-200">
      <div className="flex flex-row w-1/2 justify-around">
        <div className="flex flex-col text-center">
          <Link to="/">
            <h1 className="text-3xl">Antique Glass</h1>
          </Link>
          <h2 className="text-xl">Your Place for Unique Glassware</h2>
        </div>
        {/* add buttons for various pages */}
        <div className="flex lg:flex-row flex-col w-1/3 lg:justify-around justify-center items-center">
          <h2 className="px-2">Store</h2>
          <Link to="/about"><h2 className="px-2">About</h2></Link>
        </div>
      </div>

      <div className="flex flex-wrap content-center w-11">
        <CartButton />
        {isOpen && cartQuantity ? <ShoppingCart /> : null}
      </div>
    </div>
  );
}
