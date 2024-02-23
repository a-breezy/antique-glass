import { useShoppingCart } from "../../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

// type ShoppingCartProps = {
//     cartQuantity: number;
// }

export default function ShoppingCart() {
  const { closeCart, cartItems, fetchData } = useShoppingCart();

  
  // console.log(cartItems);
  console.log(fetchData())
  return (
    <div className="w-1/3 absolute z-10 p-2 right-0 top-24 bg-gray-200 border-l-2 border-b-2 border-solid border-black rounded-bl-lg">
      <div className="flex justify-between">
        <h2 className="text-xl basis-2/3">Shopping cart</h2>
        <button className="mr-2" onClick={closeCart}>
          X
        </button>
      </div>
      <div>
        {cartItems.map((item) => (
          <div key={item._id}>
            <CartItem key={item._id} glass={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
