import { Fragment } from "react";
import { SingleProduct } from "../components/Home/SingleProduct";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Store() {
  const { storeItems } = useShoppingCart();

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {storeItems!.map((item) => (
        <Fragment key={item._id}>
          <SingleProduct item={item} />
        </Fragment>
      ))}
    </div>
  );
}
