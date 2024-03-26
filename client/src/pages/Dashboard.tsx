import { Link, useParams } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import ProductTable from "../components/Dashboard/ProductTable";
import { useVendor } from "../context/VendorContext";

export default function Dashboard() {
  const { products } = useVendor();
  const { vendorId } = useParams();

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3x1 text-center my-8">Dashboard</h1>
        </div>
        <Link to="/glass/create" className="flex flex-col justify-around">
          <MdOutlineAddBox className="text-sky-800 text-4x1" />
          <span>Create A New Product</span>
        </Link>
      </div>

      <ProductTable products={products} vendor={vendorId || ""} />
    </div>
  );
}
