import { useShoppingCart } from "../../context/ShoppingCartContext";

type CartItemProps = {
  id: number;
  quantity: number;
};

type CartItem = {
  _id: number;
  title: string;
  price: number;
  image: string;
};

export function CartItem({ id, quantity }: CartItemProps) {
  // add remove button
  const { removeFromCart, storeItems } = useShoppingCart();

  const cartItem: CartItem | undefined = storeItems.find((i) => i._id === id);
  if (cartItem == null) return null;
  console.log(cartItem);

  return (
    <div>
      <div>
        <img src={cartItem.image} />
      </div>
      <div>
        title, price, quant
        <h3>{cartItem.title}</h3>
        <p>{cartItem.price}</p>
        <p>{quantity}</p>
      </div>
      <button onClick={() => removeFromCart(cartItem._id)}>Remove Item</button>
    </div>
  );
}
