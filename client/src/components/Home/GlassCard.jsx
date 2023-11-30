/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {PiBookOpenTextLight} from 'react-icons/pi';
import {BiUserCircle} from 'react-icons/bi'
import {AiOutlineEdit} from 'react-icons/ai'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineDelete, MdOutlineProductionQuantityLimits} from 'react-icons/md'
import { FaMoneyBillAlt } from "react-icons/fa";
import { CgUnavailable } from "react-icons/cg";



export default function GlassCard({glasses}) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {glasses.map((item) => (
            <div
                key={item._id}
                className="border-2 border-gray-500 rounded-lg px-4 m-4 relative hover:shadow-xl"
            >
                <h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
                    {item.title}
                </h2>
                <h4 className="my-4 text-gray-500">{item._id}</h4>
                <div className="flex justify-start items-center gap-x-2">
                    <FaMoneyBillAlt className="text-reg-300 text-2x1" />
                    <h2 className="my-1">{item.price}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <MdOutlineProductionQuantityLimits className="text-reg-300 text-2x1" />
                    <h2 className="my-1">{item.quantity}</h2>
                </div>
                <div className="flex justify-start items-center gap-x-2">
                    <CgUnavailable className="text-reg-300 text-2x1" />
                    <h2 className="my-1">{item.availability.toString()}</h2>
                </div>

                <div className="flex justify-between items-center gap-x-2 mt-4 p-4">
                    <Link to={`/glass/details/${item._id}`}>
                        <BsInfoCircle className="text-2x1 text-green-800" />
                    </Link>
                    <Link to={`/glass/edit/${item._id}`}>
                        <AiOutlineEdit className="text-2x1 text-yellow-600" />
                    </Link>
                    <Link to={`/glass/delete/${item._id}`}>
                        <MdOutlineDelete className="text-2x1 text-red-600" />
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
}
