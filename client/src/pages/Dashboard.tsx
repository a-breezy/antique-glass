import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Utils/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import GlassTable from "../components/Dashboard/GlassTable";

export default function Dashboard() {
  const [glasses, setGlasses] = useState([]);
  const [loading, setLoading] = useState(false);

  // search backend for data and return
  useEffect(() => {
    setLoading(true);
    // check localStorage for token
    
    axios
      // .get("http://localhost:5555/")
      // fetch data from mongodb
      .get("http://localhost:5555/vendor/65f3555b4a06172ef1651ccc")
      .then((res) => {
        console.log(res);
        setGlasses(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3x1 text-center my-8">Dashboard</h1>
        </div>
        <Link to="/glass/create" className="flex flex-col justify-around">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
          <span>Create A New Glass</span>
        </Link>
      </div>

      {loading ? <Spinner /> : <GlassTable glasses={glasses} />}
    </div>
  );
}
