import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";

type Item = {
  id: number;
  quantity: number;
  style: string;
};

const buttonStyles = [
  "border-blue-500 bg-blue-500 hover:bg-blue-600",
  "border-black hover:bg-blue-100",
];

export default function QuantityButton({ id, quantity, style }: Item) {
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(0);

  const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();

  const cartQuantity = getItemQuantity(id);

  const checkMaxQuantity = () => {
    if (getItemQuantity(id) == quantity) {
      setMaxQuantity(false);
      decreaseCartQuantity(id);
    }
    decreaseCartQuantity(id);
  };

  // style 0 is for home button
  // style 1 is for cart button
  useEffect(() => {
    if (style == "home") {
      setButtonStyle(0);
    } else if (style == "cart") {
      setButtonStyle(1);
    }
  }, []);

  return (
    <div className="flex justify-center">
      <button
        className={`px-5 border rounded-l-lg ${buttonStyles[buttonStyle]}`}
        onClick={() => {
          checkMaxQuantity();
        }}
      >
        -
      </button>
      <div className="border-y px-5 border-blue-500">{cartQuantity}</div>
      <button
        className={`px-5 border ${
          maxQuantity ? "border-red-500 bg-red-200" : buttonStyles[buttonStyle]
        } rounded-r-lg`}
        onClick={() => {
          {
            console.log(getItemQuantity(id));
            if (getItemQuantity(id) < quantity) {
              increaseCartQuantity(id);
              if (getItemQuantity(id) == quantity - 1) setMaxQuantity(true);
            }
          }
        }}
      >
        +
      </button>
    </div>
  );
}
