import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

type StateContextProps = {
  children: React.ReactNode;
};

type Product = {
  name: string;
  price: number;
  quantity: number;
};

type State = {
  showCart: boolean;
  setShowCart: (newValue: boolean) => void;
  cartItems: any[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  inc: () => void;
  dec: () => void;
  onAdd: (product: any, quantity: number) => void;
  toggleCartItemQuantity: (name: string, value: string) => void;
  onRemove: (product: Product) => void;
};

const Context = createContext<State | undefined>(undefined);

//Context with component States
export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct: Product;
  let index;

  // Functions to control state
  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item.name === product.name
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
        return cartProduct;
      });
      setCartItems(updatedCartItems);
    } else {
      const newProduct = {
        ...product,
        quantity: quantity,
      };
      setCartItems([...cartItems, newProduct]);
    }

    toast.success(`${quantity} ${product.name} added to cart`);
  };

  const toggleCartItemQuantity = (name: string, value: string) => {
    foundProduct = cartItems.find((item) => item.name === name);
    index = cartItems.findIndex((product) => product.name === name);
    const newCartItems = cartItems.filter((item) => item.name !== name);
    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item.name === product.name);
    const newCartItems = cartItems.filter((item) => item.name !== product.name);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
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
    setShowCart,
    showCart,
    cartItems,
    totalPrice,
    totalQuantities,
    qty,
    inc: incQty,
    dec: decQty,
    onAdd,
    toggleCartItemQuantity,
    onRemove,
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
