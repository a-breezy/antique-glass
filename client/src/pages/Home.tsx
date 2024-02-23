import { useState, Fragment } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
import { SingleGlass } from "../components/Home/SingleGlass";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Home() {
  // const [glasses, setGlasses] = useState<GlassItem[] | null>([]);
  const [loading, setLoading] = useState(false);
  const { storeItems } = useShoppingCart();

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {storeItems!.map((item) => (
            <Fragment key={item._id}>
              <SingleGlass item={item} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
