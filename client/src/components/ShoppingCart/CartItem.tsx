import { useShoppingCart } from "../../context/ShoppingCartContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

type CartItem = {
  _id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart, storeItems } = useShoppingCart();

  const cartItem: CartItem | undefined = storeItems.find((i) => i._id === id);
  if (cartItem == null) return null;

  return (
    <div className="flex flex-row h-1/4 max-h-40 my-4">
      <div className="w-1/2 h-40">
        <img src={cartItem.image} className="h-full m-auto" />
      </div>
      <div className="px-2 pb-2 w-1/2 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <h3>{cartItem.title} Glass</h3>
            {/* get the price of item and multiply by the quantity in cart */}
            <p>${(cartItem.price / cartItem.quantity) * quantity}</p>
            <div>
              <p>Quantity: {quantity}</p>
            </div>
          </div>
          <div>
            <button
              className="px-1 border border-black rounded font-semibold hover:bg-red-300"
              onClick={() => removeFromCart(cartItem._id)}
            >
              X
            </button>
          </div>
        </div>
        {/* //! make this button a component and reuse on home page */}
        <div className="px-3 border border-black rounded flex justify-between">
          <button>+</button>
          <div>{quantity}</div>
          <button>+</button>
        </div>
      </div>
    </div>
  );
}
