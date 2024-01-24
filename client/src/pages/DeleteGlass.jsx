import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import BackButton from "../components/Utils/BackButton";
import Spinner from "../components/Utils/Spinner";

export default function DeleteGlass() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteGlass = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/glass/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book deleted Successfully", { variant: "success" });
        navigate("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("An error happened. Please check the console", {
          variant: "error",
        });
        console.log(error);
      });
  };

  const handleNotDeleteGlass = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3x1 my-4 flex place-content-center">Delete Glass</h1>
      {loading ? <Spinner /> : ""}
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
    </div>
  );
}
