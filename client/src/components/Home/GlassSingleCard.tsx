/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import React, { useState } from "react";
import GlassModal from "./GlassModal";

export const GlassSingleCard = ({ glass }) => {
  const [showModal, setShowModal] = useState(false);

  const checkPlural = (glass) => {
    if (glass.charAt(glass.length - 1) !== "s") {
      return glass + "s";
    }
    return glass;
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = "set Glass State";

  const quantity = 0;

  return (
    <div
      key={glass._id}
      className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
    >
      <div className="p-2 mt-4 border-2 border-gray-300 rounded h-44 flex place-content-center">
        <img
          src={glass.image}
          alt={`${glass.title} glass for sale`}
          className="h-full"
        />
      </div>

      <h2 className="px-4 py-1 rounded-lg">
        Set of {glass.quantity} {checkPlural(glass.title)} Glasses
      </h2>

      <div className="flex justify-end items-center gap-x-2">
        <FaMoneyBillAlt className="text-reg-300 text-2x1" />
        <h2 className="my-1">{glass.price}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        {/* set modal to show glass in page */}
        <BiShow
          className="text-3x1 text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />

        {/* button to add to cart and increase/decrease quantity */}
        <div className="basis-1/2">
          {!quantity ? (
            <button
              className="px-5 w-full border border-blue-500 rounded-lg bg-blue-500"
              onClick={increaseCartQuantity}
            >
              Add to cart
            </button>
          ) : (
            <div className="flex justify-center items-center">
              <button
                className="px-5 border border-blue-500 rounded-l-lg bg-blue-500"
                onClick={() => decreaseCartQuantity()}
              >
                -
              </button>
              <div className="border-y px-5 border-blue-500">{quantity}</div>
              <button
                className="px-5 border border-blue-500 rounded-r-lg bg-blue-500"
                onClick={() => increaseCartQuantity()}
              >
                +
              </button>
            </div>
          )}
        </div>

        {/* link to glass page */}
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
