import { createContext, useEffect, useState } from "react";
import { getProductData } from "../utilities/getProductData";

export const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([]);

  //    @This function creates a variable named CART_DATA in localStorage with the cart products
  //    @Everytime a page loads checks if CART_DATA has values in it and sends it to cartProducs
  //    @If CART_DATA doesn't exists yet, creates a new one.
  useEffect(() => {
    if (!localStorage.getItem("CART_DATA")) {
      window.localStorage.setItem("CART_DATA", JSON.stringify(cartProducts));
      setCartProducts(JSON.parse(window.localStorage.getItem("CART_DATA")));
    } else {
      setCartProducts(JSON.parse(window.localStorage.getItem("CART_DATA")));
    }
  }, []);

  //    @This function executes everytime something gets added to cartProducts
  //    @Every change made to cartProducts gets done to CART_DATA session as well
  useEffect(() => {
    if (cartProducts.length > 0) {
      window.localStorage.setItem("CART_DATA", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  //    @Gets the quantity of current product from cartProducts
  const getProductQuantity = (id) => {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  };

  //    @Adds one product of the current id to the cartProducts
  const addOneToCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  };

  //    @Decreases the product quantity of the current id by 1, or deletes it, if the current quantity is 1
  const removeOneFromCart = (id) => {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
    }

    if (cartProducts.length === 0) {
      window.localStorage.setItem("CART_DATA", JSON.stringify(cartProducts));
    }
  };

  //    @Deletes the product from the cart, no mattter the quantity
  const deleteFromCart = (id) => {
    setCartProducts(cartProducts.filter((product) => product.id !== id));
  };

  //    @Gets the total cost of the cart
const getTotalCost = async () => {
  let totalCost = 0;

  // Make an array of promises for the product data requests
  const productDataPromises = cartProducts.map((product) => {
    return getProductData(product.id);
  });

  // Wait for all of the promises to resolve
  const productData = await Promise.all(productDataPromises);

   // Calculate the total cost
  for (const product of productData) {
    // Find the corresponding item in the cartData array
    const item = cartProducts.find((p) => p.id === product._id);
    if (item) {
      totalCost += product.price * item.quantity;
    }
  }

  if (cartProducts.length === 0) {
    window.localStorage.setItem("CART_DATA", JSON.stringify(cartProducts));
  }

  return totalCost;
};


  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
