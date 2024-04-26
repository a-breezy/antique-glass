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
  vendor: string;
};

type ProductImage = {
  public_id: string;
  url: string;
};

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
  const [vendor, setVendor] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const data = Auth.getSavedData();
    if (data?.token == null && data?.refreshToken == null) {
      setLogIn(false);
      // navigate("/login");
    } else {
      if (data.id) setVendor(data.id);
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
          console.log("in the catch error");
          console.log(error);
          navigate("/login");
        });
    }
  }, []);

  return (
    <VendorContext.Provider
      value={{
        products,
        logIn,
        setLogIn,
        vendor,
      }}
    >
      {children}
    </VendorContext.Provider>
  );
}
