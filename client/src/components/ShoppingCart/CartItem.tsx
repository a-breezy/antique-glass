import { useShoppingCart } from "../../context/ShoppingCartContext";
import sampleGlasses from "../../../public/assets/sampleGlasses.json";

type GlassCartItem = {
  _id: number;
  quantity: number;
};

type ItemProps = {
  glass: GlassCartItem;
};

export function CartItem(glass: GlassCartItem) {
  // add remove button
  const removeFromCart = useShoppingCart();

  // here I need to find item by id to render it in the shopping cart
  // involves making a call to mongodb for item
  // in testing just call items
  const item = sampleGlasses.find((i) => i._id === glass._id);

  return (
    <div>
      {/* {item.title} */}
      title
      <div>
        img
        {/* <img src={item.image} /> */}
      </div>
      <div>
        title, price, quant
        {/* <h3>{item.title}</h3>
        <p>{item.price}</p>
        <p>
          {item.quantity}
          </p> */}
      </div>
      <button onClick={() => removeFromCart}>Remove Item</button>
    </div>
  );
}
