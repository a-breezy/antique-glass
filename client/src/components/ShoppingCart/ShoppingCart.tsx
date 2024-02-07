import { useContext } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

type ShoppingCartProps = {
    cartQuantity: number;
}

export default function ShoppingCart({ cartQuantity }: ShoppingCartProps) {
  const {closeCart} = useShoppingCart()
  return (
    <div className="w-1/3 absolute z-10 p-2 right-0 top-24 bg-gray-200 border-l-2 border-b-2 border-solid border-black rounded-bl-lg">
      <div className="flex justify-between">
        <h2 className="text-xl basis-2/3">Shopping cart</h2>
        <button className="mr-2" onClick={closeCart}>X</button>
      </div>
      <div>
        <p>Shopping cart items</p>
        <p>Shopping cart items</p>
        <p>Shopping cart items</p>
        <p>Shopping cart items</p>
        <p>Shopping cart items</p>
      </div>
    </div>
  );
}
