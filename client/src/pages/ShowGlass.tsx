import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/Utils/BackButton";
import Spinner from "../components/Utils/Spinner";

export default function ShowGlass() {
  const [glass, setGlass] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/glass/${id}`)
      .then((res) => {
        setGlass(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-xl my-4 flex place-content-center">Viewing Glass</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto w-5/6 lg:w-2/3">
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">ID</span>
            <span>{glass._id}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Title</span>
            <span>{glass.title}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Description</span>
            <div>{glass.description}</div>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Condition</span>
            <span>{glass.condition}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Quantity</span>
            <span>{glass.quantity}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Price</span>
            <span>{glass.price}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Offer Price</span>
            <span>{glass.offer}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Availability</span>
            <span>{glass.availability ? "Yes" : "No"}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Created At</span>
            <span>{new Date(glass.createdAt).toString()}</span>
          </div>
          <div className="my-4 flex">
            <span className="text-x1 mr-8 text-gray-500">Last Update</span>
            <span>{new Date(glass.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
