/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { BiShow } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import { useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import GlassModal from "./GlassModal";

type Item = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  offerPrice: number;
  availability: boolean;
  image: string;
};

type SingleGlassProps = {
  item: Item;
};

export const SingleGlass = ({ item }: SingleGlassProps) => {
  const [showModal, setShowModal] = useState(false);
  const [maxQuantity, setMaxQuantity] = useState(false);

  const checkPlural = (item: string) => {
    if (item.charAt(item.length - 1) !== "s") {
      return item + "s";
    }
    return item;
  };

  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const cartQuantity = getItemQuantity(item._id);

  return (
    <div
      key={item._id}
      className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
    >
      <div className="p-2 mt-4 border-2 border-gray-300 rounded h-44 flex place-content-center">
        <img
          src={item.image}
          alt={`${item.title} item for sale`}
          className="h-full"
        />
      </div>

      <h2 className="px-4 py-1 rounded-lg">
        Set of {item.quantity} {checkPlural(item.title)}
      </h2>

      <div className="flex justify-end items-center gap-x-2">
        <FaMoneyBillAlt className="text-reg-300 text-2x1" />
        <h2 className="my-1">{item.price}</h2>
      </div>

      <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
        {/* set modal to show item in page */}
        <BiShow
          className="text-3x1 text-blue-800 hover:text-black cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <div className="basis-1/2">
          {!cartQuantity ? (
            <button
              className="px-5 w-full border border-blue-500 rounded-lg bg-blue-500"
              onClick={() => {
                increaseCartQuantity(item._id);
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
                    if (
                      getItemQuantity(item._id) == parseInt(item.quantity)
                    ) {
                      setMaxQuantity(false);
                      decreaseCartQuantity(item._id);
                    }
                    decreaseCartQuantity(item._id);
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
                      if (
                        getItemQuantity(item._id) < item.quantity
                      ) {
                        increaseCartQuantity(item._id);
                        if (
                          getItemQuantity(item._id) ==
                          item.quantity - 1
                        )
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
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove From Cart
                </button>
              </div>
            </>
          )}
        </div>

        {/* link to item page */}
        {/* must change backend to reflect item naming, not glass naming */}
        <Link to={`/glass/details/${item._id}`}>
          <BsInfoCircle className="text-2x1 text-green-800" />
        </Link>
      </div>
      {showModal && (
        <GlassModal item={item} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
