import { IoCartOutline, IoCart } from "react-icons/io5";
import { useShoppingCart } from "../../context/ShoppingCartContext";

export default function CartButton() {
  const { cartQuantity, toggleCart } = useShoppingCart();

  return (
    <button className="w-full h-full relative" onClick={toggleCart}>
      {!cartQuantity ? (
        <IoCartOutline className="w-full h-full" />
      ) : (
        <div>
          <IoCart className="w-full h-full" />
          <div className="absolute lg:bottom-1.5 bottom-12 -right-1 w-6 rounded-full bg-red-400 text-white">
            {cartQuantity}
          </div>
        </div>
      )}
    </button>
  );
}
