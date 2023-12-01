/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import {BiShow} from 'react-icons/bi'
import {
  MdOutlineDelete,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { useState } from "react";
import GlassModal from "./GlassModal";

export const GlassSingleCard = ({ glass }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      key={glass._id}
      className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
    >
      <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
        {glass.title}
      </h2>
      <h4 className="my-4 text-gray-500">{glass._id}</h4>
      <div className="flex justify-start items-center gap-x-2">
        <FaMoneyBillAlt className="text-reg-300 text-2x1" />
        <h2 className="my-1">{glass.price}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <MdOutlineProductionQuantityLimits className="text-reg-300 text-2x1" />
        <h2 className="my-1">{glass.quantity}</h2>
      </div>
      <div className="flex justify-start items-center gap-x-2">
        <CgUnavailable className="text-reg-300 text-2x1" />
        <h2 className="my-1">{glass.availability.toString()}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
            className='text-3x1 text-blue-800 hover:text-black cursor-pointer'
            onClick={() => setShowModal(true)}
        />
        <Link to={`/glass/details/${glass._id}`}>
          <BsInfoCircle className="text-2x1 text-green-800" />
        </Link>
        <Link to={`/glass/edit/${glass._id}`}>
          <AiOutlineEdit className="text-2x1 text-yellow-600" />
        </Link>
        <Link to={`/glass/delete/${glass._id}`}>
          <MdOutlineDelete className="text-2x1 text-red-600" />
        </Link>
      </div>
      {
        showModal && (
            <GlassModal glass={glass} onClose={() => setShowModal(false)} />
        )
      }
    </div>
  );
};
