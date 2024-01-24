/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

export default function GlassTable({ glasses }) {
  return (
    <table className="w-full border-separate border-spacing-2">
      <thead>
        <tr>
          <th className="border border-slate-600 rounded-md">No.</th>
          <th className="border border-slate-600 rounded-md">Title</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Quantity
          </th>
          <th className="border border-slate-600 rounded-md">Price</th>
          <th className="border border-slate-600 rounded-md max-md:hidden">
            Availability
          </th>
          <th className="border border-slate-600 rounded-md">Operations</th>
        </tr>
      </thead>

      <tbody>
        {glasses.map((glass, index) => (
          <tr key={glass._id} className="h-8">
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {glass.title}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {glass.quantity}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {glass.price}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {/* onClick set to false and update db */}
              {glass.availability.toString()}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
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
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
