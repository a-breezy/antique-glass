import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";

export default function CreateGlass() {
  const { vendorId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "good",
    quantity: 0,
    price: 0,
    availability: true,
    vendor: vendorId!,
    // offerPrice: null,
    // image: [],
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:5555/products/", formData)
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 4000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        message={message}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
