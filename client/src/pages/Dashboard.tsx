import { Link, useParams } from "react-router-dom";
import ProductTable from "../components/Dashboard/ProductTable";
import { useVendor } from "../context/VendorContext";

export default function Dashboard() {
  const { products } = useVendor();
  const { vendorId } = useParams();

  console.log(products.length);
  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3x1 text-center my-8">Dashboard</h1>
        </div>
        <Link
          to={`/dashboard/${vendorId}/create`}
          className="flex flex-col justify-around"
        >
          <div className="border border-2 border-slate-400 p-2 rounded hover:bg-yellow-200">
            Create A New Product
          </div>
        </Link>
      </div>

      {!products.length ? (
        <div className="py12 flex flex-col flex-wrap justify-center content-center">
          <div>
            <h2 className="pb-2 text-center ">You have no products yet!</h2>
          </div>
          <div>
            <Link
              to={`/dashboard/${vendorId}/create`}
              className="flex justify-between"
            >
              <div className="border border-2 border-slate-400 p-2 rounded hover:bg-yellow-200">
                Create A New Product
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <ProductTable products={products} vendor={vendorId || ""} />
      )}
    </div>
  );
}
