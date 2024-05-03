import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useVendor } from "../context/VendorContext";
import BackButton from "../components/Utils/BackButton";

type ProductImage = {
  public_id: string;
  url: string;
};

type Product = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  vendor: string;
  productImage?: ProductImage;
  availability: boolean;
  createdAt: any;
  updatedAt: any;
};

export default function ShowProduct() {
  const { logIn } = useVendor();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);
  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!logIn) navigate("/login");
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.1.124:8080/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/store");
      });
  }, [productId]);

  return (
    <div className="p-4">
      <BackButton vendor={product?.vendor || ""} />
      <h1 className="text-xl my-4 flex place-content-center">
        Viewing product
      </h1>

      {loading ? (
        <div className="pt-12 flex justify-center">Loading...</div>
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
            <span className="text-x1 mr-8 text-gray-500">Availability</span>
            <span>{product?.availability ? "Yes" : "No"}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Created At</span>
            <span>{new Date(product?.createdAt).toDateString()}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Last Update</span>
            <span>{new Date(product?.updatedAt).toDateString()}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Image</span>
            {product?.productImage ? (
              <img
                src={product.productImage.url}
                alt={`${product.title} item for sale`}
                className="h-2/3 w-2/3"
              />
            ) : (
              <span>No image included for this product</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
