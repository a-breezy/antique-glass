import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useVendor } from "../context/VendorContext";

import BackButton from "../components/Utils/BackButton";
import ProductForm from "../components/ProductForm/ProductForm";

export default function EditProduct() {
  const navigate = useNavigate();
  const { logIn } = useVendor();
  const { vendorId, productId } = useParams();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "good",
    quantity: 0,
    price: 0,
    availability: true,
    productImage: null as File | null,
    vendor: vendorId!,
  });

  useEffect(() => {
    if (!logIn) navigate("/login");
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.1.124:8080/products/${productId}`)
      .then((res) => {
        const data = res.data;
        if (data) setFormData(data);
      })
      .catch((error) => {
        setMessage("An error happened. Please check console");
        console.log(error);
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .putForm(`http://192.168.1.124:8080/products/${productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 4000);
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton vendor={formData?.vendor || ""} />
      <h1 className="text-xl my-4 flex place-content-center">Edit Product</h1>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        message={message}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
