import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import axios from "axios";
// remove after testing
import sampleGlasses from "../../public/assets/sampleGlasses.json";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

// define type for shoppingCartContext
type ShoppingCartContext = {
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  isOpen: boolean;
  cartItems: CartItem[];
  storeItems: Item[];
};

type CartItem = {
  id: number;
  quantity: number;
};

type Item = {
  _id: number;
  title: string;
  description: string;
  condition: string;
  quantity: number;
  price: number;
  offerPrice: number;
  availability: boolean;
  image: string;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storeItems, setStoreItems] = useState<Item[]>([]);

  // fetch data and set to storeItems
  useEffect(() => {
    try {
      //! uncomment when going live
      // const res = await axios.get("http:localhost:5555/glass");
      // if (res) {
      //   setGlasses(res.data.data);
      // }
      setStoreItems(sampleGlasses);
    } catch (error: unknown) {
      console.log(error);
    }
  }, []);

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const toggleCart = () => setIsOpen(!isOpen);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id == id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    // if cartItem quantity = quantity of item break
    setCartItems((currentItems) => {
      if (cartItems.find((item) => item.id == id) == null) {
        return [...cartItems, { id, quantity: 1 }];
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems((currentItems) => {
      if (cartItems.find((item) => item.id == id)?.quantity === 1) {
        return cartItems.filter((item) => item.id !== id);
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        toggleCart,
        cartQuantity,
        cartItems,
        isOpen,
        storeItems,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}