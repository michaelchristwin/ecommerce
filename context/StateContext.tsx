import { ProductData } from "@/components/interfaces";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

interface StateContextProps {
  children: React.ReactNode;
}

interface ProductProps {
  name: string;
  quantity: number;
  price: number;
}

interface State {
  showCart: boolean;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  inc: () => void;
  dec: () => void;
  onAdd: (product: any, quantity: number) => void;
}

const Context = createContext<State | undefined>(undefined);

//Context with component States
export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  // Functions to control state
  const onAdd = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => (item.name = product.name)
    );
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct.name === product.name)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product.name} added to cart`);
  };
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      return prevQty - 1 < 1 ? 0 : prevQty - 1;
    });
  };

  const state: State = {
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    inc: incQty,
    dec: decQty,
    onAdd: onAdd,
  };

  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export const useStateContext = (): State => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContext must be used within a StateContext Provider");
  }
  return context;
};
