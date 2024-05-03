import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm/ProductForm";
import { useVendor } from "../context/VendorContext";

export default function CreateProduct() {
  const { logIn } = useVendor();
  const { vendorId } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .postForm("http://192.168.1.124:8080/products/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 4000);
      })
      .catch((error) => {
        setMessage("An error has occurred please try again");
        console.log(error);
      });
  };

  return (
    <div className="p-4">
            <h1 className="text-xl my-4 flex place-content-center">Create Product</h1>
      <ProductForm
        formData={formData}
        setFormData={setFormData}
        message={message}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
