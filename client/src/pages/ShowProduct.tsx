import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/Utils/BackButton";
import Spinner from "../components/Utils/Spinner";

type Product = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  images: string[] | null;
  availability: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function ShowProduct() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [productId]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl my-4 flex place-content-center">
        Viewing product
      </h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-5/6 lg:w-2/3">
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">ID</span>
            <span>{product?._id}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Title</span>
            <span>{product?.title}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Description</span>
            <div>{product?.description}</div>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Condition</span>
            <span>{product?.condition}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Quantity</span>
            <span>{product?.quantity}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Price</span>
            <span>{product?.price}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Images</span>
            {/* create map to display each image */}
            <span>{product?.images}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Availability</span>
            <span>{product?.availability ? "Yes" : "No"}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Created At</span>
            <span>{product?.createdAt.toString()}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Last Update</span>
            <span>{product?.updatedAt.toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
