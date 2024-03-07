import { useState, Fragment } from "react";
import { SingleGlass } from "../components/Home/SingleGlass";
import { useShoppingCart } from "../context/ShoppingCartContext";

export default function Home() {
  // const [glasses, setGlasses] = useState<GlassItem[] | null>([]);
  const [loading, setLoading] = useState(false);
  const { storeItems } = useShoppingCart();

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/assets/imgs/home-banner.jpg)",
          width: "100vw",
          height: "calc(100vh - 9rem)",
          backgroundSize: "100%",
          backgroundPosition: "center bottom"
        }}
      >
        test
        {/* <img src={banner} /> */}
      </div>
    </div>
  );
}
