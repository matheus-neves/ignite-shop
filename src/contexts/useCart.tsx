import axios from "axios";
import { useCallback, useState, createContext, ReactNode, useMemo, useContext } from "react";

interface Product {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  formattedPrice: string;
  defaultPriceId: string;
  quantity: number;
}

interface CartContextType {
  activeSideNav: boolean;
  cartProducts: Product[];
  addToCart: (product: Product) => void;
  removeToCart: (id: string) => void;
  toggleSideNav: () => void;
  onCheckout: () => Promise<void>;
  totalItems: {
    totalPrice: number;
    totalQuantity: number;
  };
}

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: { children: ReactNode }) {
  const [activeSideNav, setActiveSideNav] = useState(false)
  const [cartProducts, setCartProducts] = useState<Product[]>([]);

  const toggleSideNav = useCallback(() => {
    setActiveSideNav(state => !state)
  }, [])

  const addToCart = useCallback((product: Product) => {
    
    const foundIndex = cartProducts.findIndex(cartProduct => cartProduct.id === product.id);
    if(foundIndex === -1) {
      return setCartProducts(state => [...state, product]);
    }

    const newCartProducts = cartProducts.map((cartProduct) => {
      if(cartProduct.id === product.id) {
        return {
          ...cartProduct,
          quantity: cartProduct.quantity + 1
        }
      }
      return cartProduct;
    })

    setCartProducts(newCartProducts);
  }, [cartProducts])

  const removeToCart = useCallback((id: string) => {
    const filteredProducts = cartProducts.filter(product => product.id !== id);
    setCartProducts(filteredProducts);
  }, [cartProducts])

  const totalItems = cartProducts.reduce((acc, cartItem) => {
    const sum = acc.totalPrice + Number(cartItem.price) * cartItem.quantity;
    return acc = {
      totalPrice: Number(parseFloat(String(sum)).toFixed(2)),
      totalQuantity: acc.totalQuantity + cartItem.quantity
    }
  }, {
    totalQuantity: 0,
    totalPrice: 0
  })

  const onCheckout = useCallback(async () => {
    try {
      const payload = cartProducts.map(product => ({
        price: product.defaultPriceId,
        quantity: product.quantity
      }))
      const response = await axios.post('/api/checkout', {
        payload
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      alert('Fail to redirect to checkout!')
    }
  }, [cartProducts])

  const value = useMemo(() => ({
    activeSideNav,
    addToCart,
    cartProducts,
    removeToCart,
    onCheckout,
    toggleSideNav,
    totalItems
  }), [
    activeSideNav,
    addToCart,
    cartProducts,
    removeToCart,
    onCheckout,
    toggleSideNav,
    totalItems
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}


export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartContextProvider');
  }
  return context;
}