import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
// import { Link } from "react-router-dom";
import GlassCard from "../components/Home/GlassCard";


type Glass = {
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
  const [glasses, setGlasses] = useState<Glass[] | null>([]);
  const [loading, setLoading] = useState(false);

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
  let sampleGlasses: Glass[] = [
    {
      _id: 0,
      title: "Coup",
      description: "A glass for drinking Champagne.",
      condition: "great",
      quantity: "4",
      price: 20,
      offerPrice: 16,
      availability: true,
      image: "../../assets/imgs/coups.jpg",
    },
    {
      _id: 1,
      title: "Nic and Nora",
      description: "A glass for small cocktails",
      condition: "great",
      quantity: "5",
      price: 40,
      offerPrice: 30,
      availability: true,
      image: "../../assets/imgs/nicAndNora.jpg",
    },
    {
      _id: 2,
      title: "Flute",
      description: "Tall glass predominately for drinking Champagne.",
      condition: "Clean",
      quantity: "6",
      price: 60,
      offerPrice: 40,
      availability: true,
      image: "../../assets/imgs/flutes.jpg",
    },
    {
      _id: 3,
      title: "Rocks",
      description: "Short glass for neat and drinks on ice",
      condition: "great",
      quantity: "5",
      price: 40,
      offerPrice: 30,
      availability: true,
      image: "../../assets/imgs/rocks.jpg",
    },
  ];

  useEffect(() => {
    setGlasses(sampleGlasses);
    // setCartItems(sampleGlasses[2])
  }, []);

  return <>{loading ? <Spinner /> : <GlassCard glasses={glasses} />}</>;
}
