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

const quantityStyles = ["border-blue-500", "border-black"];

export default function QuantityButton({ id, quantity, style }: Item) {
  const [maxQuantity, setMaxQuantity] = useState(false);
  const [buttonStyle, setButtonStyle] = useState(0);
  const [quantityStyle, setQuantityStyle] = useState(0);

  const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity } =
    useShoppingCart();

  const cartQuantity = getItemQuantity(id);

  useEffect(() => {
    if (style == "home") {
      setButtonStyle(0);
      setQuantityStyle(0);
    } else if (style == "cart") {
      setButtonStyle(1);
      setQuantityStyle(1);
    }
  }, []);

  useEffect(() => {
    if (cartQuantity === quantity) setMaxQuantity(true);
  }, [cartQuantity]);

  const handleQuantityDecrease = () => {
    if (cartQuantity === quantity) {
      setMaxQuantity(false);
      decreaseCartQuantity(id);
    } else {
      decreaseCartQuantity(id);
    }
  };

  const handleQuantityIncrease = () => {
    if (cartQuantity < quantity) {
      increaseCartQuantity(id);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        className={`px-5 border rounded-l-lg ${buttonStyles[buttonStyle]}`}
        onClick={() => handleQuantityDecrease()}
      >
        -
      </button>
      <div className={`border-y px-5 ${quantityStyles[quantityStyle]}`}>
        {cartQuantity}
      </div>
      <button
        className={`px-5 border ${
          maxQuantity ? "border-red-500 bg-red-200" : buttonStyles[buttonStyle]
        } rounded-r-lg`}
        onClick={() => handleQuantityIncrease()}
      >
        +
      </button>
    </div>
  );
}
