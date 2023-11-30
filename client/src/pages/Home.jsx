import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import GlassTable from "../components/Home/GlassTable";
import GlassCard from "../components/Home/GlassCard"

export default function Home() {
  const [glasses, setGlasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table')

  // search backend for data and return
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/glass")
      .then((res) => {
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
      <div className="flex justify-center items-center gap-x-4">
        <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button 
          className="bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg"
          onClick={() => setShowType('card')}
        >
          Card
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-3x1 my-8">Glass List</h1>
        <h2 className="text-3x2 my-8">(Home  Page)</h2>
        <Link to="/glass/create">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        showType === 'table' ? (<GlassTable glasses={glasses} />) : (<GlassCard glasses={glasses} />)
      )}
    </div>
  );
}
