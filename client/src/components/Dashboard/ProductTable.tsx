/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";

export default function ProductTable({ products }) {
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
        {products.map((product, index) => (
          <tr key={product._id} className="h-8">
            {console.log(product.availability)}
            <td className="border border-slate-700 rounded-md text-center">
              {index + 1}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {product.title}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {product.quantity}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              {product.price}
            </td>

            <td className="border border-slate-700 rounded-md text-center max-md:hidden">
              {/* onClick set to false and update db */}
              {product.availability ? "yes" : "no"}
            </td>

            <td className="border border-slate-700 rounded-md text-center">
              <div className="flex justify-center gap-x-4">
                <Link to={`/product/details/${product._id}`}>
                  <BsInfoCircle className="text-2x1 text-green-800" />
                </Link>
                <Link to={`/product/edit/${product._id}`}>
                  <AiOutlineEdit className="text-2x1 text-yellow-600" />
                </Link>
                <Link to={`/product/delete/${product._id}`}>
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
