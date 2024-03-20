import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
import { Link, redirect } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ProductTable from "../components/Dashboard/ProductTable";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // search backend for data and return
  useEffect(() => {
    setLoading(true);
    let loginToken = localStorage.getItem("loginToken");
    if (!loginToken) redirect("/login"); // send back to homepage

    axios({
      url: "http://localhost:5555/vendor/65f3555b4a06172ef1651ccc",
      method: "get",
      headers: { Authorization: `Bearer ${loginToken}` },
    })
      .then((res) => {
        setProducts(res.data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(products);
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3x1 text-center my-8">Dashboard</h1>
        </div>
        <Link to="/glass/create" className="flex flex-col justify-around">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
          <span>Create A New Product</span>
        </Link>
      </div>

      {loading ? <Spinner /> : <ProductTable products={products} />}
    </div>
  );
}
