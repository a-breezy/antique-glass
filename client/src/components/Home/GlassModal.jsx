/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import { FaMoneyBillAlt } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

export default function GlassModal({ glass, onClose }) {
  return (
    <div
      className="fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3x1 text-red-600 cursor-pointer"
          onClick={onClose}
        />

        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">{glass.title}</h2>
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

        <p className="mt-4">Depict some information about the glass here</p>
        <p className="my-2">
          Give more broad information about the glass and whatever else you can
          think about it to give the user more information about what
          they&aposre buying here
        </p>
      </div>
    </div>
  );
}
