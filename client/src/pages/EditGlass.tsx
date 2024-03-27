import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import ProductForm from "../components/ProductForm/ProductForm";

export default function EditGlass() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "good",
    quantity: 0,
    price: 0,
    // offerPrice: null,
    // image: [],
    availability: true,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { vendorId, productId } = useParams();

  // get data from be
  useEffect(() => {
    axios
      .get(`http://localhost:5555/products/${productId}`)
      .then((res) => {
        const data = res.data;
        if (data) setFormData(data);
      })
      .catch((error) => {
        setMessage("An error happened. Please check console");
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    axios
      .put(`http://localhost:5555/products/${productId}`, formData)
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 2000);
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
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

      {/* {message != "" ? <div>{message}</div> : null} */}
    </div>
  );
}
