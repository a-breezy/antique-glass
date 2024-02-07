import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
import { SingleGlass } from "../components/Home/SingleGlass";

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
  const [glasses, setGlasses] = useState<GlassItem[] | null>([]);
  const [loading, setLoading] = useState(false);

  // take away when finished
  let sampleGlasses: GlassItem[] | null = [
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
    const fetchData = async () => {
      setLoading(true);
      try {
        // uncomment when launching
        // const res = await axios.get("http://localhost:5555/glass");
        // if (res) {
        //   setGlasses(res.data.data);
        //   setLoading(false);
        // }
        setGlasses(sampleGlasses);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {glasses!.map((item) => (
            <Fragment key={item._id}>
              <SingleGlass glass={item} />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}
