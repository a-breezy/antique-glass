import { useState } from "react";
import { IoCart, IoCartOutline } from "react-icons/io5";

export default function Cart() {
  const [fullCart, setfullCart] = useState(false);
  const [showCart, setShowCart] = useState(false);

  return (
    <div>
      {!fullCart ? (
        <IoCartOutline size={30} onClick={() => setShowCart(true)} />
      ) : (
        <IoCart size={30} onClick={() => setShowCart(true)} />
      )}
    </div>
  );
}
