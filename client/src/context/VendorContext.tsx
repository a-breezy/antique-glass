import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import Auth from "../utils/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type VendorContext = {
  products: Product[];
  logIn: boolean;
  setLogIn: (arg: boolean) => void;
};

type ProductImage = {
  public_id: string;
  url: string;
}

type Product = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  availability: boolean;
  image?: ProductImage;
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
  const [logIn, setLogIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // refactor code to check if user is logged in on dashboard, createProduct, updateProduct, deleteProduct

  useEffect(() => {
    console.log("1 checking logIn in useEffect", logIn)
    const data = Auth.getSavedData();
    if (data?.token == null && data?.refreshToken == null) {
      setLogIn(false);
      console.log("2 checking logIn in useEffect", logIn)
      // navigate("/login");
    } else {
      console.log("3 checking logIn in useEffect", logIn)
      axios({
        url: `http://localhost:5555/vendor/${data.id}`,
        method: "get",
        headers: {
          authorization: `Bearer ${data.token}`,
          refreshToken: `Bearer ${data.refreshToken}`,
        },
      })
        .then((res) => {
          setLogIn(true);
          setProducts(res.data.products);
        })
        .catch((error) => {
          navigate("/login");
          console.log(error);
        });
    }
  }, []);

  return (
    <VendorContext.Provider
      value={{
        products,
        logIn,
        setLogIn
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}
