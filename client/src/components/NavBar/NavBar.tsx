import { Link } from "react-router-dom";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import CartButton from "./CartButton";
import { useVendor } from "../../context/VendorContext";
import Auth from "../../utils/auth";

export default function NavBar() {
  const { cartQuantity, isOpen } = useShoppingCart();
  const { logIn, setLogIn } = useVendor();

  const handleLogout = () => {
    setLogIn(false);
    Auth.logout();
  };

  return (
    <div className="flex justify-between flex-row flex-wrap lg:h-36 h-48 shadow-lg p-4 bg-slate-200">
      <div className="flex flex-col flex-wrap place-content-center text-center">
        <Link to="/">
          <h1 className="text-3xl font-serif">Antique Glass</h1>
          <h2 className="text-xl">Your Place for Unique Glassware</h2>
        </Link>
      </div>
      {/* add buttons for various pages */}
      <div className="flex flex-row w-1/3 lg:justify-around justify-center items-center">
        <Link to="/store">
          <h2 className="px-2">Store</h2>
        </Link>
        <Link to="/about">
          <h2 className="px-2">About</h2>
        </Link>
        {logIn ? (
          <>
            <Link to="/dashboard">
              <h2 className="px-2">Dashboard</h2>
            </Link>
            <h2 className="px-2 cursor-pointer" onClick={handleLogout}>
              Logout
            </h2>
          </>
        ) : (
          <>
            <Link to="/login">
              <h2 className="px-2">Login</h2>
            </Link>
            <Link to="/signup">
              <h2 className="px-2">Sign Up</h2>
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-wrap content-center w-11">
        <CartButton />
        {isOpen && cartQuantity ? <ShoppingCart /> : null}
      </div>
    </div>
  );
}
