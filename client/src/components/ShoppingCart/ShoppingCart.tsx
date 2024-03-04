import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

export default function ShoppingCart() {
  const { closeCart, cartItems, storeItems } = useShoppingCart();

  const totalPrice: number = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i._id === cartItem.id);
    let singleItem = item ? item.price / item.quantity : undefined;
    return total + (singleItem ? singleItem * cartItem.quantity : 0);
  }, 0);

  return (
    <div className="w-1/3 absolute z-10 p-2 right-0 top-24 bg-gray-200 border-l-2 border-b-2 border-solid border-black rounded-bl-lg">
      <div className="flex justify-between pb-2">
        <h2 className="text-xl  w-1/2 text-center">Shopping cart</h2>
        <button className="mr-2 hover:text-red-500" onClick={closeCart}>
          Close Cart
        </button>
      </div>
      {cartItems.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="flex justify-between pb-2">
        <h3 className="text-lg w-1/2 text-center">Total:</h3>
        <h3 className="text-md">${totalPrice}</h3>
      </div>
    </div>
  );
}
