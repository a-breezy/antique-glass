import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

export default function ShoppingCart() {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <div className="w-1/3 absolute z-10 p-2 right-0 top-24 bg-gray-200 border-l-2 border-b-2 border-solid border-black rounded-bl-lg">
      <div className="flex justify-between pb-2">
        <h2 className="text-xl  w-1/2 text-center">Shopping cart</h2>
        <button className="mr-2 hover:text-red-500" onClick={closeCart}>
          Close Cart
        </button>
      </div>
      {cartItems.map((item) => {
        console.log(cartItems.length);
        return <CartItem key={item.id} {...item} />;
      })}
    </div>
  );
}
