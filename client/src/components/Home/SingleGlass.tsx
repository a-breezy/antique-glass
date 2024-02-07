/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import GlassModal from "./GlassModal";

type GlassItem = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: string;
  price: number;
  offerPrice: number;
  availability: boolean;
  image: string;
};

type SingleGlassProps = {
  glass: GlassItem;
}

export const SingleGlass = ({
  glass
}: SingleGlassProps) => {

  const [showModal, setShowModal] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(false);

  const checkPlural = (glass: string) => {
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
  } = useShoppingCart();

  const cartQuantity = getItemQuantity(glass._id);

  return (
    <div
      key={glass._id}
      className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
    >
      <div className="p-2 mt-4 border-2 border-gray-300 rounded h-44 flex place-content-center">
        <img src={glass.image} alt={`${glass.title} glass for sale`} className="h-full" />
      </div>

      <h2 className="px-4 py-1 rounded-lg">
        Set of {glass.quantity} {checkPlural(glass.title)}
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
        <div className="basis-1/2">
          {!cartQuantity ? (
            <button
              className="px-5 w-full border border-blue-500 rounded-lg bg-blue-500"
              onClick={() => {
                increaseCartQuantity(glass._id);
              }}
            >
              Add to cart
            </button>
          ) : (
            <>
              <div className="flex justify-center items-center">
                <button
                  className="px-5 border border-blue-500 rounded-l-lg bg-blue-500"
                  onClick={() => {
                    if (getItemQuantity(glass._id) == parseInt(glass.quantity)) {
                      setMaxQuantity(false);
                      decreaseCartQuantity(glass._id);
                    }
                    decreaseCartQuantity(glass._id);
                  }}
                >
                  -
                </button>
                <div className="border-y px-5 border-blue-500">
                  {cartQuantity}
                </div>
                <button
                  className={`px-5 border ${
                    maxQuantity
                      ? "border-red-500 bg-red-200"
                      : "border-blue-500 bg-blue-500"
                  } rounded-r-lg`}
                  onClick={() => {
                    {
                      if (getItemQuantity(glass._id) < parseInt(glass.quantity)) {
                        increaseCartQuantity(glass._id);
                        if (getItemQuantity(glass._id) == parseInt(glass.quantity) - 1)
                          setMaxQuantity(true);
                      }
                    }
                  }}
                >
                  +
                </button>
              </div>
              <div className="flex justify-center">
                <button
                  className="px-5 my-1 border border-red-500 rounded-lg bg-red-500"
                  onClick={() => removeFromCart(glass._id)}
                >
                  Remove From Cart
                </button>
              </div>
            </>
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
