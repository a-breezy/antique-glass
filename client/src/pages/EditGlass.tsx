import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/Utils/BackButton";
import Spinner from "../components/Utils/Spinner";

export default function EditGlass() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("good");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [offerPrice, setOfferPrice] = useState(0);
  const [availability, setAvailability] = useState(true);
  // const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/glass/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setDescription(res.data.description);
        setCondition(res.data.condition);
        setQuantity(res.data.quantity);
        setPrice(res.data.price);
        setOfferPrice(res.data.offerPrice);
        setAvailability(res.data.availability);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check console");
        console.log(error);
      });
  }, [id]);

  const handleEditGlass = () => {
    const data = {
      title,
      description,
      condition,
      quantity,
      price,
      offerPrice,
      availability,
    };
    // set catch to make sure that title, quantity, price, and availability are met
    setLoading(true);
    axios
      .put(`http://localhost:5555/glass/${id}`, data)
      .then(console.log(id))
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Glass edited successfully!", { variant: "success" });
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check console", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl my-4 flex place-content-center">Edit Glass</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-5/6 lg:w-2/3">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Description</label>
          <textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4 flex justify-between">
          <label className="text-xl mr-4 text-gray-500" htmlFor="condition">
            Condition
          </label>
          <select
            name="condition"
            id="condition"
            value={condition}
            className="border-2 border-grey-500 w-1/2 rounded-md"
            onChange={(e) => setCondition(e.target.value)}
          >
            Condition
            <option value="acceptable">Acceptable</option>
            <option value="good">Good</option>
            <option value="great">Great</option>
            <option value="like new">Like new</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Quantity</label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">
            Make an Offer Price (Set minimum price you will take for the item)
          </label>
          <input
            type="number"
            value={offerPrice}
            onChange={(e) => setOfferPrice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4 flex items-center justify-around">
          <div>
            <label className="text-l mr-4 text-gray-500" htmlFor="available">
              Available
            </label>
            <input
              type="radio"
              id="available"
              value="Available"
              name="availability"
              defaultChecked="true"
              onChange={(e) => setAvailability(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2"
            />
          </div>
          <div>
            <label
              className="text-l mr-4 text-gray-500 text-center"
              htmlFor="not available"
            >
              Not Available
            </label>
            <input
              type="radio"
              id="not available"
              value="Not Available"
              name="availability"
              onChange={(e) => setAvailability(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2"
            />
          </div>
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditGlass}>
          Save
        </button>
      </div>
    </div>
  );
}
