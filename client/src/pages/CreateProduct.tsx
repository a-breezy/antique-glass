import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";

export default function CreateProduct() {
  const { vendorId } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    condition: "good",
    quantity: 0,
    price: 0,
    availability: true,
    images: null as FileList | null,
    vendor: vendorId!,
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //* check that data is actually getting to db
    // console.log(formData);

    const sendData = new FormData();
    sendData.append("title", "formData.title");
    sendData.append("description", formData.description);
    sendData.append("condition", formData.condition);
    // sendData.append("quantity", formData.quantity);
    // sendData.append("price", formData.price);
    // sendData.append("availability", formData.availability);
    // sendData.append("images", formData.images);
    // sendData.append("vendor", formData.vendor);

    console.log(sendData.keys());

    console.log(formData.images);
    axios
      .post("http://localhost:5555/products/", sendData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        // console.log(res.data);
        // setMessage("Success, redirecting you to your dashboard");
        // setTimeout(() => {
        //   navigate(`/dashboard/${vendorId}`);
        // }, 4000);
      })
      .catch((error) => {
        // setMessage("An error has occurred please try again")
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
