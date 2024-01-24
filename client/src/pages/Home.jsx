import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
// import { Link } from "react-router-dom";
import GlassCard from "../components/Home/GlassCard";
import Cart from "../components/Home/Cart";


export default function Home() {
  const [glasses, setGlasses] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [showType, setShowType] = useState("table");

  // search backend for data and return
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/glass")
      .then((res) => {
        setGlasses(res.data.data);
        setLoading(false);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // take away when finished
  let sampleGlasses = [
    {
      title: "Coup",
      description: "A glass for drinking Champagne.",
      condition: "great",
      quantity: "4",
      price: 20,
      offerPrice: 16,
      availability: true,
    },
    {
      title: "Nic and Nora",
      description: "A glass for small cocktails",
      condition: "great",
      quantity: "5",
      price: 40,
      offerPrice: 30,
      availability: true,
    },
  ];
  useEffect(() => {
    setGlasses(sampleGlasses);
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-col text-center">
          <h1 className="text-3xl">Antique Glass</h1>
          <h2 className="text-xl">Your Place for Unique Glassware</h2>
        </div>
        {/* on click show items */}
        <Cart />
      </div>

      {loading ? <Spinner /> : <GlassCard glasses={glasses} />}
    </div>
  );
}
