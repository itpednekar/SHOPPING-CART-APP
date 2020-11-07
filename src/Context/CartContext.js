import React, { useEffect, useReducer } from "react";

export const CartContext = React.createContext();

const initialState = {
  product: [],
  search: "",
  user: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "addToCart":
      return {
        ...state,
        product: [...state.product, action.value.productDetails],
      };
    case "removeFromCart":
      let newCart = [...state.product];
      const index = state.product.findIndex((item) => (item.id = action.id));
      if (index >= 0) {
        newCart.splice(index, 1);
      }
      return { ...state, product: newCart };
    case "clearCart":
      return { ...state, product: [], search: "" };
    case "searchProduct":
      return { ...state, search: action.value };
    case "setUser":
      return { ...state, user: action.user };
    default:
      return state;
  }
};

const CartContextProvider = (props) => {
  const [cart, dispatch] = useReducer(reducer, initialState, () => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    console.log("cart", cart);
    let data = {
      ...cart,
      search: "",
      product: cart.product,
    };
    localStorage.setItem("cart", JSON.stringify(data));
  }, [cart.product]);

  return (
    <CartContext.Provider
      value={{
        cartProductState: cart.product,
        cartSearchState: cart.search,
        cartUserState: cart.user,
        dispatchState: dispatch,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
