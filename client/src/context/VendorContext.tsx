import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import Auth from "../utils/auth";
import axios from "axios";
import { redirect, useParams, useNavigate } from "react-router-dom";

type VendorContext = {
  products: Product[];
  message: string;
  deleteProduct: (id: number) => void;
  editProduct: (id: number) => void;
  toggleAvailability: (id: number) => void;
};

type Product = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  availability: boolean;
  image: string;
};

type VendorProviderProps = {
  children: ReactNode;
};

const VendorContext = createContext({} as VendorContext);

export function useVendor() {
  return useContext(VendorContext);
}

export function VendorProvider({ children }: VendorProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // get data from backend and set products state
  useEffect(() => {
    const data = Auth.getSavedData();
    if (data == null) redirect("/login");
    else {
      axios({
        url: `http://localhost:5555/vendor/${data.id}`,
        method: "get",
        headers: { Authorization: `Bearer ${data.token}` },
      })
        .then((res) => {
          setProducts(res.data.products);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // edit item from vendor
  function editProduct(id: number) {
    // use params to get product id
    // use axios to find and update item
    // return success to page
  }

  // delete item from vendor
  function deleteProduct(id: number) {
    axios
      .delete(`http://localhost:5555/products/${id}`)
      .then(() => {
        setMessage("Success, redirecting you to your dashboard");
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      })
      .catch((error) => {
        setMessage("An error occurred, please try deleting again");
        console.log(error);
      });
  }

  // change product availability from true to false
  function toggleAvailability(id: number) {
    // axios call to find product by id and update
    // set availability to opposite of what it currently is
  }

  return (
    <VendorContext.Provider
      value={{
        // add export functions here
        products,
        message,
        editProduct,
        deleteProduct,
        toggleAvailability,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}
