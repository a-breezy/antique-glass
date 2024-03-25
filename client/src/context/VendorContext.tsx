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
  // define type
};

type VendorProviderProps = {
  children: ReactNode;
};

const VendorContext = createContext({} as VendorContext);

export function useVendor() {
  return useContext(VendorContext);
}

export function VendorProvider({ children }: VendorProviderProps) {
  const [products, setProducts] = useState([]);

  // get data from backend and set products state
  useEffect(() => {
    const { id, token } = Auth.getSavedData();
    console.log(id, token);

    axios({
      url: `http://localhost:5555/vendor/${id}`,
      method: "get",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // edit item from vendor

  // delete item from vendor

  return (
    <VendorContext.Provider
      value={
        {
          // add export functions here
          products,
        }
      }
    >
      {children}
    </VendorContext.Provider>
  );
}
