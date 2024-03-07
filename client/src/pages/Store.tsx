import { Fragment } from "react";
// import axios from "axios";
import { SingleGlass } from "../components/Home/SingleGlass";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Store() {
  const { storeItems } = useShoppingCart();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {storeItems!.map((item) => (
        <Fragment key={item._id}>
          <SingleGlass item={item} />
        </Fragment>
      ))}
    </div>
  );
}
