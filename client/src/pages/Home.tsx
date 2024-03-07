import { useState, Fragment } from "react";
import { SingleGlass } from "../components/Home/SingleGlass";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { Link } from "react-router-dom";

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
        }}
        className="flex flex-wrap place-content-center bg-no-repeat lg:bg-center-bottom bg-center bg-cover"
      >
        <div className="flex flex-wrap place-content-center border border-slate-600 bg-slate-200 hover:bg-slate-400 opacity-80 hover:opacity-70 w-60 h-24">
          <Link to="/store">
            <h2 className="font-mono">Come see our store</h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
