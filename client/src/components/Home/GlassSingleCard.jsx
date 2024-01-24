/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import GlassModal from "./GlassModal";

export const GlassSingleCard = ({ glass }) => {
  const [showModal, setShowModal] = useState(false);

  const checkPlural = (glass) => {
    if (glass.charAt(glass.length - 1) !== "s") {
      return glass + "s";
    }
    return glass;
  };

  return (
    <div
      key={glass._id}
      className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
    >
      <div className="p-2 m-1 border-2 border-gray-300 rounded h-44">
        <h2>Image goes here</h2> {/* take away when ready */}
        {/* <a href=`/glass/details/${glass._id}`><img src="link to image" alt=`${glass.title} glass for sale`> </a> */}
      </div>

      <h2 className="px-4 py-1 rounded-lg">
        Set of {glass.quantity} {checkPlural(glass.title)} Glasses
      </h2>
      {/* <h4 className="my-4 text-gray-500">{glass._id}</h4> */}
      <div className="flex justify-end items-center gap-x-2">
        <FaMoneyBillAlt className="text-reg-300 text-2x1" />
        <h2 className="my-1">{glass.price}</h2>
      </div>
      

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        <BiShow
          className="text-3x1 text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <Link to={`/glass/details/${glass._id}`}>
          <BsInfoCircle className="text-2x1 text-green-800" />
        </Link>
      </div>
      {showModal && (
        <GlassModal glass={glass} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
