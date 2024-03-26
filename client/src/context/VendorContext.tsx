import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import Auth from "../utils/auth";
import axios from "axios";
import { redirect } from "react-router-dom";

type VendorContext = {
  products: Product[];
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
    // use params to get product id
    // use axios to find and delete item
    // return success to page
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
        editProduct,
        deleteProduct,
        toggleAvailability,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}
