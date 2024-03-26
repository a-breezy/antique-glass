import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DeleteGlass() {
  const navigate = useNavigate();
  const { vendorId, productId } = useParams();
  const [message, setMessage] = useState("");

  const handleDeleteGlass = () => {
    axios
      .delete(`http://localhost:5555/products/${productId}`)
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate(`/dashboard/${vendorId}`);
        }, 3000);
      })
      .catch((error) => {
        setMessage("An error occurred, please try deleting again");
        console.log(error);
      });
  };

  const handleNotDeleteGlass = () => {
    navigate(`/dashboard/${vendorId}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3x1 my-4 flex place-content-center">Delete Glass</h1>
      {message == "" ? (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-5/6 lg:w-2/3">
          <h3 className="text-2x1">
            Are you sure you want to delete this glass?
          </h3>

          <button
            className="p-4 bg-red-600 text-white m-8 w-full rounded-lg hover:bg-red-700"
            onClick={handleDeleteGlass}
          >
            Yes, Delete It
          </button>
          <button
            className="p-4 bg-green-600 text-white m-8 w-full  rounded-lg hover:bg-green-700"
            onClick={handleNotDeleteGlass}
          >
            No, Keep It
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl p-8 mx-auto w-5/6 lg:w-2/3">
          {message}
        </div>
      )}
    </div>
  );
}
