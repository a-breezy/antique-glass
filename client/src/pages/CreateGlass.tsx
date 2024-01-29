import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/Utils/BackButton";
import Spinner from "../components/Utils/Spinner";

export default function CreateGlass() {
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
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveGlass = () => {
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
      .post("http://localhost:5555/glass", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Glass created successfully!", { variant: "success" });
        navigate("/");
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
      <h1 className="text-xl my-4 flex place-content-center">Create Glass</h1>
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
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price</label>
          <input
            type="number"
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

        {/* select images */}
        {/* https://www.mongodb.com/community/forums/t/storing-images-in-mongodb/152599/2 */}
        {/* best practice is to store files in store image in stoage list Amazon S3 or Google Cloud and have url to image in mongodb */}
        <div className="my-4 flex justify-between">
          <label className="text-xl mr-4 text-gray-500 " htmlFor="image">
            Select an Image:
          </label>
          <input type="file" id="image" name="image" />
        </div>

        <button
          className="p-2 bg-sky-300 m-8 rounded-md"
          onClick={handleSaveGlass}
        >
          Save
        </button>
      </div>
    </div>
  );
}
