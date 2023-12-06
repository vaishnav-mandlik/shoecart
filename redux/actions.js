export const addToCart = (shoe) => {
  return {
    type: "ADD_TO_CART",
    payload: shoe,
  };
};

export const removeFromCart = (shoe) => {
  return {
    type: "REMOVE_FROM_CART",
    payload: shoe,
  };
};

export const clearCart = () => {
  return {
    type: "CLEAR_CART",
  };
};
