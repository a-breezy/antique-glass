import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
import { SingleGlass } from "../components/Home/SingleGlass";

//! for testing delete when finished
import sampleGlasses from "../../public/assets/sampleGlasses.json";
import { useShoppingCart } from "../context/ShoppingCartContext";

type GlassItem = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: string;
  price: number;
  offerPrice: number;
  availability: boolean;
  image: string;
};

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
              <SingleGlass glass={item} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
